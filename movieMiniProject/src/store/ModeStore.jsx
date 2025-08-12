import { create } from "zustand";

const initialIsDark = () => {
  let prevMode = localStorage.getItem(`isDark`);
  if (prevMode === `true`) return true;
  if (prevMode === `false`) return false;
};

export const useModeStore = create((set) => ({
  isDark: initialIsDark(),

  toggleMode: () => set((state) => ({ isDark: !state.isDark })),
}));
