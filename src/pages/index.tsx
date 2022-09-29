import { withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";

import Contact from "@/components/mantine/landing/contact";
import Faq from "@/components/mantine/landing/faq";
import Hero from "@/components/mantine/landing/hero";
import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Cedula landing"
          description="Cedula is community-driven verification system for Filipinos on Facebook"
        />
      }
    >
      <Hero />
      <Faq />
      <Contact />
      {/* <Carousel /> */}
      {/* <NextLink href="/verify/">Verify</NextLink> */}
      {/* <NextLink href="/signup">Signup</NextLink> */}
    </Main>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  // whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser()(Index);
