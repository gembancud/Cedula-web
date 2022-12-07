import type { MeOrgType } from "@/types";
import { upload } from "@/utils/cloudinary";
import { url } from "@/utils/constants";

interface RegisterInterface {
  authToken: string;
  name: string;
  email: string;
  contact_number: string;
  org: string;
  fblink: string;
  twitterlink: string;
  redditlink: string;
  captchaToken: string;
}

const Register = async ({
  authToken,
  name,
  email,
  contact_number,
  org,
  fblink,
  twitterlink,
  redditlink,
  captchaToken,
}: RegisterInterface) => {
  const registerResponse = await fetch(`${url}/register`, {
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
      org,
      links: [
        { link: fblink, site: "fb" },
        { link: twitterlink, site: "twitter" },
        { link: redditlink, site: "reddit" },
      ],
      captchaToken,
    }),
  });
  return registerResponse;
};

interface UploadInterface {
  files: string[];
  org: string;
  cloudinary: any;
  authToken: string;
  email: string;
}

const Upload = async ({
  files,
  org,
  cloudinary,
  authToken,
  email,
}: UploadInterface) => {
  const cloudinaryresponse = await upload(files, org, cloudinary);

  const uploadresponse = await fetch(`${url}/register/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: authToken || "unauthenticated",
    },
    body: JSON.stringify({
      email,
      org,
      documents: Array.from(
        cloudinaryresponse.map((res: any) => res.secure_url)
      ),
    }),
  });
  return uploadresponse;
};

interface SignupInterface {
  authToken: string;
  name: string;
  email: string;
  contact_number: string;
  org: string;
  fblink: string;
  twitterlink: string;
  redditlink: string;
  captchaToken: string;
  files: string[];
}
export const Signup = async ({
  authToken,
  name,
  email,
  contact_number,
  org,
  fblink,
  twitterlink,
  redditlink,
  captchaToken,
  files,
}: SignupInterface) => {
  const registerResponse = await Register({
    authToken,
    name,
    email,
    contact_number,
    org,
    fblink,
    twitterlink,
    redditlink,
    captchaToken,
  });
  const data = await registerResponse.json();
  const { cloudinary } = data;
  if (registerResponse.status === 200 && files.length > 0) {
    const uploadResponse = await Upload({
      files,
      org,
      cloudinary,
      authToken,
      email,
    });

    return uploadResponse.json();
  }
  return data;
};

interface ChangeBadgeInterface {
  token: string;
  org: MeOrgType;
  badge: string;
}

export const ChangeBadge = async ({
  token,
  org,
  badge,
}: ChangeBadgeInterface) => {
  try {
    const changeBadgeResponse = await fetch(`${url}/register/${org.name}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token || "unauthenticated",
      },
      body: JSON.stringify({
        badges: org.badges,
        active_badge: badge,
      }),
    });
    return changeBadgeResponse;
  } catch (error) {
    console.log(error);
    return error;
  }
};
