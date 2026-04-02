"use client";

import ButtonTooltip from "@/components/buttons/button-tooltip";
import PrimaryButton from "@/components/buttons/primary-button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { ErrorHandler, addUser, editUser } from "@/lib/data/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PhoneInput } from "../../(auth)/_components/PhoneInput";
import { useLanguageStore } from "@/stores/useLanguageStore";
import UploadAvatar from "@/components/upload/upload-avatar";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import UploadImage from "@/components/upload/upload-image";
import { Button } from "@/components/ui/button";

export default function Settings({}) {
  const schema = z.object({
    image: z
      .any()
      .optional()
      .refine((file) => !file || file instanceof File, "يجب تحميل صورة صحيحة"),
    name: z.string().min(1, "الاسم مطلوب"),
    email: z
      .string()
      .min(1, "البريد الإلكتروني مطلوب")
      .email("الرجاء إدخال بريد إلكتروني صحيح"),
    password: z.string().optional(),
    phone: z
      .string()
      .min(8, "رقم الهاتف غير صحيح")
      .max(15, "رقم الهاتف طويل جدًا"),
    role: z.string().min(1, "يرجى اختيار الدور"),
    lang: z.string().min(1, "يرجى اختيار اللغة"),
    is_parent: z.string().optional(),
    stop: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      image: null,
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "",
      lang: "",
      is_parent: false,
      stop: false,
    },
    mode: "onChange",
  });
  async function onSubmit(values) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="overflow-aut">
        <div className="space-y-5 flex flex-col items-start">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground">
              Manage your account information and security settings
            </p>
          </div>

          {/* Image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <UploadAvatar
                    value={field.value}
                    onChange={field.onChange}
                    className={"scale-200 mx-8 my-10"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Card className="w-full p-4 gap-1">
            <CardTitle className="text-lg font-bold">
              Personal Information
            </CardTitle>
            <CardDescription>
              Update your personal details and contact information
            </CardDescription>
            <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter patient adress" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        {...field}
                        id="phone"
                        placeholder="05XXXXXXXX"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full py-6">
                          <SelectValue placeholder="Enter Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-end">
              <Button type="submit" className="w-fit mt-5">
                Change Password
              </Button>
            </div>
          </Card>

          <Card className="w-full p-4 gap-1">
            <CardTitle className="text-lg font-bold">Email Address</CardTitle>
            <CardDescription>
              Change your email address and verify it for security
            </CardDescription>
            <div className="pt-5 space-y-4">
              <div>
                <FormLabel className="font-semibold block mb-2">
                  Current Email
                </FormLabel>
                <Input
                  value={form.getValues("email") || "admin@gmail.com"}
                  placeholder="Enter your new email address"
                  type="email"
                />
              </div>

              {/* New Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      New Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your new email address"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="bg-secondary/50 rounded p-3 text-sm text-muted-foreground">
                A verification link will be sent to your new email address
              </div>

              <div className="text-end">
                <Button type="submit" className="w-full sm:w-auto">
                  Update Email
                </Button>
              </div>
            </div>
          </Card>

          <Card className="w-full p-4 gap-1">
            <CardTitle className="text-lg font-bold">Change Password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
            <div className="pt-5 space-y-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Current Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your new password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm your new password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="bg-secondary/50 rounded p-3 text-sm text-muted-foreground">
                Passwords must be at least 8 characters long and contain
                uppercase, lowercase, and numbers
              </div>

              <div className="text-end">
                <Button type="submit" className="w-full sm:w-auto">
                  Change Password
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </Form>
  );
}
