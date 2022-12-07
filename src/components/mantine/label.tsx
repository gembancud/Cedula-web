import { Text } from "@mantine/core";

interface LabelInterface {
  label: string;
  value: string;
}
export const Label = ({ label, value }: LabelInterface) => {
  return (
    <>
      <Text fz="xs" fw={500}>
        {label}
      </Text>
      <Text>{value}</Text>
    </>
  );
};
