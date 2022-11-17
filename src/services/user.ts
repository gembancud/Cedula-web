import { url } from "@/utils/constants";

interface UserMeInterface {
  token: string;
}

export const GetUserMe = async ({ token }: UserMeInterface): Promise<any> => {
  try {
    const verifyresponse = await fetch(`${url}/user/me`, {
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
