import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {

  console.log("Original Name:", file.originalname);
  console.log("Mime Type:", file.mimetype);

  const ext = path.extname(file.originalname).toLowerCase();

  const allowedMimeTypes = [
    "application/pdf",
    "application/octet-stream",
  ];

  if (allowedMimeTypes.includes(file.mimetype) && ext === ".pdf") {
    return cb(null, true);
  }

  return cb(new Error("Only PDF files are allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,  //5MB
  },
});

export default upload;