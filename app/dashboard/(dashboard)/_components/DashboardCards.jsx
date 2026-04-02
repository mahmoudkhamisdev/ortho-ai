import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CountUp from "@/components/common/count-up";
import {
  ChartArea,
  History,
  Package,
  TrendingDown,
  TrendingUp,
  Users2,
} from "lucide-react";

export function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total patients</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <CountUp to={"1200"} />
          </CardTitle>
          <CardAction>
            <Badge className="bg-main/20 text-main size-12 rounded-2xl">
              <Users2 className="!size-full" />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            <span className="text-green-500 flex items-center gap-1">
              <TrendingUp className="size-4" /> 8.5%
            </span>
            Up from past week
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Completed Cases</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <CountUp to={"500"} />
          </CardTitle>
          <CardAction>
            <Badge className="bg-green-400/20 text-green-500 size-12 rounded-2xl">
              <ChartArea className="!size-full" />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            <span className="text-green-500 flex items-center gap-1">
              <TrendingUp className="size-4" /> 1.3%
            </span>
            Up from past week{" "}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pending Cases</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <CountUp to={"800"} />
          </CardTitle>
          <CardAction>
            <Badge className="bg-orange-400/20 text-orange-500 size-12 rounded-2xl">
              <History className="!size-full" />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Cases advancing gradually.
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Number of Files Uploaded</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <CountUp to={"50"} />
          </CardTitle>
          <CardAction>
            <Badge className="bg-yellow-400/20 text-yellow-500 size-12 rounded-2xl">
              <Package className="!size-full" />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            <span className="text-green-500 flex items-center gap-1">
              <TrendingUp className="size-4" /> 1.3%
            </span>
            Up from past week
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
