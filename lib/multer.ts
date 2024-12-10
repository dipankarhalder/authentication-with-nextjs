import multer from 'multer';
import path from 'path';

// Configure the storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for storing the uploaded images
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    // Use the original name with a timestamp to avoid name collisions
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Validate file type (only images allowed)
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Only image files (jpeg, png, gif) are allowed'), false);
  }
  cb(null, true);
};

// Multer instance for handling image uploads
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

export default upload;