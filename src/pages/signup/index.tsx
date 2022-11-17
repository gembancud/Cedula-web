import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import Form from "@/components/mantine/signup/form";
import { Meta } from "@/layouts/Meta";
import { GetUserMe } from "@/services";
import { Main } from "@/templates/Main";

export interface SignupProps {
  signup: object[] | null;
}

const Index = ({ signup }: SignupProps) => {
  console.log("signup", signup);
  return (
    <Main
      meta={
        <Meta
          title="Cedula Verification"
          description="Submit your verification documents to get recognized as a Filipino"
        />
      }
    >
      {signup === null || signup.length === 0 ? (
        <Form />
      ) : (
        <div> {JSON.stringify(signup)}</div>
      )}
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

    const signup = await GetUserMe({ token });
    if (signup) {
      return {
        props: {
          signup,
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      signup: null,
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
