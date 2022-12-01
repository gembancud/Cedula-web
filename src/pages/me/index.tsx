import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import type { MeType } from "@/components/mantine/me/form";
import Form from "@/components/mantine/me/form";
import { Meta } from "@/layouts/Meta";
import { GetUserMe } from "@/services";
import { Main } from "@/templates/Main";

export interface MeProps {
  me: MeType | null;
}

const Index = ({ me }: MeProps) => {
  return (
    <Main meta={<Meta title="My Profile" description="Edit your profile" />}>
      <Form me={me} />
      <div> {JSON.stringify(me)}</div>
    </Main>
  );
};
export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/login",
  whenAuthed: AuthAction.RENDER,
})(async ({ AuthUser }) => {
  try {
    const token = await AuthUser.getIdToken();
    if (!token) throw new Error("No token");

    const me = await GetUserMe({ token });
    if (me) {
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

export default withAuthUser<MeProps>({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: () => <div>Loading...</div>,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/login",
  whenAuthed: AuthAction.RENDER,
})(Index);
