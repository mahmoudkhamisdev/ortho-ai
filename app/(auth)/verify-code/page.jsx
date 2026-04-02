import Image from "next/image";
import { Suspense } from "react";
import VerifyCodeForm from "../_components/verify-code-form";
import { redirect } from "next/navigation";

export default function VerifyCodePage({ searchParams }) {
  const email = searchParams?.email || "";
  if (!email) { redirect("/forgot-password"); }

  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-6 max-w-sm mx-auto w-full p-3 py-6">
          <p className="text-3xl font-bold">أدخل رمز التحقق</p>

          <VerifyCodeForm />
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
