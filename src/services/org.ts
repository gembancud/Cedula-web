import { url } from "@/utils/constants";

interface OrgMeInterface {
  token: string;
}

export const GetOrgsMe = async ({ token }: OrgMeInterface): Promise<any> => {
  try {
    const verifyresponse = await fetch(`${url}/org/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token || "unauthenticated",
      },
    });
    return await verifyresponse.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GetOrgs = async (): Promise<any> => {
  try {
    const verifyresponse = await fetch(`${url}/org/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    return await verifyresponse.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};
