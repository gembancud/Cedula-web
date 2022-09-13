import HCaptcha from "@hcaptcha/react-hcaptcha";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Code,
  Divider,
  Group,
  Paper,
  Stack,
  Stepper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import type { FileWithPath } from "@mantine/dropzone";
import { useForm, zodResolver } from "@mantine/form";
import { openConfirmModal } from "@mantine/modals";
import { useRef, useState } from "react";
import { z } from "zod";

import DropZone from "./dropzone";
import FileBadge from "./filebadge";

const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  termsOfService: z.boolean().refine((value) => value, {
    message: "You must agree to the terms of service",
  }),
});

const Form = () => {
  const [active, setActive] = useState(0);
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<HCaptcha | null>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const submitForm = () => {
    console.log("submitting form", captchaToken);
  };

  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    if (captchaRef != null) captchaRef!.current!.execute();
  };
  const openModal = () =>
    openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => submitForm,
    });

  const form = useForm({
    validateInputOnChange: ["name", "email"],
    initialValues: {
      name: "",
      email: "",
      termsOfService: false,
    },

    validate: zodResolver(schema),
  });
  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const setFilesCallback = (newfiles: FileWithPath[]) => {
    setFiles(newfiles);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <Paper shadow="md" radius="xl" p="xl" withBorder>
      <Box sx={{ maxWidth: 1000 }} mx="auto">
        <Title order={3} align="center" sx={{ paddingBottom: "2%" }}>
          Cedula Sign up form
        </Title>
        <Divider my="sm" />
        <Stepper active={active} breakpoint="sm">
          <Stepper.Step label="First step" description="Basic information">
            <Stack
              align="stretch"
              spacing="md"
              justify="center"
              sx={() => ({
                padding: "5% 20%",
                // height: "50%",
                // width: "100%",
              })}
            >
              <TextInput
                withAsterisk
                label="Name (Full Name)"
                placeholder="Juan Dela Cruz"
                {...form.getInputProps("name")}
              />

              <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
              />

              <Checkbox
                mt="md"
                sx={{
                  alignSelf: "end",
                }}
                label=" I agree to terms of service"
                {...form.getInputProps("termsOfService", { type: "checkbox" })}
              />
            </Stack>
          </Stepper.Step>

          <Stepper.Step label="Second step" description="Supporting Documents">
            <Title order={4} align="center" sx={{ paddingBottom: "2%" }}>
              Submit supporting documents
            </Title>
            <Group
              sx={{
                padding: "1% 3%",
              }}
            >
              {files.map((file, index) => {
                return (
                  <FileBadge
                    key={index}
                    filename={file.name}
                    index={index}
                    removeFile={removeFile}
                  />
                );
              })}
            </Group>
            <DropZone setFilesCallback={setFilesCallback} />
          </Stepper.Step>

          <Stepper.Step label="Final step" description="Review">
            <Code block mt="xl">
              {JSON.stringify(form.values, null, 2)}
            </Code>
            <Center
              sx={{
                padding: "5% 5%",
              }}
            >
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onLoad={onLoad}
                onVerify={setCaptchaToken}
                ref={captchaRef}
              />
            </Center>
          </Stepper.Step>
          <Stepper.Completed>Completed! Form values:</Stepper.Completed>
        </Stepper>
        <Group position="right" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}
          {active !== 3 && (
            <Button
              onClick={() => {
                if (active > 1) openModal();
                else nextStep();
              }}
            >
              {active < 2 ? "Next Step" : "Submit"}
            </Button>
          )}
        </Group>
      </Box>
    </Paper>
  );
};

export default Form;
