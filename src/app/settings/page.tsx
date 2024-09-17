"use client";

import { Separator } from "@/components/ui/separator";
import { ThreatSummary } from "@/components/threat-summary";
import { ThreatDetails } from "@/components/threat-details";
import { ThreatRating } from "@/components/threat-rating";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
   return (
      <main className="p-4 sm:p-8 lg:p-10">
         <div className="space-y-0.5">
            <div className="flex justify-between">
               <div className="flex space-x-2 flex-grow items-center">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                     Settings
                  </h2>
               </div>
            </div>
            <p className="text-muted-foreground text-sm">
               Manage your settings and preferences.
            </p>
         </div>

         <Separator className="mt-3 mb-6" />

         <div className="flex flex-col gap-4 md:gap-8">
            <Card>
               <CardHeader>
                  <CardTitle>API Settings</CardTitle>
               </CardHeader>
               <CardContent></CardContent>
            </Card>
         </div>
      </main>
   );
}
