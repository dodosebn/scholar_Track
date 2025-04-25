import {create} from 'zustand';
interface AuthState {
    email: string;
    password: string;
    handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const useAuthStore = create<AuthState>((set) => ({
    email: '',
    password: '',
    handleEmailChange: (e) => set({ email: e.target.value }),
    handlePasswordChange: (e) => set({ password: e.target.value }),
  }));
export default useAuthStore;