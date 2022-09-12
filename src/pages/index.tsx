import {
  Button,
  Container,
  createStyles,
  Overlay,
  Text,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  container: {
    height: 700,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: theme.spacing.xl * 6,
    zIndex: 1,
    position: "relative",

    [theme.fn.smallerThan("sm")]: {
      height: 500,
      paddingBottom: theme.spacing.xl * 3,
    },
  },

  title: {
    color: theme.white,
    fontSize: 60,
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 40,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: theme.spacing.xl * 1.5,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));
const Index = () => {
  const { classes } = useStyles();
  return (
    <Main
      meta={
        <Meta
          title="Cedula landing"
          description="Cedula is community-driven verification system for Filipinos on Facebook"
        />
      }
    >
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container}>
          <Title className={classes.title}>
            A verification system for Filipinos on Facebook
          </Title>
          <Text className={classes.description} size="xl" mt="xl">
            Sign up to be a part of the Cedula community and be verified as
            Filipino on Facebook.
          </Text>

          <Button
            variant="gradient"
            size="xl"
            radius="xl"
            component={NextLink}
            href="/signup"
            className={classes.control}
          >
            Get started
          </Button>
        </Container>
      </div>
      {/* <Carousel /> */}
      {/* <NextLink href="/verify/">Verify</NextLink> */}
      {/* <NextLink href="/signup">Signup</NextLink> */}
    </Main>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  // whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser()(Index);
