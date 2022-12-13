import { Paper, Tabs, UnstyledButton } from "@mantine/core";
import { IconAffiliate, IconUser } from "@tabler/icons";
import { useRouter } from "next/router";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { useEffect, useState } from "react";

import Orgs from "@/components/mantine/user/orgs";
import Profile from "@/components/mantine/user/profile";
import { Meta } from "@/layouts/Meta";
import { GetEvaluator, GetUserMe } from "@/services";
import { Main } from "@/templates/Main";
import type { MeType } from "@/types";

export interface MeProps {
  me: MeType | null;
}

const Index = ({ me }: MeProps) => {
  const router = useRouter();
  const AuthUser = useAuthUser();
  const [loaded, setLoaded] = useState(false);
  const [isEvaluator, setIsEvaluator] = useState(false);
  if (me === null) {
    router.push("/login");
  }

  useEffect(() => {
    const checkEvaluator = async () => {
      const token = await AuthUser.getIdToken();
      if (token) {
        const evaluatorResponse = await GetEvaluator({ token });
        if (evaluatorResponse.status === 200) {
          setLoaded(true);
          setIsEvaluator(true);
        }
      }
    };
    if (!loaded) checkEvaluator();
  });

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
            {isEvaluator && (
              <UnstyledButton
                onClick={() => {
                  router.replace("/verify");
                }}
              >
                Verify
              </UnstyledButton>
            )}
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
  authPageURL: "/login/",
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
  authPageURL: "/login/",
  whenAuthed: AuthAction.RENDER,
})(Index);
