"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", complete: 222, pending: 150 },
  { date: "2024-04-02", complete: 97, pending: 180 },
  { date: "2024-04-03", complete: 167, pending: 120 },
  { date: "2024-04-04", complete: 242, pending: 260 },
  { date: "2024-04-05", complete: 373, pending: 290 },
  { date: "2024-04-06", complete: 301, pending: 340 },
  { date: "2024-04-07", complete: 245, pending: 180 },
  { date: "2024-04-08", complete: 409, pending: 320 },
  { date: "2024-04-09", complete: 59, pending: 110 },
  { date: "2024-04-10", complete: 261, pending: 190 },
  { date: "2024-04-11", complete: 327, pending: 350 },
  { date: "2024-04-12", complete: 292, pending: 210 },
  { date: "2024-04-13", complete: 342, pending: 380 },
  { date: "2024-04-14", complete: 137, pending: 220 },
  { date: "2024-04-15", complete: 120, pending: 170 },
  { date: "2024-04-16", complete: 138, pending: 190 },
  { date: "2024-04-17", complete: 446, pending: 360 },
  { date: "2024-04-18", complete: 364, pending: 410 },
  { date: "2024-04-19", complete: 243, pending: 180 },
  { date: "2024-04-20", complete: 89, pending: 150 },
  { date: "2024-04-21", complete: 137, pending: 200 },
  { date: "2024-04-22", complete: 224, pending: 170 },
  { date: "2024-04-23", complete: 138, pending: 230 },
  { date: "2024-04-24", complete: 387, pending: 290 },
  { date: "2024-04-25", complete: 215, pending: 250 },
  { date: "2024-04-26", complete: 75, pending: 130 },
  { date: "2024-04-27", complete: 383, pending: 420 },
  { date: "2024-04-28", complete: 122, pending: 180 },
  { date: "2024-04-29", complete: 315, pending: 240 },
  { date: "2024-04-30", complete: 454, pending: 380 },
  { date: "2024-05-01", complete: 165, pending: 220 },
  { date: "2024-05-02", complete: 293, pending: 310 },
  { date: "2024-05-03", complete: 247, pending: 190 },
  { date: "2024-05-04", complete: 385, pending: 420 },
  { date: "2024-05-05", complete: 481, pending: 390 },
  { date: "2024-05-06", complete: 498, pending: 520 },
  { date: "2024-05-07", complete: 388, pending: 300 },
  { date: "2024-05-08", complete: 149, pending: 210 },
  { date: "2024-05-09", complete: 227, pending: 180 },
  { date: "2024-05-10", complete: 293, pending: 330 },
  { date: "2024-05-11", complete: 335, pending: 270 },
  { date: "2024-05-12", complete: 197, pending: 240 },
  { date: "2024-05-13", complete: 197, pending: 160 },
  { date: "2024-05-14", complete: 448, pending: 490 },
  { date: "2024-05-15", complete: 473, pending: 380 },
  { date: "2024-05-16", complete: 338, pending: 400 },
  { date: "2024-05-17", complete: 499, pending: 420 },
  { date: "2024-05-18", complete: 315, pending: 350 },
  { date: "2024-05-19", complete: 235, pending: 180 },
  { date: "2024-05-20", complete: 177, pending: 230 },
  { date: "2024-05-21", complete: 82, pending: 140 },
  { date: "2024-05-22", complete: 81, pending: 120 },
  { date: "2024-05-23", complete: 252, pending: 290 },
  { date: "2024-05-24", complete: 294, pending: 220 },
  { date: "2024-05-25", complete: 201, pending: 250 },
  { date: "2024-05-26", complete: 213, pending: 170 },
  { date: "2024-05-27", complete: 420, pending: 460 },
  { date: "2024-05-28", complete: 233, pending: 190 },
  { date: "2024-05-29", complete: 78, pending: 130 },
  { date: "2024-05-30", complete: 340, pending: 280 },
  { date: "2024-05-31", complete: 178, pending: 230 },
  { date: "2024-06-01", complete: 178, pending: 200 },
  { date: "2024-06-02", complete: 470, pending: 410 },
  { date: "2024-06-03", complete: 103, pending: 160 },
  { date: "2024-06-04", complete: 439, pending: 380 },
  { date: "2024-06-05", complete: 88, pending: 140 },
  { date: "2024-06-06", complete: 294, pending: 250 },
  { date: "2024-06-07", complete: 323, pending: 370 },
  { date: "2024-06-08", complete: 385, pending: 320 },
  { date: "2024-06-09", complete: 438, pending: 480 },
  { date: "2024-06-10", complete: 155, pending: 200 },
  { date: "2024-06-11", complete: 92, pending: 150 },
  { date: "2024-06-12", complete: 492, pending: 420 },
  { date: "2024-06-13", complete: 81, pending: 130 },
  { date: "2024-06-14", complete: 426, pending: 380 },
  { date: "2024-06-15", complete: 307, pending: 350 },
  { date: "2024-06-16", complete: 371, pending: 310 },
  { date: "2024-06-17", complete: 475, pending: 520 },
  { date: "2024-06-18", complete: 107, pending: 170 },
  { date: "2024-06-19", complete: 341, pending: 290 },
  { date: "2024-06-20", complete: 408, pending: 450 },
  { date: "2024-06-21", complete: 169, pending: 210 },
  { date: "2024-06-22", complete: 317, pending: 270 },
  { date: "2024-06-23", complete: 480, pending: 530 },
  { date: "2024-06-24", complete: 132, pending: 180 },
  { date: "2024-06-25", complete: 141, pending: 190 },
  { date: "2024-06-26", complete: 434, pending: 380 },
  { date: "2024-06-27", complete: 448, pending: 490 },
  { date: "2024-06-28", complete: 149, pending: 200 },
  { date: "2024-06-29", complete: 103, pending: 160 },
  { date: "2024-06-30", complete: 446, pending: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  complete: {
    label: "Complete",
    color: "var(--main)",
  },
  pending: {
    label: "Pending",
    color: "#599BC9",
  },
};

export function DashboardChartArea() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Completed vs Pending Cases</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillComplete" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-complete)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-complete)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillPending" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-pending)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-pending)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
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
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="pending"
              type="natural"
              fill="url(#fillPending)"
              stroke="var(--color-pending)"
              stackId="a"
            />
            <Area
              dataKey="complete"
              type="natural"
              fill="url(#fillComplete)"
              stroke="var(--color-complete)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
