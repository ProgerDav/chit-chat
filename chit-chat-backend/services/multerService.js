import Multer from "multer";

const MAX_FILE_SIZE = 1024 * 1024 // 1 mb

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE, 
  },
});

export { multer };
