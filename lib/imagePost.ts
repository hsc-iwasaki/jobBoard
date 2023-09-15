export const uploadPhoto = async (
  e: React.ChangeEvent<HTMLInputElement>
): Promise<string | null> => {
  const file = e[0]; // ここを修正
  const filename = encodeURIComponent(file.name);
  const fileType = encodeURIComponent(file.type);

  const res = await fetch(
    `/api/upload-url?file=${filename}&fileType=${fileType}`
  );

  const { url, fields } = await res.json();
  const formData = new FormData();

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value as Blob | string);
  });

  const upload = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (upload.ok) {
    const imageUrl = `https://${fields.bucket}.s3.amazonaws.com/${fields.key}`;
    return imageUrl;
  } else {
    console.error("Upload failed.");
    return null;
  }
};
