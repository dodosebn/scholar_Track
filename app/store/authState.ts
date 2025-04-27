import {create} from 'zustand';
import { AuthState } from '@/types';
  const useAuthStore = create<AuthState>((set) => ({
    email: '',
    password: '',
    handleEmailChange: (e) => set({ email: e.target.value }),
    handlePasswordChange: (e) => set({ password: e.target.value }),
  }));
export default useAuthStore;