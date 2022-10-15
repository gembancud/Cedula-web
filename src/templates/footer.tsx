import type { MantineTheme } from "@mantine/core";
import { ActionIcon, Container, createStyles, Group } from "@mantine/core";
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons";
// import { MantineLogo } from "@mantine/ds";
import Image from "next/image";

import DarkToggle from "@/components/mantine/darktoggle";
import { AppConfig } from "@/utils/AppConfig";

const useStyles = createStyles((theme: MantineTheme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark"
        ? theme?.colors.dark![5]
        : theme?.colors.gray![2]
    }`,
    position: "relative",
    left: 0,
    bottom: 0,
    right: 0,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export default function FooterSocial() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        {/* <MantineLogo size={28} /> */}

        <Image
          src="/assets/images/cedula128.png"
          alt="Cedula Image"
          width={128}
          height={128}
        />
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <DarkToggle />
          <ActionIcon size="lg">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
      <div className="border-t border-gray-300 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{" "}
        <span role="img" aria-label="Love">
          ♥
        </span>{" "}
        by <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>
        {/*
         * PLEASE READ THIS SECTION
         * We'll really appreciate if you could have a link to our website
         * The link doesn't need to appear on every pages, one link on one page is enough.
         * Thank you for your support it'll mean a lot for us.
         */}
      </div>
    </div>
  );
}
