import { toast } from "sonner";
import axios from "axios";

export const MAX_ROWS_PER_PAGE = 500;
export const UrlImage = ""; 

// Stub axios API instance for components using it directly (e.g. DeleteButton)
export const api = {
  delete: async () => ({ data: { success: true } }),
  get: async () => ({ data: { data: [] } }),
  post: async () => ({ data: { success: true } })
};

// Stub error handler for demo mode
export const ErrorMessage = (error) =>
  error?.message || "Something went wrong. Please try again.";

export const ErrorHandler = (error, form) => {
  toast.error(ErrorMessage(error));
  console.log(error);
};

// Stub user mutation functions for demo mode
export const addUser = async ({ values }) => {
  return { success: true, message: "Demo: User added (static mode)" };
};

export const editUser = async ({ id, values }) => {
  return { success: true, message: "Demo: User updated (static mode)" };
};

// Stub auth actions for demo mode
export const verifyCode = async ({ email, reset_code }) => {
  return { success: true };
};

export const resendCode = async ({ email }) => {
  return { success: true };
};

export const resetPassword = async ({ password, password_confirmation }) => {
  return { success: true };
};

export const forgotPassword = async ({ email }) => {
  return { success: true };
};

export const registerUser = async ({ name, email, phone, password }) => {
  return { success: true, access_token: "demo-token" };
};
