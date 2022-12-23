import {
  Button,
  CheckIcon,
  Container,
  Group,
  Select,
  Space,
  Tabs,
  Textarea,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { useAuthUser } from "next-firebase-auth";
import { useEffect, useState } from "react";
import {
  DateField,
  Show,
  SimpleShowLayout,
  TextField,
  useGetOne,
} from "react-admin";
import { useParams } from "react-router-dom";

import { VerifyUser } from "@/services";

export const VerifyShow = () => {
  const { id } = useParams();
  const [evaluationValue, setEvaluationValue] = useState<string | null>(null);
  const [evaluationComment, setEvaluationComment] = useState<string>("");
  const { data, isLoading } = useGetOne("verify", { id });
  const [userToken, setUserToken] = useState("");
  const AuthUser = useAuthUser();
  useEffect(() => {
    const getAuthUserToken = async () => {
      try {
        const token = await AuthUser.getIdToken();
        setUserToken(token!);
      } catch (err) {
        console.log(err);
      }
    };
    getAuthUserToken();
  }, []);

  const approve = async () => {
    if (evaluationValue === null) {
      showNotification({
        title: "Oops",
        message: "Please select an evaluation",
        color: "red",
        icon: <IconX />,
      });
      return;
    }
    const verifyResponse = await VerifyUser({
      token: userToken,
      email: data.email,
      org: data.org,
      evaluation: evaluationValue!,
      comment: evaluationComment,
    });
    console.log("verifyResponse", verifyResponse);

    showNotification({
      title: "Accepted",
      message: `User ${data.name} has been accepted`,
      color: "green",
      icon: <CheckIcon />,
    });
  };

  const reject = () => {
    // TODO: add reject functionality
    console.log("reject");
  };

  console.log("data", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Tabs defaultValue="inspect" orientation="vertical">
        <Tabs.List>
          <Tabs.Tab value="inspect">Inspect</Tabs.Tab>
          <Tabs.Tab value="raw">Raw</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="inspect">{data.name}</Tabs.Panel>
        <Tabs.Panel value="raw">
          <Show>
            <SimpleShowLayout>
              <TextField source="name" />
              <TextField source="email" />
              <TextField source="links" />
              <TextField source="org" />
              <DateField source="createdAt" />
              <DateField source="updatedAt" />
              <TextField source="documents" />
              <TextField source="status" />
              <TextField source="evaluation" />
              <TextField source="evaluators" />
            </SimpleShowLayout>
          </Show>
        </Tabs.Panel>
      </Tabs>
      <Container style={{ width: "100%" }} px="md">
        <Title order={3}>Evaluator Panel</Title>
        <Select
          label="Evaluation"
          placeholder="Select evaluation"
          value={evaluationValue}
          onChange={setEvaluationValue}
          data={[
            { value: "accept", label: "Accept" },
            { value: "reject", label: "Reject" },
          ]}
        />
        <Textarea
          placeholder="Enter evaluation comments"
          label="Comment"
          autosize
          minRows={2}
          value={evaluationComment}
          onChange={(event) => setEvaluationComment(event.currentTarget.value)}
        />
        <Space h="xl" />
        <Group position="right">
          <Button onClick={approve}>Approve</Button>
          <Button onClick={reject}>Reject</Button>
        </Group>
      </Container>
    </>
  );
};
