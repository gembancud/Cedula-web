import { Drawer, Image, useMantineTheme } from "@mantine/core";

import type { BaseOrgType } from "@/types";

import { Label } from "../../label";

interface JoinDrawerInterface {
  open: boolean;
  setBrowserState: (open: number) => void;
  org: BaseOrgType;
}
export const JoinDrawer = ({
  open,
  setBrowserState,
  org,
}: JoinDrawerInterface) => {
  const theme = useMantineTheme();
  if (!org) return null;
  return (
    <Drawer
      opened={open}
      onClose={() => setBrowserState(0)}
      title="Join Organization"
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
      <Image
        radius="md"
        src={org.image}
        width={200}
        height={80}
        fit="contain"
        alt="Random unsplash image"
      />
      <Label label="Name" value={org.name} />
      <Label label="Website" value={org.website} />
      <Label label="Description" value={org.description} />
      <Label label="Requirements" value={org.requirements} />
    </Drawer>
  );
};
