import { Button, Drawer, Image, useMantineTheme } from "@mantine/core";

import type { BaseOrgType, MeType } from "@/types";

import { Label } from "../../label";

interface ViewDrawerInterface {
  me: MeType;
  open: boolean;
  setBrowserState: (open: number) => void;
  org: BaseOrgType;
  setSelectedOrg: (org: BaseOrgType) => void;
}
export const ViewDrawer = ({
  me,
  open,
  setBrowserState,
  org,
  setSelectedOrg,
}: ViewDrawerInterface) => {
  const theme = useMantineTheme();

  if (!org) return null;

  const hasJoined =
    me.orgs.find((myOrg) => myOrg.name === org.name) !== undefined;

  return (
    <Drawer
      opened={open}
      onClose={() => setBrowserState(0)}
      title="View Organization"
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

      {hasJoined ? (
        <Button
          onClick={() => {
            setSelectedOrg(me.orgs.find((myOrg) => myOrg.name === org.name)!);
            setBrowserState(1);
          }}
        >
          Manage
        </Button>
      ) : (
        <Button
          onClick={() => {
            setSelectedOrg(org);
            setBrowserState(4);
          }}
        >
          Join
        </Button>
      )}
    </Drawer>
  );
};
