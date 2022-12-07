import { Drawer, useMantineTheme } from "@mantine/core";

import { OrgCard } from "./OrgCard";
import type { BaseOrgType } from "./orgs";

interface BrowseDrawerInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
  orgs: BaseOrgType[];
}
export const BrowseDrawer = ({
  open,
  setOpen,
  orgs,
}: BrowseDrawerInterface) => {
  const theme = useMantineTheme();
  return (
    <Drawer
      opened={open}
      onClose={() => setOpen(false)}
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
          />
        ))}
    </Drawer>
  );
};
