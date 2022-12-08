import HCaptcha from "@hcaptcha/react-hcaptcha";
import {
  Box,
  Button,
  Center,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { openConfirmModal } from "@mantine/modals";
import { useAuthUser } from "next-firebase-auth";
import { useRef, useState } from "react";
import { z } from "zod";

import { PatchUserMe, PostUserMe } from "@/services";
import type { MeType } from "@/types";

const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  contact_number: z.string().min(10, { message: "Invalid contact number" }),
  fblink: z.string().url({ message: "Invalid URL" }),
});

interface ProfileInterface {
  me: MeType | null;
}

const Profile = ({ me }: ProfileInterface) => {
  const AuthUser = useAuthUser();
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<HCaptcha | null>(null);

  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    if (captchaRef != null) captchaRef!.current!.execute();
  };

  const form = useForm({
    validateInputOnChange: ["name", "email", "contact_number", "fblink"],
    initialValues: {
      name: me ? me.name : "",
      email: me ? me.email : "",
      contact_number: me ? me.contact_number : "",
      fblink: me ? me.links.filter((link) => link.site === "fb")[0]!.link : "",
      twitterlink: me
        ? me.links.filter((link) => link.site === "twitter")[0]!.link
        : "",
      redditlink: me
        ? me.links.filter((link) => link.site === "reddit")[0]!.link
        : "",
    },
    validate: zodResolver(schema),
  });

  const submitForm = async () => {
    try {
      const authToken = await AuthUser.getIdToken();
      if (authToken === null) throw new Error("No auth token");

      let response;
      if (me) {
        console.log("patching");
        response = await PatchUserMe({
          authToken,
          name: form.values.name,
          email: form.values.email,
          contact_number: form.values.contact_number,
          fblink: form.values.fblink,
          twitterlink: form.values.twitterlink,
          redditlink: form.values.redditlink,
          captchaToken,
        });
      } else {
        response = await PostUserMe({
          authToken,
          name: form.values.name,
          email: form.values.email,
          contact_number: form.values.contact_number,
          fblink: form.values.fblink,
          twitterlink: form.values.twitterlink,
          redditlink: form.values.redditlink,
          captchaToken,
        });
      }
      if (response) {
        window.location.reload();
      }
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

  return (
    <Box sx={{ maxWidth: 1000 }} mx="auto">
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
          disabled={me}
        />

        <TextInput
          withAsterisk
          label="Contact Number"
          placeholder="09123456789"
          {...form.getInputProps("contact_number")}
        />

        <TextInput
          withAsterisk
          label="Facebook Profile Link"
          placeholder="https://www.facebook.com/yourprofile"
          {...form.getInputProps("fblink")}
        />

        <TextInput
          // withAsterisk
          label="Twitter Profile Link"
          placeholder="https://twitter.com/yourprofile"
          {...form.getInputProps("twitterlink")}
        />

        <TextInput
          // withAsterisk
          label="Reddit Profile Link"
          placeholder="https://www.reddit.com/user/yourprofile"
          {...form.getInputProps("redditlink")}
        />

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
      </Stack>

      <Group position="right" mt="xl">
        <Button
          variant="default"
          onClick={() => {
            window.location.reload();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            openModal();
          }}
        >
          Save
        </Button>
      </Group>
    </Box>
  );
};

export default Profile;
