"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Menu } from "@/components/menu";
import { Separator } from "@/components/ui/separator";
import {
   ResizablePanelGroup,
   ResizablePanel,
   ResizableHandle,
} from "@/components/ui/resizable";
import { Sidebar } from "@/components/sidebar";
import { useSidebarStore } from "@/store/use-sidebar-store";
import { cn } from "@/lib/utils";
import { BackgroundBeams } from "@/components/ui/background-beams";

const geistSans = localFont({
   src: "./fonts/GeistVF.woff",
   variable: "--font-geist-sans",
   weight: "100 900",
});
const geistMono = localFont({
   src: "./fonts/GeistMonoVF.woff",
   variable: "--font-geist-mono",
   weight: "100 900",
});

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const { isSidebarHidden } = useSidebarStore();

   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
         >
            <div className="relative min-h-[100svh] flex flex-col bg-background">
               <Menu />
               <Separator />
               <div className="relative flex-grow flex flex-col">
                  <ResizablePanelGroup
                     direction="horizontal"
                     className="flex-grow items-stretch"
                  >
                     <ResizablePanel
                        defaultSize={4}
                        minSize={12}
                        maxSize={16}
                        className={cn(
                           isSidebarHidden
                              ? "hidden"
                              : "hidden sm:block min-w-min"
                        )}
                     >
                        <Sidebar />
                     </ResizablePanel>
                     <ResizableHandle
                        className={cn(
                           isSidebarHidden ? "hidden" : "hidden sm:block"
                        )}
                     />
                     <ResizablePanel>
                        <div className="relative">{children}</div>
                     </ResizablePanel>
                  </ResizablePanelGroup>
               </div>
            </div>

            <BackgroundBeams className="pointer-events-none" />
         </body>
      </html>
   );
}
