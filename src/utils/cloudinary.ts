export const upload = async (files: string[], org: string, cloudinary: any) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { url, api_key, timestamp, signature } = cloudinary;

  console.log("posting to ", url);
  console.log("files", files);
  const promises: any[] = [];
  files.forEach((file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", api_key);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("upload_preset", "cedula");
    formData.append("folder", org);

    try {
      const res = fetch(url, {
        method: "POST",
        body: formData,
      }).then((fetchres) => fetchres.json());

      promises.push(res);
    } catch (err) {
      console.log(err);
    }
  });

  const res = await Promise.all(promises);
  return res;
};
