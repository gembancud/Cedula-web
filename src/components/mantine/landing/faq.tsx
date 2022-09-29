import { Accordion, Container, createStyles, Title } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    minHeight: 650,
  },

  title: {
    marginBottom: theme.spacing.xl * 1.5,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,

    border: `1px solid ${
      theme.colorScheme === "dark"
        ? theme.colors.dark![4]
        : theme.colors.gray![3]
    }`,
  },
}));

export default function FaqSimple() {
  const { classes } = useStyles();
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title align="center" className={classes.title}>
        Frequently Asked Questions
      </Title>

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="how">
          <Accordion.Control>How does this work?</Accordion.Control>
          <Accordion.Panel>
            You sign in with your Facebook account, and fill up the form. Once
            you have been verified, your name will have a badge for others to
            see.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="multiple-account">
          <Accordion.Control>
            Can I create more that one account?
          </Accordion.Control>
          <Accordion.Panel>
            Your legal identity can only be verified once. If you have multiple
            accounts, you can only verify one of them. If your identity is being
            used by someone else, please contact us.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="Verification">
          <Accordion.Control>How does verification work?</Accordion.Control>
          <Accordion.Panel>
            Verification is manually and carefully done by our legal team. We
            will browse your submitted information and verify for authenticity.
            <br />
            <br />
            Specifically, when you sign up, your information will be sent to
            three random checkers. Each checker will independently verify your
            identity. You will be verified if all three checkers agree that your
            identity is authentic. If any checker disagrees, you will be asked
            to provide more information.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="Badge">
          <Accordion.Control>Can I change my badge?</Accordion.Control>
          <Accordion.Panel>
            There is currently no way to change your badge.
            <br />
            <br />
            In the future, we will add a way to have custom badges.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="Twitter">
          <Accordion.Control>Is there cedula for twitter</Accordion.Control>
          <Accordion.Panel>
            Cedula only works for Facebook on Chrome.
            <br />
            <br />
            We plan to add support for other social media platforms in the
            future.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="Chrome">
          <Accordion.Control>Im not using chrome!</Accordion.Control>
          <Accordion.Panel>
            The extension is only available for chrome. We plan to release to
            other major browsers in the future.
            <br />
            <br />
            Mobile application support is a different story. We are currently
            looking for workarounds to make it work on mobile.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
