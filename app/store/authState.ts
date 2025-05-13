import { create } from 'zustand';
import { AuthState, ImageStore } from '@/types';
import { supabase } from './supabaseClient';

// Auth Store
export const useAuthStore = create<AuthState>((set) => ({
  email: '',
  password: '',
  handleEmailChange: (e) => set({ email: e.target.value }),
  handlePasswordChange: (e) => set({ password: e.target.value }),
}));

export const useImageStore = create<ImageStore>((set) => ({
  image: '',
  setImage: (url) => set({ image: url }),

  uploadImage: async (file, userId) => {
    try {
      // 1. Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `user-uploads/${fileName}`;

      // 2. Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('useravaters') // Replace with your bucket name
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type,
        });

      if (error) throw error;

      // 3. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('useravaters')
        .getPublicUrl(filePath);

      // 4. Update local state
      set({ image: publicUrl });
      
      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  },
}));