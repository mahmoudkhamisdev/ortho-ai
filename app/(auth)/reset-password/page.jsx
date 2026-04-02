import Image from "next/image";
import ResetPasswordForm from "../_components/reset-password-form";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ResetPassword() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) { redirect("/login") }

  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-hidden">
        <div className="flex flex-col items-start justify-center gap-6 max-w-sm mx-auto w-full p-3 py-6">
          <p className="text-3xl font-bold">إعادة تعيين كلمة المرور</p>

          <ResetPasswordForm />
        </div>

        <div className="relative hidden md:block">
          <div className="fixed w-1/2 bottom-0 top-0">
            <div className="relative h-full flex items-center justify-center bg-gradient-to-br from-main to-[#2F2150] px-3">
              <div className="bg-[#F58E0480] w-[500px] h-[200px] blur-[100px] absolute -top-10 -start-20" />
              <div className="bg-[#F58E0480] w-[500px] h-[200px] blur-[100px] absolute -bottom-10 -end-40" />
              <Image src={"/images/login.svg"} alt="Login" width={400} height={400} />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
