import {
  Avatar,
  Button,
  Drawer,
  Group,
  Image as MantineImage,
  Indicator,
  Stack,
  Text,
  Title,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";

import { Label } from "../label";
import type { MeOrgType } from "./orgs";

interface ManageDrawerInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
  org: MeOrgType | null;
}

export const ManageDrawer = ({ open, setOpen, org }: ManageDrawerInterface) => {
  const theme = useMantineTheme();

  if (!org) return null;
  const badges = () => {
    if (!org) return null;
    return org.badges.map((badge) => (
      <UnstyledButton key={badge.name} onClick={() => {}}>
        <Group>
          {org.active_badge === badge.name ? (
            <Indicator label="active" size={12}>
              <Avatar src={badge.link} />
            </Indicator>
          ) : (
            <Avatar src={badge.link} />
          )}
          <Text>{badge.name}</Text>
        </Group>
      </UnstyledButton>
    ));
  };

  if (!org) return null;
  return (
    <Drawer
      opened={open}
      onClose={() => setOpen(false)}
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
      <MantineImage
        radius="md"
        src={org.image}
        width={200}
        height={80}
        fit="contain"
        alt="Random unsplash image"
      />
      <Label label="Name" value={org.name} />
      <Label label="Description" value={org.description} />
      <Label label="Status" value={org.status} />

      <Title order={4}>Badges</Title>
      <Stack align="flex-start">{badges()}</Stack>

      <Group position="right" mt="xl">
        <Button
          variant="default"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button onClick={() => {}}>Save</Button>
      </Group>
    </Drawer>
  );
};
