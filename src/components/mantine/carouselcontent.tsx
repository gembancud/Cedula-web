import { Center, Image, Text } from "@mantine/core";
import { useRouter } from "next/router";

interface CompProps {
  src: string;
  alt: string;
}
const Comp = (props: CompProps) => {
  const router = useRouter();
  const src = router.basePath + props.src;

  return (
    <Image src={src} radius="sm" alt={props.alt}>
      <Center p="md">
        <Text color="#fff">theheh hahsdhashd h ashd ashda shd ashd</Text>
      </Center>
    </Image>
  );
};

export default Comp;
