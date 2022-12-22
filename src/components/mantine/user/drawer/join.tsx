import HCaptcha from "@hcaptcha/react-hcaptcha";
import {
  Button,
  Drawer,
  Group,
  Image,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import type { FileWithPath } from "@mantine/dropzone";
import { useAuthUser } from "next-firebase-auth";
import { useRef, useState } from "react";

import { Signup } from "@/services";
import type { BaseOrgType, MeType } from "@/types";

import { Label } from "../../label";
import DropZone from "../../signup/dropzone";
import FileBadge from "../../signup/filebadge";

interface JoinDrawerInterface {
  me: MeType;
  open: boolean;
  setBrowserState: (open: number) => void;
  org: BaseOrgType;
}
export const JoinDrawer = ({
  me,
  open,
  setBrowserState,
  org,
}: JoinDrawerInterface) => {
  const theme = useMantineTheme();
  const AuthUser = useAuthUser();

  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<HCaptcha | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [filenames, setFilenames] = useState<string[]>([]);

  const onLoad = () => {
    if (captchaRef != null) captchaRef!.current!.execute();
  };

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

  if (!org) return null;
  return (
    <Drawer
      opened={open}
      onClose={() => setBrowserState(0)}
      title="Join Organization"
      padding="xl"
      size="xl"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark![9]
          : theme.colors.gray![2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
    >
      <Image
        radius="md"
        src={org.image}
        width={200}
        height={80}
        fit="contain"
        alt="Random unsplash image"
      />
      <Label label="Name" value={org.name} />
      <Label label="Website" value={org.website} />
      <Label label="Description" value={org.description} />
      <Label label="Requirements" value={org.requirements} />

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

      <Group position="right" mt="xl">
        <Stack>
          <HCaptcha
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onLoad={onLoad}
            onVerify={setCaptchaToken}
            ref={captchaRef}
          />

          <Button
            onClick={async () => {
              try {
                const authToken = await AuthUser.getIdToken();
                if (authToken === null) throw new Error("No auth token");
                const signUpResponse = await Signup({
                  authToken,
                  email: me.email,
                  org: org.name,
                  captchaToken,
                  files,
                });

                if (signUpResponse.status === 201) {
                  window.location.reload();
                }
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Join
          </Button>
        </Stack>
      </Group>
    </Drawer>
  );
};
