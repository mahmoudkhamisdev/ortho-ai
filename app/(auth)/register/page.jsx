import Image from "next/image";
import RegisterForm from "../_components/register-form";
import { Suspense } from "react";
import RegisterReviewCarousel from "../_components/register-review-carousel";

export default function Register() {

  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="flex flex-col items-start justify-center gap-6 max-w-sm mx-auto w-full p-3 py-6">
          <p className="text-3xl font-bold">Register in Ortho AI</p>

          <RegisterForm />
        </div>

        <div className="relative hidden md:block">
          <div className="fixed w-1/2 bottom-0 top-0">
            <Image src={"/images/sign-up.svg"} alt="Register" fill className="object-cover" />
          </div>
        </div>
      </div>
    </Suspense>
  );
}




