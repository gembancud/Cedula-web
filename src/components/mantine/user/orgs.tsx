import {
  Button,
  Drawer,
  Stack,
  Title,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useState } from "react";

import { GetOrgs } from "@/services";

import { OrgCard } from "./OrgCard";
import type { MeType } from "./profile";

interface OrgsInterface {
  me: MeType;
}

export type BaseOrgType = {
  name: string;
  image: string;
  badge: string;
  description: string;
  requirements: string;
  createdAt: string;
  access: string;
};

export type MeOrgType = BaseOrgType & {
  status: string;
  active_badge: string;
  badges: {
    name: string;
    link: string;
  }[];
};

const Orgs = ({ me }: OrgsInterface) => {
  const theme = useMantineTheme();
  const [openManageDrawer, setOpenManageDrawer] = useState(false);
  const [openJoinDrawer, setOpenJoinDrawer] = useState(false);
  const [allOrgs, setAllOrgs] = useState<BaseOrgType[] | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<MeOrgType | null>(null);
  console.log("me", me);
  // const AuthUser = useAuthUser();

  const ManageDrawer = () => {
    return (
      <Drawer
        opened={openManageDrawer}
        onClose={() => setOpenManageDrawer(false)}
        title="Manage Organization"
        padding="xl"
        size="xl"
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark![9]
            : theme.colors.gray![2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        {JSON.stringify(selectedOrg)}
      </Drawer>
    );
  };

  const JoinDrawer = () => {
    return (
      <Drawer
        opened={openJoinDrawer}
        onClose={() => setOpenJoinDrawer(false)}
        title="Join an Organization"
        padding="xl"
        size="xl"
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark![9]
            : theme.colors.gray![2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        {allOrgs &&
          allOrgs!.map((org: BaseOrgType) => (
            <OrgCard
              key={org.name}
              image={org.image}
              name={org.name}
              description={org.description}
              stats={[]}
            />
          ))}
      </Drawer>
    );
  };

  return (
    <>
      {ManageDrawer()}
      {JoinDrawer()}
      <Stack
        // align="stretch"
        spacing="md"
        justify="center"
        sx={() => ({
          padding: "5% 20%",
          // height: "50%",
          // width: "100%",
        })}
      >
        <Title order={3}>My Organizations</Title>
        <Stack>
          {me.orgs.map((org: MeOrgType) => (
            <>
              <UnstyledButton
                onClick={() => {
                  setSelectedOrg(org);
                  setOpenManageDrawer(true);
                }}
              >
                <OrgCard
                  key={org.name}
                  image={org.image}
                  name={org.name}
                  description={org.description}
                  stats={[]}
                />
              </UnstyledButton>
            </>
          ))}
        </Stack>

        <Button
          leftIcon={<IconPlus />}
          onClick={async () => {
            const orgsResponse = await GetOrgs();
            setAllOrgs(orgsResponse.orgs);

            setOpenJoinDrawer(true);
          }}
        >
          {" "}
          Join an organization{" "}
        </Button>
      </Stack>
    </>
  );
};

export default Orgs;
