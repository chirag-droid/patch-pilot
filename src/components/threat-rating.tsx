"use client";

import * as React from "react";

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
export const description = "An interactive bar chart";

import { Circle } from "lucide-react";

const CircleSliderThreatRating = ({ rating }: { rating: number }) => {
   const normalizedRating = Math.min(Math.max(rating, 0), 100);
   const circumference = 2 * Math.PI * 45; // 45 is the radius of our circle
   const strokeDashoffset =
      circumference - (normalizedRating / 100) * circumference;

   const getColor = (rating: number) => {
      if (rating < 33) return "text-green-500";
      if (rating < 66) return "text-yellow-500";
      return "text-red-500";
   };

   return (
      <div className="relative w-36 h-36 mx-auto">
         <svg className="w-full h-full transform -rotate-90">
            <circle
               cx="50%"
               cy="50%"
               r="45"
               stroke="currentColor"
               strokeWidth="10"
               fill="transparent"
               className="text-gray-200"
            />
            <circle
               cx="50%"
               cy="50%"
               r="45"
               stroke="currentColor"
               strokeWidth="10"
               fill="transparent"
               strokeDasharray={circumference}
               strokeDashoffset={strokeDashoffset}
               className={getColor(normalizedRating)}
            />
         </svg>
         <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold">{normalizedRating}%</span>
         </div>
      </div>
   );
};

export function ThreatRating() {
   const getRating = (rating: number) => {
      if (rating < 33) return "Low";
      if (rating < 66) return "Medium";
      return "High";
   };

   const getColor = (rating: number) => {
      if (rating < 33) return "text-green-500";
      if (rating < 66) return "text-yellow-500";
      return "text-red-500";
   };

   const rating = 62;

   return (
      <Card>
         <CardHeader>
            <CardTitle>Threat Score</CardTitle>
         </CardHeader>
         <CardContent className="px-2 sm:p-6 flex-col items-center justify-center gap-4">
            <CircleSliderThreatRating rating={rating} />
            <Card className="h-full w-full">
               <CardHeader>
                  <CardTitle className={getColor(rating)}>
                     {getRating(rating)}
                  </CardTitle>
                  <CardDescription>Risk Score</CardDescription>
               </CardHeader>
               <CardContent>
                  Improve the Risk Score by addressing what needs to be
                  remidated
               </CardContent>
            </Card>
         </CardContent>
      </Card>
   );
}
