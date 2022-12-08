import {
  Burger,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Header,
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconLogout, IconSettings } from "@tabler/icons";
// import { MantineLogo } from "@mantine/ds";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import { useEffect, useState } from "react";

import { Tag } from "@/components/cedula";
import { GetUserMe } from "@/services";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark![0]
        : theme.colors.gray![7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark![6]
          : theme.colors.gray![0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

interface HeaderActionProps {
  links: {
    link: string;
    label: string;
    links: { link: string; label: string }[] | undefined;
  }[];
}

export default function HeaderAction({ links }: HeaderActionProps) {
  const { classes } = useStyles();
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure(false);

  const AuthUser = useAuthUser();
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await AuthUser.getIdToken();
        if (!token) throw new Error("Token invalid");
        const response = await GetUserMe({ token: token! });
        setUser(response);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    }

    if (!loaded) fetchData();
  });

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => {
                event.preventDefault();
                router.push(link.link);
              }}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => {
          event.preventDefault();
          router.replace(link.link);
        }}
      >
        {link.label}
      </a>
    );
  });

  const SettingsClick = (event: any) => {
    event.preventDefault();
    router.replace("user");
  };

  const LogoutClick = async () => {
    await AuthUser.signOut();
    router.reload();
  };

  const menu = () => {
    return (
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button>My Account</Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item icon={<IconSettings size={14} />} onClick={SettingsClick}>
            Settings
          </Menu.Item>
          <Menu.Item
            color="red"
            icon={<IconLogout size={14} />}
            onClick={LogoutClick}
          >
            Sign out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  };

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Image
            src="/assets/images/cedula128.png"
            alt="Cedula Image"
            width={128}
            height={128}
          />
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        {user && <Tag />}
        {user ? (
          menu()
        ) : (
          <Button
            radius="xl"
            sx={{ height: 30 }}
            onClick={(event) => {
              event.preventDefault();
              router.replace("/login");
            }}
          >
            Login to Cedula
          </Button>
        )}
      </Container>
    </Header>
  );
}
