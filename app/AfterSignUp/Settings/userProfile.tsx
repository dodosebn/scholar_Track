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
import { uploadToCloudinary } from "@/app/store/cloudinary";

type ProfileData = {
  name: string;
  bio: string;
  avatar_url: string | null;
  pronouns: string;
  website_url: string;
  social_links: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
};

const UserProfile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Function to fetch profile data
  const fetchProfileData = async (userId: string) => {
    const { data: profile, error: profileError } = await supabase
      .from('settings')
      .select('name, bio, avatar_url, pronouns, website_url, social_links')
      .eq('user_id', userId)
      .single();

    if (!profileError && profile) {
      setProfile(profile);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        
        if (user) {
          setUser(user);
          await fetchProfileData(user.id);
          
          // Set up realtime subscription for profile updates
          const channel = supabase
            .channel('profile_changes')
            .on(
              'postgres_changes',
              {
                event: '*',
                schema: 'public',
                table: 'settings',
                filter: `user_id=eq.${user.id}`
              },
              (payload) => {
                fetchProfileData(user.id); // Refresh profile data on changes
              }
            )
            .subscribe();

          return () => {
            supabase.removeChannel(channel);
          };
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchData();
  }, []);

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
      const imageUrl = await uploadToCloudinary(file);

      // Update both auth metadata and settings table
      const updates = {
        avatar_url: imageUrl,
        updated_at: new Date().toISOString()
      };

      const [{ error: authError }, { error: settingsError }] = await Promise.all([
        supabase.auth.updateUser({ data: { avatar_url: imageUrl } }),
        supabase.from('settings').upsert({ 
          user_id: user.id,
          avatar_url: imageUrl,
          updated_at: new Date().toISOString()
        })
      ]);

      if (authError || settingsError) throw authError || settingsError;

      toast.success('Profile picture updated!');
      setProfile(prev => prev ? { ...prev, avatar_url: imageUrl } : null);
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-40 h-40 rounded-full border-4 border-white shadow-lg dark:border-gray-700">
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full z-10">
                  <FiLoader className="animate-spin text-white text-2xl" />
                </div>
              )}

              <Image
                src={profile?.avatar_url || boy1Img}
                alt="profile image"
                fill
                className="rounded-full object-cover"
                priority
              />

              <button
                type="button"
                onClick={handleUploadClick}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors"
                disabled={isUploading}
              >
                <HiOutlinePencilSquare className="w-5 h-5" />
              </button>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={isUploading}
              />
            </div>

            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {profile?.name || user?.email?.split('@')[0] || 'User'}
              </h2>
              {profile?.pronouns && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {profile.pronouns}
                </p>
              )}
            </div>
          </div>

          <div className="flex-1">
            {profile?.bio && (
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {profile.bio}
              </p>
            )}

            {(profile?.website_url || profile?.social_links) && (
              <div className="space-y-2">
                <h3 className="font-medium text-gray-800 dark:text-white">Links</h3>
                <div className="flex flex-wrap gap-4">
                  {profile?.website_url && (
                    <a 
                      href={profile.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Website
                    </a>
                  )}
                  {profile?.social_links?.twitter && (
                    <a 
                      href={profile.social_links.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Twitter
                    </a>
                  )}
                  {profile?.social_links?.github && (
                    <a 
                      href={profile.social_links.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      GitHub
                    </a>
                  )}
                  {profile?.social_links?.linkedin && (
                    <a 
                      href={profile.social_links.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          {PublicProfMaps.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.path}
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                prefetch={false}
              >
                <Icon className="text-gray-600 dark:text-gray-300 text-lg" />
                <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default UserProfile;