import { url } from "@/utils/constants";

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
