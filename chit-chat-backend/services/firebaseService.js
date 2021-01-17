import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: "chit-chat-9f623",
  keyFilename:
    "services/chit-chat-9f623-firebase-adminsdk-j68mj-f33b772824.json",
});

const bucket = storage.bucket("gs://chit-chat-9f623.appspot.com");

export const uploadToFireBase = async (file, fileBaseName) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No image file");
    }

    const extension = file.originalname.split(".").pop();
    const fileName = `${fileBaseName}.${extension}`;

    let fileUpload = bucket.file(`room-images/${fileName}`);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (error) => {
      console.log(error);
      reject("Something is wrong! Unable to upload at the moment.");
    });

    blobStream.on("finish", () => {
      // The public URL can be used to directly access the file via HTTP.
      //   const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
    //   const url = fileUpload.getSignedUrl({ action: "read", expires:  });
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
};
