// import { useRouter } from "next/router";
import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import * as React from "react";
import { useEffect, useState } from "react";
import { Admin, Resource } from "react-admin";

import { GetCustomDataProvider } from "@/utils/CustomDataProvider";

import { VerifyEdit, VerifyList } from "./verify";

const App = () => {
  const AuthUser = useAuthUser();
  const router = useRouter();

  const [dataProvider, setDataProvider] = useState<any>();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const tmpAuthToken = await AuthUser.getIdToken();
        if (tmpAuthToken) {
          const verifyresponse = await fetch(
            "http://localhost:4000/evaluator",
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization: tmpAuthToken || "unauthenticated",
              },
            }
          );
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
      <Resource name="verify" list={VerifyList} edit={VerifyEdit} />
    </Admin>
  );
};

export default App;
