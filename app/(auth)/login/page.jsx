import Image from "next/image";
import LoginForm from "../_components/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-hidden">
        <div className="flex flex-col items-start justify-center gap-6 max-w-sm mx-auto w-full p-3 py-6 order-2">
          <p className="text-4xl font-bold">Login</p>

          <LoginForm />
        </div>

        <div className="relative hidden md:block">
          <div className="fixed w-1/2 bottom-0 top-0">
            <Image src={"/images/sign-in.svg"} alt="Login" fill className="object-cover" />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

