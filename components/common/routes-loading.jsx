"use client";

import NextTopLoader from "nextjs-toploader";
import NProgress from "nprogress";

export default function RoutesLoading() {
  return (
    <>
      <NextTopLoader
        color="linear-gradient(90deg, #6a5bff, #d33df0, #ff7300, #f0c000, #00d08a, #00d4ff)"
        initialPosition={0.3}
        crawlSpeed={200}
        height={2}
        showSpinner={false}
      />
    </>
  );
}

export const startLoader = () => {
  NProgress.start();
};

export const stopLoader = () => {
  NProgress.done();
};
