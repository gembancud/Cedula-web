import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import Form from "@/components/mantine/signup/form";
import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

export interface SignupProps {
  signup: object | null;
}

const Index = ({ signup }: any) => {
  return (
    <Main
      meta={
        <Meta
          title="Cedula Verification"
          description="Submit your verification documents to get recognized as a Filipino"
        />
      }
    >
      {signup === null ? <Form /> : <div> {JSON.stringify(signup)}</div>}
    </Main>
  );
};
export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/signup/login/",
  whenAuthed: AuthAction.RENDER,
})(async ({ AuthUser }) => {
  let signup = null;
  const url = process.env.NEXT_PUBLIC_BACKEND_API_URL!;
  try {
    const AuthToken = await AuthUser.getIdToken();
    const verifyresponse = await fetch(`${url}/register`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: AuthToken || "unauthenticated",
      },
    });
    if (verifyresponse.status === 200) {
      signup = await verifyresponse.json();
    }
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      signup,
    },
  };
});

export default withAuthUser()(Index);
