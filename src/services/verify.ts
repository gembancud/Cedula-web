import { url } from "@/utils/constants";

interface VerifyUserInterface {
  token: string;
  email: string;
  org: string;
  evaluation: string;
  comment: string;
}

export const VerifyUser = async ({
  token,
  email,
  org,
  evaluation,
  comment,
}: VerifyUserInterface): Promise<any> => {
  try {
    const verifyResponse = await fetch(`${url}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "unauthenticated",
      },
      body: JSON.stringify({
        email,
        org,
        evaluation,
        comment,
      }),
    });

    return await verifyResponse.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};
