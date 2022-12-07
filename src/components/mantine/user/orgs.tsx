import { Button, Stack, Title, UnstyledButton } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useState } from "react";

import { GetOrgs } from "@/services";
import type { BaseOrgType, MeOrgType, MeType } from "@/types";

import { BrowseDrawer } from "./browsedrawer";
import { ManageDrawer } from "./managedrawer";
import { OrgCard } from "./OrgCard";

interface OrgsInterface {
  me: MeType;
}

const Orgs = ({ me }: OrgsInterface) => {
  const [openManageDrawer, setOpenManageDrawer] = useState(false);
  const [openJoinDrawer, setOpenJoinDrawer] = useState(false);
  const [allOrgs, setAllOrgs] = useState<BaseOrgType[] | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<
    BaseOrgType | MeOrgType | null
  >(null);
  console.log("me", me);
  // const AuthUser = useAuthUser();
  //

  return (
    <>
      {ManageDrawer({
        open: openManageDrawer,
        setOpen: setOpenManageDrawer,
        org: selectedOrg as MeOrgType,
      })}
      {BrowseDrawer({
        open: openJoinDrawer,
        setOpen: setOpenJoinDrawer,
        orgs: allOrgs as BaseOrgType[],
      })}
      <Stack
        spacing="md"
        justify="center"
        sx={() => ({
          padding: "5% 20%",
        })}
      >
        <Title order={3}>My Organizations</Title>
        <Stack>
          {me.orgs.map((org: MeOrgType) => (
            <>
              <UnstyledButton
                key={org.name}
                onClick={() => {
                  setSelectedOrg(org);
                  setOpenManageDrawer(true);
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
