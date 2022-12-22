import {
  Card,
  createStyles,
  Group,
  Image,
  Text,
  UnstyledButton,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark![7] : theme.white,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    borderTop: `1px solid ${
      theme.colorScheme === "dark"
        ? theme.colors.dark![5]
        : theme.colors.gray![2]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

interface OrgCardInterface {
  image: string;
  name: string;
  description: string;
  stats:
    | {
        title: string;
        value: string;
      }[]
    | null;
  onClick?: () => void;
}

export function OrgCard({
  image,
  name: title,
  description,
  stats,
  onClick,
}: OrgCardInterface) {
  const { classes } = useStyles();

  const items = stats!.map((stat) => (
    <div key={stat.title}>
      <Text size="xs" color="dimmed">
        {stat.title}
      </Text>
      <Text weight={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ));

  return (
    <UnstyledButton
      sx={{
        width: "100%",
      }}
      onClick={onClick}
    >
      <Card withBorder p="lg" className={classes.card}>
        <Card.Section>
          <Image src={image} alt={title} height={100} />
        </Card.Section>

        <Group position="apart" mt="xl">
          <Text size="sm" weight={700} className={classes.title}>
            {title}
          </Text>
          <Group spacing={5}>
            <Text size="xs" color="dimmed">
              80% completed
            </Text>
          </Group>
        </Group>
        <Text mt="sm" mb="md" color="dimmed" size="xs">
          {description}
        </Text>
        <Card.Section className={classes.footer}>{items}</Card.Section>
      </Card>
    </UnstyledButton>
  );
}
