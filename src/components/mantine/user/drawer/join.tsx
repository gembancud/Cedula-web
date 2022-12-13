import { Drawer, Group, Image, useMantineTheme } from "@mantine/core";
import type { FileWithPath } from "@mantine/dropzone";
import { useState } from "react";

import type { BaseOrgType } from "@/types";

import { Label } from "../../label";
import DropZone from "../../signup/dropzone";
import FileBadge from "../../signup/filebadge";

interface JoinDrawerInterface {
  open: boolean;
  setBrowserState: (open: number) => void;
  org: BaseOrgType;
}
export const JoinDrawer = ({
  open,
  setBrowserState,
  org,
}: JoinDrawerInterface) => {
  const theme = useMantineTheme();

  const [files, setFiles] = useState<string[]>([]);
  const [filenames, setFilenames] = useState<string[]>([]);

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
    </Drawer>
  );
};
