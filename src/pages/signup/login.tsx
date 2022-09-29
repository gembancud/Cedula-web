/**
 *
 * This special login page is used to redirect
 * the use to signup page after login
 *
 * */

import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import FirebaseAuthButton from "@/components/firebase/FirebaseAuth";
import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Cedula Verification"
          description="Submit your verification documents to get recognized as a Filipino"
        />
      }
    >
      <FirebaseAuthButton />
    </Main>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  appPageURL: "/signup",
})();

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: () => <div>Loading...</div>,
  whenUnauthedAfterInit: AuthAction.RENDER,
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  appPageURL: "/signup/",
})(Index);
