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
      Login
      <FirebaseAuthButton />
    </Main>
  );
};
export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  appPageURL: "/about",
})();

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  appPageURL: "/signup/",
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Index);
