"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   ChartConfig,
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from "@/components/ui/chart";
import { Meteors } from "./ui/meteors";

export const description = "An interactive bar chart";

const chartData = [
   { date: "2024-04-01", desktop: 222, mobile: 150, iot: 132 },
   { date: "2024-04-02", desktop: 97, mobile: 180, iot: 95 },
   { date: "2024-04-03", desktop: 167, mobile: 120, iot: 143 },
   { date: "2024-04-04", desktop: 242, mobile: 260, iot: 205 },
   { date: "2024-04-05", desktop: 373, mobile: 290, iot: 270 },
   { date: "2024-04-06", desktop: 301, mobile: 340, iot: 322 },
   { date: "2024-04-07", desktop: 245, mobile: 180, iot: 142 },
   { date: "2024-04-08", desktop: 409, mobile: 320, iot: 298 },
   { date: "2024-04-09", desktop: 59, mobile: 110, iot: 77 },
   { date: "2024-04-10", desktop: 261, mobile: 190, iot: 198 },
   { date: "2024-04-11", desktop: 327, mobile: 350, iot: 312 },
   { date: "2024-04-12", desktop: 292, mobile: 210, iot: 165 },
   { date: "2024-04-13", desktop: 342, mobile: 380, iot: 324 },
   { date: "2024-04-14", desktop: 137, mobile: 220, iot: 143 },
   { date: "2024-04-15", desktop: 120, mobile: 170, iot: 85 },
   { date: "2024-04-16", desktop: 138, mobile: 190, iot: 165 },
   { date: "2024-04-17", desktop: 446, mobile: 360, iot: 425 },
   { date: "2024-04-18", desktop: 364, mobile: 410, iot: 300 },
   { date: "2024-04-19", desktop: 243, mobile: 180, iot: 172 },
   { date: "2024-04-20", desktop: 89, mobile: 150, iot: 135 },
   { date: "2024-04-21", desktop: 137, mobile: 200, iot: 123 },
   { date: "2024-04-22", desktop: 224, mobile: 170, iot: 105 },
   { date: "2024-04-23", desktop: 138, mobile: 230, iot: 190 },
   { date: "2024-04-24", desktop: 387, mobile: 290, iot: 312 },
   { date: "2024-04-25", desktop: 215, mobile: 250, iot: 189 },
   { date: "2024-04-26", desktop: 75, mobile: 130, iot: 102 },
   { date: "2024-04-27", desktop: 383, mobile: 420, iot: 348 },
   { date: "2024-04-28", desktop: 122, mobile: 180, iot: 115 },
   { date: "2024-04-29", desktop: 315, mobile: 240, iot: 208 },
   { date: "2024-04-30", desktop: 454, mobile: 380, iot: 399 },
   { date: "2024-05-01", desktop: 165, mobile: 220, iot: 142 },
   { date: "2024-05-02", desktop: 293, mobile: 310, iot: 288 },
   { date: "2024-05-03", desktop: 247, mobile: 190, iot: 150 },
   { date: "2024-05-04", desktop: 385, mobile: 420, iot: 335 },
   { date: "2024-05-05", desktop: 481, mobile: 390, iot: 465 },
   { date: "2024-05-06", desktop: 498, mobile: 520, iot: 480 },
   { date: "2024-05-07", desktop: 388, mobile: 300, iot: 259 },
   { date: "2024-05-08", desktop: 149, mobile: 210, iot: 124 },
   { date: "2024-05-09", desktop: 227, mobile: 180, iot: 153 },
   { date: "2024-05-10", desktop: 293, mobile: 330, iot: 277 },
   { date: "2024-05-11", desktop: 335, mobile: 270, iot: 240 },
   { date: "2024-05-12", desktop: 197, mobile: 240, iot: 182 },
   { date: "2024-05-13", desktop: 197, mobile: 160, iot: 133 },
   { date: "2024-05-14", desktop: 448, mobile: 490, iot: 429 },
   { date: "2024-05-15", desktop: 473, mobile: 380, iot: 456 },
   { date: "2024-05-16", desktop: 338, mobile: 400, iot: 323 },
   { date: "2024-05-17", desktop: 499, mobile: 420, iot: 389 },
   { date: "2024-05-18", desktop: 315, mobile: 350, iot: 280 },
   { date: "2024-05-19", desktop: 235, mobile: 180, iot: 125 },
   { date: "2024-05-20", desktop: 177, mobile: 230, iot: 145 },
   { date: "2024-05-21", desktop: 82, mobile: 140, iot: 69 },
   { date: "2024-05-22", desktop: 81, mobile: 120, iot: 57 },
   { date: "2024-05-23", desktop: 252, mobile: 290, iot: 215 },
   { date: "2024-05-24", desktop: 294, mobile: 220, iot: 209 },
   { date: "2024-05-25", desktop: 201, mobile: 250, iot: 156 },
   { date: "2024-05-26", desktop: 213, mobile: 170, iot: 142 },
   { date: "2024-05-27", desktop: 420, mobile: 460, iot: 398 },
   { date: "2024-05-28", desktop: 233, mobile: 190, iot: 152 },
   { date: "2024-05-29", desktop: 78, mobile: 130, iot: 102 },
   { date: "2024-05-30", desktop: 340, mobile: 280, iot: 276 },
   { date: "2024-05-31", desktop: 178, mobile: 230, iot: 153 },
   { date: "2024-06-01", desktop: 178, mobile: 200, iot: 133 },
   { date: "2024-06-02", desktop: 470, mobile: 410, iot: 387 },
   { date: "2024-06-03", desktop: 103, mobile: 160, iot: 111 },
   { date: "2024-06-04", desktop: 439, mobile: 380, iot: 345 },
   { date: "2024-06-05", desktop: 88, mobile: 140, iot: 65 },
   { date: "2024-06-06", desktop: 294, mobile: 250, iot: 219 },
   { date: "2024-06-07", desktop: 323, mobile: 370, iot: 312 },
   { date: "2024-06-08", desktop: 385, mobile: 320, iot: 280 },
   { date: "2024-06-09", desktop: 438, mobile: 480, iot: 425 },
   { date: "2024-06-10", desktop: 155, mobile: 200, iot: 122 },
   { date: "2024-06-11", desktop: 92, mobile: 150, iot: 79 },
   { date: "2024-06-12", desktop: 492, mobile: 420, iot: 390 },
   { date: "2024-06-13", desktop: 81, mobile: 130, iot: 54 },
   { date: "2024-06-14", desktop: 426, mobile: 380, iot: 311 },
   { date: "2024-06-15", desktop: 307, mobile: 350, iot: 286 },
   { date: "2024-06-16", desktop: 371, mobile: 310, iot: 259 },
   { date: "2024-06-17", desktop: 475, mobile: 520, iot: 434 },
   { date: "2024-06-18", desktop: 107, mobile: 170, iot: 81 },
   { date: "2024-06-19", desktop: 341, mobile: 290, iot: 298 },
   { date: "2024-06-20", desktop: 408, mobile: 450, iot: 341 },
   { date: "2024-06-21", desktop: 169, mobile: 210, iot: 119 },
   { date: "2024-06-22", desktop: 317, mobile: 270, iot: 195 },
   { date: "2024-06-23", desktop: 480, mobile: 530, iot: 452 },
   { date: "2024-06-24", desktop: 132, mobile: 180, iot: 92 },
   { date: "2024-06-25", desktop: 141, mobile: 190, iot: 98 },
   { date: "2024-06-26", desktop: 434, mobile: 380, iot: 302 },
   { date: "2024-06-27", desktop: 448, mobile: 490, iot: 415 },
   { date: "2024-06-28", desktop: 149, mobile: 200, iot: 128 },
   { date: "2024-06-29", desktop: 103, mobile: 160, iot: 95 },
   { date: "2024-06-30", desktop: 446, mobile: 400, iot: 342 },
];

const chartConfig = {
   views: {
      label: "Threats",
   },
   desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
   },
   mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
   },
   iot: {
      label: "IOT Devices",
      color: "hsl(var(--chart-3))",
   },
} satisfies ChartConfig;

export function ThreatSummary() {
   const [activeChart, setActiveChart] =
      React.useState<keyof typeof chartConfig>("desktop");

   const total = React.useMemo(
      () => ({
         desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
         mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
         iot: chartData.reduce((acc, curr) => acc + curr.iot, 0),
      }),
      []
   );

   return (
      <Card className="col-span-2">
         <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
               <CardTitle>Threat Summary</CardTitle>
               <CardDescription>
                  Showing total threats for the last 3 months
               </CardDescription>
            </div>
            <div className="flex">
               {["desktop", "mobile", "iot"].map((key) => {
                  const chart = key as keyof typeof chartConfig;
                  return (
                     <button
                        key={chart}
                        data-active={activeChart === chart}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                        onClick={() => setActiveChart(chart)}
                     >
                        <span className="text-xs text-muted-foreground">
                           {chartConfig[chart].label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                           {total[key as keyof typeof total].toLocaleString()}
                        </span>
                     </button>
                  );
               })}
            </div>
         </CardHeader>
         <CardContent className="px-2 sm:p-6">
            <ChartContainer
               config={chartConfig}
               className="aspect-auto h-[250px] w-full"
            >
               <BarChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                     left: 12,
                     right: 12,
                  }}
               >
                  <CartesianGrid vertical={false} />
                  <XAxis
                     dataKey="date"
                     tickLine={false}
                     axisLine={false}
                     tickMargin={8}
                     minTickGap={32}
                     tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                           month: "short",
                           day: "numeric",
                        });
                     }}
                  />
                  <ChartTooltip
                     content={
                        <ChartTooltipContent
                           className="w-[150px]"
                           nameKey="views"
                           labelFormatter={(value) => {
                              return new Date(value).toLocaleDateString(
                                 "en-US",
                                 {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                 }
                              );
                           }}
                        />
                     }
                  />
                  <Bar
                     dataKey={activeChart}
                     fill={`var(--color-${activeChart})`}
                  />
               </BarChart>
            </ChartContainer>
         </CardContent>
      </Card>
   );
}
