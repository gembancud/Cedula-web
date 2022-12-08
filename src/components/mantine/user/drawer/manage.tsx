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
import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";

import { ChangeBadge } from "@/services";
import type { MeOrgType } from "@/types";

import { Label } from "../../label";

interface ManageDrawerInterface {
  open: boolean;
  setDrawerState: (val: number) => void;
  org: MeOrgType | null;
}

export const ManageDrawer = ({
  open,
  setDrawerState,
  org,
}: ManageDrawerInterface) => {
  const theme = useMantineTheme();
  const AuthUser = useAuthUser();

  const [isDirty, setIsDirty] = useState(false);
  const [activeBadge, setActiveBadge] = useState(org?.active_badge);

  if (!org) return null;

  const badges = () => {
    if (!org.badges) return null;
    return org.badges.map((badge) => (
      <UnstyledButton
        key={badge.name}
        onClick={() => {
          console.log("active badge", badge.name);
          setActiveBadge(badge.name);
          setIsDirty(true);
        }}
      >
        <Group>
          {(activeBadge ?? org.active_badge) === badge.name ? (
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

  return (
    <Drawer
      opened={open}
      onClose={() => setDrawerState(0)}
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
      <Label label="Website" value={org.website} />
      <Label label="Description" value={org.description} />
      <Label label="Status" value={org.status} />

      {org.badges && (
        <>
          <Title order={4}>Badges</Title>
          <Stack align="flex-start">{badges()}</Stack>
        </>
      )}

      <Group position="right" mt="xl">
        <Button
          variant="default"
          onClick={() => {
            setDrawerState(0);
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={!isDirty}
          onClick={async () => {
            setIsDirty(false);
            const token = await AuthUser.getIdToken();
            await ChangeBadge({
              token: token!,
              org,
              badge: activeBadge!,
            });
          }}
        >
          Save
        </Button>
      </Group>
    </Drawer>
  );
};
