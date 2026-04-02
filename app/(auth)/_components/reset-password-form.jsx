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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "@/components/buttons/primary-button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ErrorHandler, resetPassword } from "@/lib/data/utils";

export default function ResetPasswordForm() {
  const router = useRouter();
  const schema = z
    .object({
      password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
      password_confirmation: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "كلمتا المرور غير متطابقتين",
      path: ["password_confirmation"],
    });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { password: "", password_confirmation: "" },
    mode: "onChange",
  });

  async function onSubmit(values) {
    setLoading(true);
    await resetPassword(values)
      .then(() => {
        toast.success("Your password has been reset successfully. Welcome 👏");
        router.replace("/");
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">كلمة المرور الجديدة</FormLabel>
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
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 end-2 flex items-center px-2"
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
              <FormLabel className="font-bold">تأكيد كلمة المرور</FormLabel>
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
                <Loader2 className="animate-spin" /> جاري التحديث...
              </>
            ) : (
              "إعادة التعيين"
            )
          }
          disabled={loading}
          className="w-full text-base"
        />
      </form>
    </Form>
  );
}
