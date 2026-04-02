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
import { PhoneInput } from "../../../(auth)/_components/PhoneInput";
import { useLanguageStore } from "@/stores/useLanguageStore";
import UploadAvatar from "@/components/upload/upload-avatar";

export default function DrawerProfileForm({ profile, btnTitle }) {
  const { role } = useParams();
  const router = useRouter();
  const isMobile = useIsMobile();
  const { languages, currentLanguage } = useLanguageStore();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

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
    setLoading(true);

    const formData = new FormData();
    Object.entries(values).map(([key, value]) => formData.append(key, value));
    formData.set("is_parent", values.is_parent ? 1 : 0);
    formData.set("stop", values.stop ? 1 : 0);
    if (profile && values.password === "") formData.delete("password");
    if (values.image === null) formData.delete("image");

    const promise = (
      profile
        ? editUser({
            id: profile?.id,
            values: formData,
            onUploadProgress: setProgress,
          })
        : addUser({ values: formData, onUploadProgress: setProgress })
    )
      .then((data) => {
        router.refresh();
        setOpen(false);
      })
      .catch((error) => {
        ErrorHandler(error, form);
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });

    toast.promise(promise, {
      loading: `جاري الحفظ... ${progress}%`,
      success: "تم حفظ البيانات بنجاح 🎉",
      error: (err) => "حدث خطأ أثناء الحفظ 😞",
    });
  }

  const handleOpen = (open) => {
    setOpen(open);

    open &&
      form.reset({
        image: profile?.image?.file_path || null,
        name: profile?.name || "",
        email: profile?.email || "",
        password: profile?.password || "",
        phone: profile?.phone || "",
        role: role || profile?.role || "",
        lang: profile?.lang || "",
        is_parent: profile?.is_parent || "",
        stop: profile?.stop || "",
      });
  };

  return (
    <Drawer
      open={open}
      onOpenChange={handleOpen}
      direction={
        isMobile ? "bottom" : currentLanguage === "ar" ? "left" : "right"
      }
    >
      <DrawerTrigger asChild>
        {profile ? (
          <ButtonTooltip
            content={<Edit2 />}
            tooltip={profile ? "تعديل" : "إضافة"}
          />
        ) : (
          <PrimaryButton title={btnTitle || "إضافة مستخدم جديد"} />
        )}
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="overflow-auto"
          >
            <DrawerHeader>
              <DrawerTitle>
                {profile ? "تعديل الملف الشخصي" : "إضافة ملف شخصي"}
              </DrawerTitle>
              <DrawerDescription>
                يمكنك {profile ? "تعديل" : "إضافة"} بيانات الحساب من هنا. اضغط
                حفظ عند الانتهاء.
              </DrawerDescription>
            </DrawerHeader>
            <div className="space-y-4 px-4">
              {/* Image */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">الصورة الشخصية</FormLabel>
                    <FormControl>
                      <UploadAvatar
                        value={field.value}
                        onChange={field.onChange}
                        className={"scale-150 my-2"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">الاسم الكامل</FormLabel>
                    <FormControl>
                      <Input placeholder="الاسم الكامل" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      البريد الإلكتروني
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">كلمة المرور</FormLabel>
                    <FormControl>
                      <Input
                        type={"text"}
                        placeholder="••••••••"
                        className="pe-10"
                        {...field}
                      />
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
                    <FormLabel className="font-bold">رقم الهاتف</FormLabel>
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

              {/* Role */}
              {/* <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">الدور</FormLabel>
                    <FormControl>
                      <Select
                        disabled={role}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="اختر الدور" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">مدير</SelectItem>
                          <SelectItem value="teacher">معلم</SelectItem>
                          <SelectItem value="student">طالب</SelectItem>
                          <SelectItem value="supervisor">مشرف</SelectItem>
                          <SelectItem value="visitor">زائر</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* Roles */}
              {/* {form.watch("role") === "admin" && (
                <FormField
                  control={form.control}
                  name="roles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">دور المدير</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          placeholder="اكتب أدور المدير"
                          className="py-1.5"
                          badgeClassName="h-9"
                          creatable
                          hidePlaceholderWhenSelected
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )} */}

              {/* Is Parent */}
              {/* {form.watch("role") === "student" && (
                <FormField
                  control={form.control}
                  name="is_parent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">والد</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="اختر إن كنت والدًا" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">نعم</SelectItem>
                            <SelectItem value="false">لا</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )} */}

              {/* Is Stop */}
              {/* {form.watch("role") !== "admin" && profile ? (
                <FormField
                  control={form.control}
                  name="stop"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">حالة الحساب</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="اختر حالة الحساب" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="false">نشط</SelectItem>
                            <SelectItem value="true">معلّق</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null} */}

              {/* Language */}
              {/* <FormField
                control={form.control}
                name="lang"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">اللغة</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="اختر اللغة" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages?.map(({ code, nativeName }, i) => (
                            <SelectItem key={i} value={code}>
                              {nativeName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            <DrawerFooter className="py-5 px-4">
              <PrimaryButton
                type="submit"
                disabled={loading}
                title={profile ? "حفظ التغييرات" : "حفظ البيانات"}
                className="w-full sm:w-auto"
              />
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
