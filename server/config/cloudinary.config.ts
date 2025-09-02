import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

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
      return {
        folder: 'category_imgs',
        resource_type: 'auto',
        public_id: file.originalname.split('.')[0],
        invalidate: true, // 🚀 force CDN refresh
      };
    },
  }),
};
