import { Paper } from "@mantine/core";
import { useRouter } from "next/router";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import Profile from "@/components/mantine/user/profile";
import { Meta } from "@/layouts/Meta";
import { GetUserMe } from "@/services";
import { Main } from "@/templates/Main";
import type { MeType } from "@/types";

export interface SignupProps {
  me: MeType | null;
}

const Index = ({ me }: SignupProps) => {
  const router = useRouter();
  if (me !== null) {
    router.replace("/user");
  }
  return (
    <Main
      meta={
        <Meta
          title="Cedula Verification"
          description="Submit your verification documents to get recognized as a Filipino"
        />
      }
    >
      <Paper shadow="md" radius="xl" p="xl" withBorder>
        <Profile me={me} />
      </Paper>
    </Main>
  );
};
export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/signup/login/",
  whenAuthed: AuthAction.RENDER,
})(async ({ AuthUser }) => {
  try {
    const token = await AuthUser.getIdToken();
    if (!token) throw new Error("No token");

    const meResponse = await GetUserMe({ token });
    if (meResponse.status === 200) {
      const me = await meResponse.json();
      return {
        props: {
          me,
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      me: null,
    },
  };
});

export default withAuthUser<SignupProps>({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: () => <div>Loading...</div>,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/signup/login/",
  whenAuthed: AuthAction.RENDER,
})(Index);
