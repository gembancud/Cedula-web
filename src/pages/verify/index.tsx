// import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { AuthAction, withAuthUser } from "next-firebase-auth";

const App = dynamic(() => import("@/components/admin"), { ssr: false });

const Admin = () => {
  return <App />;
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: () => <div>Loading...</div>,
})(Admin);
