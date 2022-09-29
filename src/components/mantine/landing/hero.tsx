import { Button, Container, createStyles, Group, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconBrandChrome } from "@tabler/icons";

const BREAKPOINT = "@media (max-width: 755px)";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark![8]
        : theme.colors.blue![0],
  },

  inner: {
    position: "relative",
    paddingTop: 200,
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },
}));

export default function HeroTitle() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          A verification system for Filipinos on{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            Facebook
          </Text>{" "}
        </h1>

        <Text className={classes.description} color="dimmed">
          Sign up to be a part of the Cedula community and be verified as
          Filipino on Facebook.
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            component={NextLink}
            href="/signup"
          >
            Sign up
          </Button>

          <Button
            component="a"
            href="https://chrome.google.com/webstore/detail/cedula/idbkfjpjeopbcpkbblahokabfdiakpli"
            size="xl"
            variant="default"
            className={classes.control}
            leftIcon={<IconBrandChrome size={20} />}
          >
            Get Chrome Extension
          </Button>
        </Group>
      </Container>
    </div>
  );
}
