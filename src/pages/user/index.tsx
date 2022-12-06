import { Paper, Tabs } from "@mantine/core";
import { IconAffiliate, IconUser } from "@tabler/icons";
import { useRouter } from "next/router";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import Orgs from "@/components/mantine/user/orgs";
import type { MeType } from "@/components/mantine/user/profile";
import Profile from "@/components/mantine/user/profile";
import { Meta } from "@/layouts/Meta";
import { GetUserMe } from "@/services";
import { Main } from "@/templates/Main";

export interface MeProps {
  me: MeType | null;
}

const Index = ({ me }: MeProps) => {
  const router = useRouter();
  if (me === null) {
    router.push("/login");
  }
  return (
    <Main meta={<Meta title="My Profile" description="Edit your profile" />}>
      <Paper shadow="md" radius="xl" p="xl" withBorder>
        <Tabs defaultValue="profile">
          <Tabs.List>
            <Tabs.Tab value="profile" icon={<IconUser size={14} />}>
              Profile
            </Tabs.Tab>
            <Tabs.Tab value="organizations" icon={<IconAffiliate size={14} />}>
              Organizations
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="profile" pt="xs">
            <Profile me={me} />
          </Tabs.Panel>

          <Tabs.Panel value="organizations" pt="xs">
            <Orgs me={me!} />
          </Tabs.Panel>
        </Tabs>
      </Paper>
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
