import { ActionIcon, Badge } from "@mantine/core";
import { IconX } from "@tabler/icons";

interface FileBadgeProps {
  filename: string;
  index: number;
  removeFile: (index: number) => void;
}

const FileBadge = ({ filename, index, removeFile }: FileBadgeProps) => {
  const removeButton = (
    <ActionIcon
      size="xs"
      color="blue"
      radius="xl"
      variant="transparent"
      onClick={() => removeFile(index)}
    >
      <IconX size={10} />
    </ActionIcon>
  );
  return (
    <Badge
      variant="outline"
      sx={{ paddingRight: 3 }}
      rightSection={removeButton}
    >
      {filename}
    </Badge>
  );
};

export default FileBadge;
