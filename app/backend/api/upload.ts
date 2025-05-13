import { v2 as cloudinary } from 'cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_APIKEY!,
  api_secret: process.env.CLOUDINARY_APISECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { image } = req.body; 

    const result = await cloudinary.uploader.upload(image, {
      folder: 'user_profile_images',
    });

    return res.status(200).json({ url: result.secure_url });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
