"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { HiOutlinePencilSquare, HiOutlineScale } from "react-icons/hi2";
import { FiLoader, FiCheckCircle } from "react-icons/fi";
import boy1Img from "@/public/images/boy_1.avif";
import { toast } from "react-toastify";
import { supabase } from "@/app/store/supabaseClient";
import { uploadToCloudinary } from "@/app/store/cloudinary";

// Improved type definitions
interface SocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

interface UserProfile {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
  };
}

interface ProfileDataProps {
  user_id: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  public_email: boolean;
  pronouns?: string;
  website_url?: string;
  social_links?: SocialLinks;
  created_at: string;
  updated_at: string;
}

interface FormData {
  name: string;
  bio: string;
  public_email: boolean;
  pronouns: string;
  website_url: string;
  twitter: string;
  github: string;
  linkedin: string;
  portfolio: string;
}

const ProfileSettings = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [profile, setProfile] = useState<ProfileDataProps | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    bio: "",
    public_email: false,
    pronouns: "",
    website_url: "",
    twitter: "",
    github: "",
    linkedin: "",
    portfolio: "",
  });

  // Validate URL format
  const validateUrl = (url: string): boolean => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Fetch user and profile data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) throw error;

        if (user) {
          setUser({
            id: user.id,
            email: user.email,
            user_metadata: user.user_metadata,
          });

          // Fetch profile from settings table
          const { data: profile, error: profileError } = await supabase
            .from("settings")
            .select("*")
            .eq("user_id", user.id)
            .single();

          if (!profileError && profile) {
            setProfile(profile);
            setFormData({
              name: profile.name || user.user_metadata?.name || "",
              bio: profile.bio || "",
              public_email: profile.public_email || false,
              pronouns: profile.pronouns || "",
              website_url: profile.website_url || "",
              twitter: profile.social_links?.twitter || "",
              github: profile.social_links?.github || "",
              linkedin: profile.social_links?.linkedin || "",
              portfolio: profile.social_links?.portfolio || "",
            });
          } else if (profileError && profileError.code === "PGRST116") {
            // No profile exists yet, create one
            const { data: newProfile, error: createError } = await supabase
              .from("settings")
              .insert({
                user_id: user.id,
                name: user.user_metadata?.name || "",
                updated_at: new Date().toISOString(),
              })
              .select()
              .single();

            if (!createError && newProfile) {
              setProfile(newProfile);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a JPEG, PNG, or WebP image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);

      const updates = {
        avatar_url: imageUrl,
        updated_at: new Date().toISOString(),
      };

      const [{ error: authError }, { error: settingsError }] =
        await Promise.all([
          supabase.auth.updateUser({ data: { avatar_url: imageUrl } }),
          supabase
            .from("settings")
            .upsert({
              user_id: user.id,
              ...updates,
            })
            .eq("user_id", user.id),
        ]);

      if (authError || settingsError) throw authError || settingsError;

      toast.success("Profile picture updated successfully!");
      setProfile((prev) => (prev ? { ...prev, avatar_url: imageUrl } : null));

      // Update user metadata in state
      setUser((prev) =>
        prev
          ? {
              ...prev,
              user_metadata: {
                ...prev.user_metadata,
                avatar_url: imageUrl,
              },
            }
          : null
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save profile data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    // Validate URLs
    const urlFields = [
      "website_url",
      "twitter",
      "github",
      "linkedin",
      "portfolio",
    ];
    for (const field of urlFields) {
      if (
        formData[field as keyof FormData] &&
        !validateUrl(formData[field as keyof FormData] as string)
      ) {
        toast.error(`Please enter a valid URL for ${field.replace("_", " ")}`);
        return;
      }
    }

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const updates = {
        user_id: user.id,
        name: formData.name,
        bio: formData.bio,
        public_email: formData.public_email,
        pronouns: formData.pronouns,
        website_url: formData.website_url,
        social_links: {
          twitter: formData.twitter,
          github: formData.github,
          linkedin: formData.linkedin,
          portfolio: formData.portfolio,
        },
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("settings")
        .upsert(updates)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;

      // Update auth metadata if name changed
      if (formData.name !== profile?.name) {
        await supabase.auth.updateUser({
          data: { name: formData.name },
        });
      }

      setProfile(data);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      console.error("Error saving profile:", err);
      toast.error(err.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="flex gap-8">
            <div className="w-40 h-40 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="flex-1 space-y-4">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8">
        Profile Settings
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Picture Section */}
        <section className="flex flex-col sm:flex-row gap-8 items-start">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-40 h-40 rounded-full border-4 border-white shadow-lg dark:border-gray-700">
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full z-10">
                  <FiLoader className="animate-spin text-white text-2xl" />
                </div>
              )}

              <Image
                src={
                  profile?.avatar_url ||
                  user?.user_metadata?.avatar_url ||
                  boy1Img
                }
                alt="Profile image"
                fill
                className="rounded-full object-cover"
                priority
                sizes="(max-width: 640px) 100vw, 160px"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors"
                disabled={isUploading}
                aria-label="Change profile picture"
              >
                <HiOutlinePencilSquare className="w-5 h-5" />
              </button>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </div>

            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                {formData.name || user?.email?.split("@")[0] || "User"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Main Form Section */}
          <div className="flex-1 space-y-6 w-full">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                maxLength={50}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your full name"
              />
            </div>

            {/* Bio Field */}
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Bio{" "}
                <span className="text-gray-500 text-xs">
                  ({formData.bio.length}/200)
                </span>
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleInputChange}
                maxLength={200}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Tell us about yourself..."
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                You can @mention other users and organizations
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Settings Section */}
        <section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Privacy Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Visibility */}
            <div>
              <label
                htmlFor="public_email"
                className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                <input
                  type="checkbox"
                  id="public_email"
                  name="public_email"
                  checked={formData.public_email}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600"
                />
                Make my email public
              </label>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Allow other users to see my email address
              </p>
            </div>

            {/* Pronouns */}
            <div>
              <label
                htmlFor="pronouns"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Pronouns
              </label>
              <select
                id="pronouns"
                name="pronouns"
                value={formData.pronouns}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select your pronouns</option>
                <option value="they/them">they/them</option>
                <option value="he/him">he/him</option>
                <option value="she/her">she/her</option>
                <option value="other">Other/prefer not to say</option>
              </select>
            </div>
          </div>
        </section>

        {/* Links Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Your Links
          </h2>

          {/* Website */}
          <div>
            <label
              htmlFor="website_url"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Personal Website
            </label>
            <input
              type="url"
              id="website_url"
              name="website_url"
              value={formData.website_url}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="https://yourwebsite.com"
            />
            {formData.website_url && !validateUrl(formData.website_url) && (
              <p className="mt-1 text-sm text-red-500">
                Please enter a valid URL
              </p>
            )}
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="twitter"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Twitter
              </label>
              <input
                type="url"
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="https://twitter.com/username"
              />
              {formData.twitter && !validateUrl(formData.twitter) && (
                <p className="mt-1 text-sm text-red-500">
                  Please enter a valid URL
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="github"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                GitHub
              </label>
              <input
                type="url"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="https://github.com/username"
              />
              {formData.github && !validateUrl(formData.github) && (
                <p className="mt-1 text-sm text-red-500">
                  Please enter a valid URL
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                LinkedIn
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="https://linkedin.com/in/username"
              />
              {formData.linkedin && !validateUrl(formData.linkedin) && (
                <p className="mt-1 text-sm text-red-500">
                  Please enter a valid URL
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="portfolio"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Portfolio
              </label>
              <input
                type="url"
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="https://yourportfolio.com"
              />
              {formData.portfolio && !validateUrl(formData.portfolio) && (
                <p className="mt-1 text-sm text-red-500">
                  Please enter a valid URL
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-colors ${
              isSaving
                ? "bg-blue-400"
                : saveSuccess
                ? "bg-green-500"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            aria-label={
              isSaving
                ? "Saving changes"
                : saveSuccess
                ? "Changes saved"
                : "Save changes"
            }
          >
            {isSaving ? (
              <>
                <FiLoader className="animate-spin" />
                Saving...
              </>
            ) : saveSuccess ? (
              <>
                <FiCheckCircle />
                Saved!
              </>
            ) : (
              <>
                <HiOutlineScale />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
