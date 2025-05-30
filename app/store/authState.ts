import { create } from 'zustand';
import { AuthState } from '@/types';
import { setAuthProps } from '@/types';
// import { supabase } from './supabaseClient';

// Auth Store
export const useAuthStore = create<AuthState>((set) => ({
  email: '',
  password: '',
  handleEmailChange: (e) => set({ email: e.target.value }),
  handlePasswordChange: (e) => set({ password: e.target.value }),
}));

export const userSetAuth = create<setAuthProps>((set) => ({
name: '',
email: '',
bio: ''
}));