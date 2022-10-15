// import { useRouter } from "next/router";
import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import * as React from "react";
import { useEffect, useState } from "react";
import { Admin, Resource } from "react-admin";

import { GetCustomDataProvider } from "@/utils/CustomDataProvider";

import { VerifyEdit, VerifyList, VerifyShow } from "./verify";

const App = () => {
  const AuthUser = useAuthUser();
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_BACKEND_API_URL!;

  const [dataProvider, setDataProvider] = useState<any>();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const tmpAuthToken = await AuthUser.getIdToken();
        if (tmpAuthToken) {
          const verifyresponse = await fetch(`${url}/evaluator`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: tmpAuthToken || "unauthenticated",
            },
          });
          console.log("verifyresponse", verifyresponse);
          if (verifyresponse.status === 200) {
            setLoaded(true);
            setDataProvider(GetCustomDataProvider(tmpAuthToken));
          } else throw new Error("Not authorized");
        }
      } catch (error) {
        console.log(error);
        router.replace("/");
      }
    }

    if (!loaded) fetchData();
  });
  if (!loaded) return <div>Loading...</div>;

  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="verify"
        list={VerifyList}
        // list={ListGuesser}
        edit={VerifyEdit}
        show={VerifyShow}
      />
    </Admin>
  );
};

export default App;
