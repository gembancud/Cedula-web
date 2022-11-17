import { url } from "@/utils/constants";

interface EvaluatorInterface {
  token: string;
}

export const GetEvaluator = async ({
  token,
}: EvaluatorInterface): Promise<any> => {
  try {
    const verifyresponse = await fetch(`${url}/evaluator`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token || "unauthenticated",
      },
    });
    return verifyresponse;
  } catch (error) {
    console.log(error);
    return error;
  }
};
