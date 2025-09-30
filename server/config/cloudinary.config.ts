import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,   // from your Cloudinary account
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Export only options for interceptors
export const MulterUploadOptions = {
  storage: new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      const folder_name = req.body.folder;

      return {
        folder: folder_name,
        resource_type: 'auto',
        public_id: `${file.originalname.split('.')[0]}_${Date.now()}`,
        invalidate: true, // 🚀 force CDN refresh
      };
    },
  }),
};
