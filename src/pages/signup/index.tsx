import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import Form from "@/components/mantine/signup/form";
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
      <Form />
    </Main>
  );
};
export const getServerSideProps = withAuthUserTokenSSR({
  // whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  // whenAuthed: AuthAction.REDIRECT_TO_APP,
  // appPageURL: "/about/",
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Index);
