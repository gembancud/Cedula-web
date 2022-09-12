import type { ReactNode } from "react";

import Footer from "./footer";
import Header from "./header";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div>
    {/* <div className="w-full px-1 text-gray-700 antialiased"> */}
    {props.meta}

    <div className="mx-auto max-w-screen-md">
      <Header
        links={[
          {
            link: "/",
            label: "Home",
            links: undefined,
          },
          {
            link: "/about",
            label: "About",
            links: undefined,
          },
        ]}
      />

      {/* <div className="content py-5 text-xl">{props.children}</div> */}
      <div>{props.children}</div>
      <Footer />
    </div>
  </div>
);

export { Main };
