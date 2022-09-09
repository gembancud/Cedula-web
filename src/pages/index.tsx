import { NextLink } from "@mantine/next";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

import Carousel from "../components/carousel";

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Cedula landing"
          description="Cedula is community-driven verification systme for Filipinos on Facebook"
        />
      }
    >
      <Carousel />
      <NextLink href="/verify">Verify</NextLink>
    </Main>
  );
};

export default Index;
