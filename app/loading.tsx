import Image from "next/image";
import React from "react";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Spinner Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-main border-b-transparent border-l-transparent animate-spin" />

        {/* Logo in Center */}
        {/* <div className="relative w-full h-full">
          <Image
            src={"/images/asakeeb.png"}
            alt="Asakeeb Logo"
            fill
            placeholder="blur"
            blurDataURL="..."
            className="object-contain rounded-xl animate-pulse"
          />
        </div> */}
      </div>
    </div>
  );
}
