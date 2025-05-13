"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FiLoader } from "react-icons/fi";
import boy1Img from '@/public/images/boy_1.avif';
import { toast } from 'react-toastify';
import { supabase } from "@/app/store/supabaseClient";

const ProfileSettings = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    formData.append("folder", "user_avatars");
    formData.append("transformation", "w_500,h_500,c_fill");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Image upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  };

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
        toast.error("Failed to load user data");
      }
    };
    fetchUser();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      const { error } = await supabase.auth.updateUser({
        data: { avatar_url: imageUrl }
      });

      if (error) throw error;

      toast.success('Profile picture updated successfully!');
      setImage(imageUrl);
    } catch (err: unknown) {
      let errorMessage = 'Failed to upload image';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      toast.error(errorMessage);
      setImage(user.user_metadata?.avatar_url || null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <FiLoader className="animate-spin text-blue-500 text-2xl mx-auto mb-2" />
            <p className="text-center">Uploading your image...</p>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Profile Settings</h1>

      <form className="space-y-8">
        <section className="flex flex-col sm:flex-row gap-8 items-start">
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
                onChange={handleFileChange}
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

          <div className="flex-1 space-y-6 w-full">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={user?.user_metadata?.name || ""}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-2 text-sm text-gray-500">
                Your name may appear around ScholarHub where you contribute or are mentioned.
              </p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={user?.email || ""}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="public-email" className="block text-sm font-medium text-gray-700 mb-2">
              Show Email
            </label>
            <select
              id="public-email"
              name="public-email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              defaultValue={user?.user_metadata?.public_email ? "yes" : "no"}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <p className="mt-2 text-sm text-gray-500">
              Choose whether to keep your email private
            </p>
          </div>

          <div>
            <label htmlFor="pronouns" className="block text-sm font-medium text-gray-700 mb-2">
              Pronouns
            </label>
            <select
              id="pronouns"
              name="pronouns"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              defaultValue={user?.user_metadata?.pronouns || "Don't specify"}
            >
              {["Don't specify", "they/them", "he/him", "she/her", "Custom"].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </section>

        <section>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            defaultValue={user?.user_metadata?.bio || ""}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Tell us about yourself..."
          />
          <p className="mt-2 text-sm text-gray-500">
            You can @mention other users and organizations to link to them
          </p>
        </section>

        <section className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Personal URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              defaultValue={user?.user_metadata?.url || ""}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">Social Accounts</h2>
            <div className="space-y-4">
              {["Twitter", "GitHub", "LinkedIn", "Website", "Portfolio"].map((platform) => (
                <div key={platform}>
                  <label htmlFor={`social-${platform.toLowerCase()}`} className="block text-sm font-medium text-gray-700 mb-1">
                    {platform}
                  </label>
                  <input
                    type="url"
                    id={`social-${platform.toLowerCase()}`}
                    name={`social-${platform.toLowerCase()}`}
                    defaultValue={user?.user_metadata?.[platform.toLowerCase()] || ""}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={`https://${platform.toLowerCase()}.com/your-profile`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default ProfileSettings;
