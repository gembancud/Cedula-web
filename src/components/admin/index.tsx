// import { useRouter } from "next/router";
import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import simpleRestProvider from "ra-data-simple-rest";
import * as React from "react";
import { useEffect, useState } from "react";
import { Admin, fetchUtils, ListGuesser, Resource } from "react-admin";

const initdataProvider = simpleRestProvider("http://localhost:4000");
const newDataProvider = (authToken: string) => {
  const httpClient = (url: any, options: any) => {
    if (!options.headers) {
      // eslint-disable-next-line no-param-reassign
      options.headers = new Headers({
        Accept: "application/json",
      });
    }
    options.headers.set("Authorization", authToken);
    return fetchUtils.fetchJson(url, options);
  };
  return simpleRestProvider(
    "http://localhost:4000",
    httpClient,
    "X-Total-Count"
  );
};

const App = () => {
  const AuthUser = useAuthUser();
  const router = useRouter();

  const [dataProvider, setDataProvider] = useState(initdataProvider);
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
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: tmpAuthToken || "unauthenticated",
              },
            }
          );
          if (verifyresponse.status === 200) {
            setDataProvider(newDataProvider(tmpAuthToken));
          } else throw new Error("Not authorized");
        }
      } catch (error) {
        console.log(error);
        router.replace("/");
      }
    }

    fetchData();
  }, []);

  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="verify" list={ListGuesser} />
    </Admin>
  );
};

export default App;
