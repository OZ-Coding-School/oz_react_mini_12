import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set, get) => ({
      themes: {
        light: {
          background: "#ffffff",
          text: "#000000",
          inputBackground: "#fcfcfc",
          border: "#000000",
          buttonBackground: "#6200ea",
          buttonText: "#ffffff",
          cardBG: "#e7e7e7c0",
          cardBGHover: "#c9c9c9b9",
          overray: "#00000094",
        },
        dark: {
          background: "#000000",
          text: "#ffffff",
          inputBackground: "gray",
          border: "#ffffff",
          buttonBackground: "#6c01fd",
          buttonText: "#fad4fd",
          cardBG: "#353535",
          cardBGHover: "#4b4b4b",
          overray: "#ffffff28",
        },
      },
      // ${({ theme }) => theme.~~~}
      // ==> ${Theme("")};

      isDark: true,

      toggleTheme: () => {
        set((state) => ({
          isDark: !state.isDark,
        }));
        // console.log(get().isDark);
      },

      //   getTheme: () => (get().isDark ? get().themes.dark : get().themes.light),
      getTheme: () => {
        const theme = get().isDark ? get().themes.dark : get().themes.light;
        return { ...theme };
      },
    }),
    { name: "theme-storage" }
  )
);
