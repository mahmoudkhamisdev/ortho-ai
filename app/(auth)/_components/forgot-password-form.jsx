"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "@/components/buttons/primary-button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forgotPassword, ErrorMessage } from "@/lib/data/utils";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const schema = z.object({
    email: z
      .string()
      .min(1, "البريد الإلكتروني مطلوب")
      .email("الرجاء إدخال بريد إلكتروني صحيح"),
  });

  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  async function onSubmit(values) {
    setLoading(true);
    await forgotPassword(values)
      .then(() => {
        toast.success("Check your email for the verification code.");
        router.push(`/verify-code?email=${values.email}`);
      })
      .catch((error) => {
        toast.error(ErrorMessage(error));
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">البريد الإلكتروني</FormLabel>
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

        <PrimaryButton
          title={
            loading ? (
              <>
                <Loader2 className="animate-spin" /> جاري الإرسال...
              </>
            ) : (
              "إرسال رمز التحقق"
            )
          }
          disabled={loading}
          className="w-full text-base"
        />

        <Link
          href="/login"
          className="text-sm text-main font-bold hover:underline flex items-center justify-center"
        >
          العودة لتسجيل الدخول
        </Link>
      </form>
    </Form>
  );
}
