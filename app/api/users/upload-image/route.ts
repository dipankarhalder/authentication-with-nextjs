import {NextApiRequest, NextApiResponse} from 'next';
import {dbConnect} from '@/config/dbConfig';
import Users from '@/models/Users';
import upload from '@/lib/multer';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disabling body parsing because Multer handles it
  },
};

const uploadImage = upload.single('image'); // 'image' is the key name for the file input field

const uploadUserImage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Connect to the database
    await dbConnect();

    // Use Multer to handle the file upload
    uploadImage(req, res, async (err) => {
      if (err) {
        return res.status(400).json({success: false, message: err.message});
      }

      // Check if the file is uploaded
      if (!req.file) {
        return res.status(400).json({success: false, message: 'No file uploaded.'});
      }

      // Get the userId from the query or body (depending on your API logic)
      const {userId} = req.query; // Assuming userId is passed as query param

      if (!userId) {
        return res.status(400).json({success: false, message: 'User ID is required.'});
      }

      // Find the user and update the profile image URL
      const user = await Users.findOne({user_id: userId});
      if (!user) {
        return res.status(404).json({success: false, message: 'User not found.'});
      }

      // Get the image path
      const imagePath = `/uploads/${req.file.filename}`; // The file is saved in public/uploads

      // Update the user's image field
      user.profile_image = imagePath; // Assuming the user model has a field profile_image
      await user.save();

      return res.status(200).json({
        success: true,
        message: 'Profile image uploaded successfully.',
        imageUrl: imagePath,
      });
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};

export default uploadUserImage;