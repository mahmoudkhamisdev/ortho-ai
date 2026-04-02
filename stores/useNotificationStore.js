"use client";

import { create } from "zustand";

const initialNotifications = [
  {
    id: 415,
    user_id: 139,
    title: "تغيير كلمة المرور",
    message:
      "تم تغيير كلمة المرور الخاصة بك بنجاح لحساب البريد الإلكتروني: admin@gmail.com. كلمة المرور الجديدة هي: 12345678. إذا لم تقم بهذا التغيير، يرجى التواصل مع الدعم فورًا.",
    is_read: 1,
    created_at: "2025-10-08T09:55:53.000000Z",
    updated_at: "2025-10-11T09:47:32.000000Z",
  },
  {
    id: 416,
    user_id: 139,
    title: "تسجيل دخول جديد",
    message:
      "تم تسجيل دخول جديد إلى حسابك من جهاز غير معروف في القاهرة، مصر. إذا لم تكن أنت، يرجى تغيير كلمة المرور فورًا.",
    is_read: 0,
    created_at: "2025-10-10T14:23:11.000000Z",
    updated_at: "2025-10-10T14:23:11.000000Z",
  },
  {
    id: 417,
    user_id: 139,
    title: "تحديث الملف الشخصي",
    message:
      "تم تحديث معلوماتك الشخصية بنجاح. يمكنك مراجعة التغييرات من صفحة الإعدادات.",
    is_read: 1,
    created_at: "2025-10-07T10:40:19.000000Z",
    updated_at: "2025-10-07T10:40:19.000000Z",
  },
  {
    id: 418,
    user_id: 139,
    title: "دفعة جديدة",
    message:
      "تم إضافة دفعة مالية جديدة بقيمة 150 دولار إلى حسابك. يمكنك مراجعة التفاصيل في صفحة الفواتير.",
    is_read: 0,
    created_at: "2025-10-11T08:15:42.000000Z",
    updated_at: "2025-10-11T08:15:42.000000Z",
  },
  {
    id: 419,
    user_id: 139,
    title: "تذكير بموعد الدرس",
    message:
      "لديك درس قادم اليوم في الساعة 5:00 مساءً مع المدرس أحمد. لا تنسَ الانضمام في الوقت المحدد.",
    is_read: 0,
    created_at: "2025-10-12T09:00:00.000000Z",
    updated_at: "2025-10-12T09:00:00.000000Z",
  },
];

export const useLanguageStore = create((set, get) => ({
  notifications: initialNotifications,
  unreadCount: get().notifications.filter((n) => !n.is_read).length,

  handleMarkAllAsRead: () => set({
    notifications: get().notifications.map((notification) => ({
      ...notification,
      is_read: true,
    }))
  }),

  handleNotificationClick: (id) =>
    set({
      notifications: get().notifications.map((notification) =>
        notification.id === id
          ? { ...notification, is_read: true }
          : notification
      )
    })
}))
