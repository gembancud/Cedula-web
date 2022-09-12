import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

const Index = () => {
  const AuthUser = useAuthUser();
  return (
    <Main
      meta={
        <Meta
          title="Cedula Verification"
          description="Submit your verification documents to get recognized as a Filipino"
        />
      }
    >
      <div>
        AuthUser: {AuthUser.id}
        AuthEmail: {AuthUser.email}
        {/* AuthName: {AuthUser.name} */}
      </div>
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
