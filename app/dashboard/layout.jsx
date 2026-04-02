import { SidebarProvider } from "@/components/ui/sidebar";
import { MainSidebar } from "./(dashboard)/_components/Sidebar/MainSidebar";
import { cookies } from "next/headers";
import DashboardHeader from "./(dashboard)/_components/DashboardHeader";

// export async function generateMetadata(): Promise<Metadata> {
//   const hdrs = await headers();
//   let pathname = hdrs.get("x-pathname") || "";
//   pathname = pathname.replaceAll("/", " ").replaceAll("-", " ");

//   return {
//     title: pathname,
//     description: `${pathname} Page`,
//     generator: "team.asakeeb",
//   };
// }

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const currentLanguage = cookieStore.get("current-language")?.value;

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "19rem",
        "--sidebar-width-mobile": "19rem",
      }}
      dir={currentLanguage === "ar" ? "rtl" : "ltr"}
    >
      <MainSidebar />
      <div className="flex flex-col w-full h-[calc(100vh-1rem)] border rounded-xl m-2 bg-background overflow-auto">
        <DashboardHeader />
        <div className="p-5 flex-1">{children}</div>
      </div>
    </SidebarProvider>
  );
}
