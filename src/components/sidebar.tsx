import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
   BriefcaseMedical,
   BugIcon,
   FilesIcon,
   HelpCircleIcon,
   Laptop,
   LayoutGridIcon,
   LineChartIcon,
   Settings2,
   SettingsIcon,
   ShieldIcon,
   TriangleAlertIcon,
} from "lucide-react";
import Link from "next/link";

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
   return (
      <div
         className={cn(
            "flex flex-col pb-12 h-full bg-muted/40 text-muted-foreground",
            className
         )}
      >
         <div className="space-y-4 py-4">
            <div className="px-3 py-2">
               <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-foreground">
                  General
               </h2>
               <div className="space-y-1">
                  <Button
                     variant="ghost"
                     className="w-full justify-start"
                     asChild
                  >
                     <Link href={"/"}>
                        <LayoutGridIcon className="h-4 w-4 mr-2" />
                        Overview
                     </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                     <TriangleAlertIcon className="h-4 w-4 mr-2" />
                     Issues
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                     <FilesIcon className="h-4 w-4 mr-2" />
                     Files
                  </Button>
               </div>
            </div>

            <div className="px-3 py-2">
               <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-foreground">
                  Reports
               </h2>
               <div className="space-y-1">
                  <Button
                     variant="ghost"
                     className="w-full justify-start"
                     asChild
                  >
                     <Link href={"/"}>
                        <ShieldIcon className="h-4 w-4 mr-2" />
                        Threat Details
                     </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                     <BugIcon className="h-4 w-4 mr-2" />
                     Threats
                  </Button>
               </div>
            </div>

            <div className="px-3 py-2">
               <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-foreground">
                  Settings
               </h2>
               <div className="space-y-1">
                  <Button
                     variant="ghost"
                     className="w-full justify-start"
                     asChild
                  >
                     <Link href={"/"}>
                        <HelpCircleIcon className="h-4 w-4 mr-2" />
                        Help & Support
                     </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                     <Link href={"/settings"} className="flex">
                        <SettingsIcon className="h-4 w-4 mr-2" />
                        Settings
                     </Link>
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}
