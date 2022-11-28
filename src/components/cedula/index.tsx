import { useAuthUser } from "next-firebase-auth";
import { useEffect, useState } from "react";

import { GetUserMe } from "@/services";

export const Tag = () => {
  const AuthUser = useAuthUser();
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await AuthUser.getIdToken();
        if (!token) throw new Error("Token invalid");
        const response = await GetUserMe({ token: token! });
        setUser(response);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    }

    if (!loaded) fetchData();
  });

  return <div data-link={JSON.stringify(user)}></div>;
};
