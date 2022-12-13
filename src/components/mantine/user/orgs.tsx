import { Button, Group, Stack, Title, UnstyledButton } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useState } from "react";

import { GetOrgs } from "@/services";
import type { BaseOrgType, MeOrgType, MeType } from "@/types";

import { BrowseDrawer, JoinDrawer, ManageDrawer, ViewDrawer } from "./drawer";
import { OrgCard } from "./OrgCard";

interface OrgsInterface {
  me: MeType;
}

const Orgs = ({ me }: OrgsInterface) => {
  // 0 = closed, 1 = manage, 2 = browse, 3 = view, 4 = join
  const [drawerState, setDrawerState] = useState<number>(0);
  const [allOrgs, setAllOrgs] = useState<BaseOrgType[] | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<
    BaseOrgType | MeOrgType | null
  >(null);

  return (
    <div>
      {ManageDrawer({
        open: drawerState === 1,
        setDrawerState,
        org: selectedOrg as MeOrgType,
      })}
      {BrowseDrawer({
        open: drawerState === 2,
        setDrawerState,
        orgs: allOrgs as BaseOrgType[],
        setSelectedOrg,
      })}
      {ViewDrawer({
        me,
        open: drawerState === 3,
        setBrowserState: setDrawerState,
        org: selectedOrg as BaseOrgType,
        setSelectedOrg,
      })}
      {JoinDrawer({
        open: drawerState === 4,
        setBrowserState: setDrawerState,
        org: selectedOrg as BaseOrgType,
      })}
      <Stack
        spacing="md"
        justify="center"
        sx={() => ({
          padding: "5% 20%",
        })}
      >
        <Group position="apart">
          <Title order={3}>My Organizations</Title>
          <Button
            leftIcon={<IconPlus />}
            onClick={async () => {
              const orgsResponse = await GetOrgs();
              setAllOrgs(orgsResponse.orgs);
              setDrawerState(2);
            }}
          >
            {" "}
            Join an organization{" "}
          </Button>
        </Group>
        <Stack>
          {me.orgs.map((org: MeOrgType) => (
            <>
              <UnstyledButton
                key={org.name}
                onClick={() => {
                  setSelectedOrg(org);
                  setDrawerState(1);
                }}
              >
                <OrgCard
                  image={org.image}
                  name={org.name}
                  description={org.description}
                  stats={[]}
                />
              </UnstyledButton>
            </>
          ))}
        </Stack>
      </Stack>
    </div>
  );
};

export default Orgs;
