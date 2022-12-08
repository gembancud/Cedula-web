import { Drawer, useMantineTheme } from "@mantine/core";

import type { BaseOrgType } from "@/types";

import { OrgCard } from "../OrgCard";

interface BrowseDrawerInterface {
  open: boolean;
  setDrawerState: (val: number) => void;
  orgs: BaseOrgType[];
  setSelectedOrg: (org: BaseOrgType) => void;
}
export const BrowseDrawer = ({
  open,
  setDrawerState,
  orgs,
  setSelectedOrg,
}: BrowseDrawerInterface) => {
  const theme = useMantineTheme();

  return (
    <Drawer
      opened={open}
      onClose={() => setDrawerState(0)}
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
      {orgs &&
        orgs!.map((org: BaseOrgType) => (
          <OrgCard
            key={org.name}
            image={org.image}
            name={org.name}
            description={org.description}
            stats={[]}
            onClick={() => {
              setSelectedOrg(org);
              setDrawerState(3);
            }}
          />
        ))}
    </Drawer>
  );
};
