import type { MeOrgType } from "@/types";
import { upload } from "@/utils/cloudinary";
import { url } from "@/utils/constants";

interface RegisterInterface {
  authToken: string;
  email: string;
  org: string;
  captchaToken: string;
}

const Register = async ({
  authToken,
  email,
  org,
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
      email,
      org,
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
  email: string;
  org: string;
  captchaToken: string;
  files: string[];
}
export const Signup = async ({
  authToken,
  email,
  org,
  captchaToken,
  files,
}: SignupInterface) => {
  const registerResponse = await Register({
    authToken,
    email,
    org,
    captchaToken,
  });
  const data = await registerResponse.json();
  const { cloudinary } = data;
  if (registerResponse.status === 201 && files.length > 0) {
    const uploadResponse = await Upload({
      files,
      org,
      cloudinary,
      authToken,
      email,
    });

    return uploadResponse;
  }
  return registerResponse;
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
