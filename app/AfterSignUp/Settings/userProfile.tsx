'use client';
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import boy1Img from '@/public/images/boy_1.avif';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { FiLoader } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { PublicProfMaps } from './AllSetMaps';
import { supabase } from "@/app/store/supabaseClient";

const UserProfile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (user) {
          setUser(user);
          if (user.user_metadata?.avatar_url) {
            setImage(user.user_metadata.avatar_url);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    formData.append("folder", "user_avatars");
    formData.append("transformation", "w_500,h_500,c_fill");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Image upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a JPEG, PNG, or WebP image');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      setImage(URL.createObjectURL(file));

      const imageUrl = await uploadToCloudinary(file);
      const { error } = await supabase.auth.updateUser({ data: { avatar_url: imageUrl } });

      if (error) throw error;

      toast.success('Profile picture updated!');
      setImage(imageUrl);
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload image');
      setImage(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-[200px] h-[200px]">
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-full z-10">
                  <FiLoader className="animate-spin text-white text-xl" />
                </div>
              )}

              <label
                htmlFor="upload"
                className="absolute bottom-2 right-2 bg-white text-gray-700 p-2 rounded-full cursor-pointer z-10 shadow-md hover:bg-gray-100 transition-colors"
              >
                <HiOutlinePencilSquare className="w-4 h-4" />
              </label>

              <input
                type="file"
                id="upload"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={isUploading}
              />

              <Image
                src={image || boy1Img}
                alt="profile image"
                fill
                className="rounded-full object-cover border-2 border-gray-200"
                priority
              />
            </div>

            <button 
              type="button"
              onClick={handleUploadClick}
              disabled={isUploading}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <FiLoader className="animate-spin w-4 h-4" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <HiOutlinePencilSquare className="w-4 h-4" />
                  <span>{image ? 'Change photo' : 'Upload photo'}</span>
                </>
              )}
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">
              {user?.user_metadata?.name || "Your Name"}
            </h2>
            <p className="text-gray-500">Your personal account</p>
            <p className="text-sm text-gray-500 mt-2">
              {user?.user_metadata?.bio || "Your short bio goes here..."}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          {PublicProfMaps.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.path}
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                prefetch={false}
              >
                <Icon className="text-gray-600 text-lg" />
                <span className="text-gray-700">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
