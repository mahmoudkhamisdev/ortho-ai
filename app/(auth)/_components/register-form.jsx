"use client";

import PrimaryButton from "@/components/buttons/primary-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ErrorHandler, registerUser } from "@/lib/data/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookie from "js-cookie";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PhoneInput } from "../_components/PhoneInput";

export default function RegisterForm() {
  const router = useRouter();

  const schema = z
    .object({
      name: z.string().min(1, "Full name is required"),
      email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
      phone: z
        .string()
        .min(10, "Invalid phone number")
        .max(15, "Phone number is too long"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(72, "Password is too long"),
      password_confirmation: z
        .string()
        .min(1, "Password confirmation is required"),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Passwords do not match",
      path: ["password_confirmation"],
    });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values) {
    setLoading(true);
    await registerUser(values)
      .then((data) => {
        Cookie.set("token", data.token);
        toast.success("Your account has been created. Welcome 🎉");
        router.replace("/dashboard");
      })
      .catch((error) => ErrorHandler(error, form))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Full Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="py-6"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="py-6"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Phone Number</FormLabel>
              <FormControl>
                <PhoneInput {...field} id="phone" placeholder="05XXXXXXXX" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="pe-10 py-6"
                    {...field}
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 end-2 flex items-center rounded-lg px-2 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="py-6"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PrimaryButton
          title={
            loading ? (
              <>
                <Loader2 className="animate-spin" /> Registering...
              </>
            ) : (
              "Register"
            )
          }
          disabled={loading}
          className="w-full text-base"
        />

        <div className="flex items-center gap-0.5 text-muted-foreground">
          <div className="flex-1 border-b-2" />
          or continue with
          <div className="flex-1 border-b-2" />
        </div>

        <PrimaryButton
          type="button"
          variant="outline"
          title={<>{GoogleSVG} Continue with Google</>}
          disabled={loading}
          className="w-full text-base text-primary bg-transparent hover:bg-transparent hover:!shadow-md"
        />

        <div className="flex items-center justify-center gap-1">
          <p className="text-base font-bold">Already have an account?</p>
          <Link
            href="/login"
            className="text-sm text-main font-bold hover:underline"
          >
            Log In
          </Link>
        </div>
      </form>
    </Form>
  );
}

const GoogleSVG = (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="LgbsSe-Bz112c"
  >
    <g>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      ></path>
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      ></path>
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      ></path>
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      ></path>
      <path fill="none" d="M0 0h48v48H0z"></path>
    </g>
  </svg>
);
