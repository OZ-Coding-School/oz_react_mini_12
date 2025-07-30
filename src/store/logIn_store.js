import { create } from "zustand";

export const useLoginStore = create((set, get) => ({
    isLogIn: false,
    user:null,

    login: (userData) => {
        set(() => ({
            user: userData,
            isLogIn:true,
        }))
    },

    logout: () => set(() => ({
        user: null,
        isLogIn:false,
    }))
    // api 요청 로직 가져오기

}))