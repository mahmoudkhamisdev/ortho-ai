"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "@/components/buttons/primary-button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { verifyCode, resendCode, ErrorHandler } from "@/lib/data/utils";
import Cookie from "js-cookie";

export default function VerifyCodeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const schema = z.object({
    code: z.string().length(6, "الرمز يجب أن يتكون من 6 أرقام"),
  });

  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 min in seconds
  const [canResend, setCanResend] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { code: "", email },
    mode: "onChange",
  });

  async function onSubmit(values) {
    setLoading(true);
    await verifyCode(values)
      .then(() => {
        toast.success("Your code has been successfully verified.");
        Cookie.set("token", data.token);
        router.push("/reset-password");
      })
      .catch((error) => ErrorHandler(error, form))
      .finally(() => {
        setLoading(false);
      });
  }

  const handleResendCode = async () => {
    if (timeLeft > 0) return;
    setLoading(true);
    await resendCode({ email })
      .then(() => {
        toast.success("A new verification code has been sent to your email.");
        setTimeLeft(300);
      })
      .catch((error) => ErrorHandler(error, form))
      .finally(() => {
        setLoading(false);
      });
  };

  // countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // auto-submit when 6 digits entered
  useEffect(() => {
    const code = form.watch("code");
    if (code?.length === 6) {
      form.handleSubmit(onSubmit)();
    }
  }, [form.watch("code")]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-full text-center"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  className="flex items-center"
                >
                  {[...Array(6)].map((_, i) => (
                    <InputOTPGroup key={i}>
                      <InputOTPSlot
                        className="size-14 !rounded-xl !border"
                        index={i}
                      />
                    </InputOTPGroup>
                  ))}
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PrimaryButton
          title={
            loading ? (
              <>
                <Loader2 className="animate-spin" /> جاري التحقق...
              </>
            ) : (
              "تحقق"
            )
          }
          disabled={loading}
          className="w-full text-base"
        />

        {!canResend ? (
          <p className="text-sm text-gray-500">
            يمكنك إعادة إرسال الرمز بعد: {formatTime(timeLeft)}
          </p>
        ) : (
          <button
            type="button"
            className="text-sm text-main font-bold hover:underline flex items-center justify-center w-full"
            onClick={handleResendCode}
          >
            إعادة إرسال الرمز
          </button>
        )}
      </form>
    </Form>
  );
}
