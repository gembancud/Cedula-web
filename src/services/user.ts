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

interface PoseUserMeInterface {
  authToken: string;
  name: string;
  email: string;
  contact_number: string;
  fblink: string;
  twitterlink: string;
  redditlink: string;
  captchaToken: string;
}

export const PostUserMe = async ({
  authToken,
  name,
  email,
  contact_number,
  fblink,
  twitterlink,
  redditlink,
  captchaToken,
}: PoseUserMeInterface) => {
  try {
    const postUserMeResponse = await fetch(`${url}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: authToken || "unauthenticated",
      },
      body: JSON.stringify({
        name,
        email,
        contact_number,
        links: [
          { link: fblink, site: "fb" },
          { link: twitterlink, site: "twitter" },
          { link: redditlink, site: "reddit" },
        ],
        captchaToken,
      }),
    });
    return postUserMeResponse;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const PatchUserMe = async ({
  authToken,
  name,
  email,
  contact_number,
  fblink,
  twitterlink,
  redditlink,
  captchaToken,
}: PoseUserMeInterface) => {
  try {
    const patchUserMeResponse = await fetch(`${url}/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: authToken || "unauthenticated",
      },
      body: JSON.stringify({
        name,
        email,
        contact_number,
        links: [
          { link: fblink, site: "fb" },
          { link: twitterlink, site: "twitter" },
          { link: redditlink, site: "reddit" },
        ],
        captchaToken,
      }),
    });
    return patchUserMeResponse;
  } catch (error) {
    console.log(error);
    return error;
  }
};
