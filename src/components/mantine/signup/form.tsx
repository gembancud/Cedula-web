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
import { useAuthUser } from "next-firebase-auth";
import { useRef, useState } from "react";
import { z } from "zod";

import { upload } from "@/utils/cloudinary";

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
  const AuthUser = useAuthUser();
  const [active, setActive] = useState(0);
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<HCaptcha | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [filenames, setFilenames] = useState<string[]>([]);

  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    if (captchaRef != null) captchaRef!.current!.execute();
  };

  const form = useForm({
    validateInputOnChange: ["name", "email"],
    initialValues: {
      name: "",
      email: "",
      link: "",
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

  const submitForm = async () => {
    const authToken = await AuthUser.getIdToken();

    try {
      const verifyresponse = await fetch("http://localhost:4000/user/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: authToken || "unauthenticated",
          // cookie: ,
        },
        body: JSON.stringify({
          name: form.values.name,
          email: form.values.email,
          link: form.values.link,
          captchaToken,
        }),
      });

      const data = await verifyresponse.json();
      if (verifyresponse.ok) {
        const cloudinaryresponse = await upload(files, data.cloudinary);
        const uploadresponse = await fetch(
          "http://localhost:4000/user/upload",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: authToken || "unauthenticated",
            },
            body: JSON.stringify({
              email: form.values.email,
              documents: Array.from(
                cloudinaryresponse.map((res: any) => res.secure_url)
              ),
            }),
          }
        );

        const uploaddata = await uploadresponse.json();
        console.log("uploaddata", uploaddata);
        // should reload page
        // window.location.reload();
      } else {
        throw new Error(data.message);
      }
      nextStep();
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () =>
    openConfirmModal({
      title: "Are you sure?",
      children: (
        <Text size="sm">
          You are about to submit the form, please make sure that all the
          information is correct, for our team to review your application.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        submitForm();
      },
    });

  const setFilesCallback = (newfiles: FileWithPath[]) => {
    const tempfiles = [...files];
    const tempfilenames = [...filenames];
    newfiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        tempfiles.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
    newfiles.forEach((file) => {
      tempfilenames.push(file.name);
    });

    setFiles(tempfiles);
    setFilenames(tempfilenames);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    const newFilenames = [...filenames];
    newFiles.splice(index, 1);
    newFilenames.splice(index, 1);
    setFiles(newFiles);
    setFilenames(newFilenames);
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

              <TextInput
                withAsterisk
                label="Profile Link"
                placeholder="https://www.facebook.com/yourprofile"
                {...form.getInputProps("link")}
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
              {filenames.map((filename, index) => {
                return (
                  <FileBadge
                    key={index}
                    filename={filename}
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
              {files.length}
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
