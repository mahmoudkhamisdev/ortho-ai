"use client";

import { create } from "zustand";
import Cookies from "js-cookie"
import { redirect } from "next/navigation";

export const useAuthStore = create((set, get) => ({
  user: null,

  logout: () => {
    set({ user: null })
    Cookies.remove("token")
    redirect("/login")
  }
}))
