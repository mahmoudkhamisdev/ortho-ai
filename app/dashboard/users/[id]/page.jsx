import { Suspense } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserRoundPen } from "lucide-react";
import Link from "next/link";

export default async function UserProfilePage({ params }) {
  const { id } = await params;
  const data = {
    name: "John Smith",
    gender: "Male",
    jawType: "Lower",
    age: 28,
    treatmentFrequency: "Monthly",
    reportDate: "Monday, November 7, 2025",
  };
  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <UserRoundPen className="size-10" />
          <p className="text-3xl font-bold">John Smith Profile</p>
        </div>

        <Card className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide mb-2">
                Report Date
              </p>
              <p className="text-lg font-semibold">{data.reportDate}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-1">
                  Name
                </p>
                <p className="font-semibold">{data.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-1">
                  Gender
                </p>
                <p className="font-semibold">{data.gender}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-1">
                  Jaw Type
                </p>
                <p className="font-semibold">{data.jawType}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-1">
                  Treatment
                </p>
                <p className="font-semibold">{data.treatmentFrequency}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="w-full p-4 gap-1">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="">
              <CardTitle className="text-lg font-bold">
                Dental Assessment
              </CardTitle>
              <CardDescription>
                3D visualization of your dental structure
              </CardDescription>
            </div>
            <Link href="/dashboard/users/1/details" >
              <Button>View Details</Button>
            </Link>
          </div>
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="relative w-60 h-60 md:w-64 md:h-64 lg:w-72 lg:h-72 transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={`/images/tooth${i + 1}.svg`}
                  alt={`Tooth ${i + 1}`}
                  fill
                  className="object-contain drop-shadow-lg pointer-events-none"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </Card>

        {Array(5)
          .fill("")
          .map((_, i) => (
            <div className="space-y-3" key={i}>
              <p className="text-2xl font-bold">Stage {i + 1}</p>

              <Card className="w-full p-0 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-accent">
                      <TableHead className="font-bold">Tooth Number</TableHead>
                      <TableHead className="font-bold">
                        Left/Right (mm)
                      </TableHead>
                      <TableHead className="font-bold">
                        Forward/Backward (mm)
                      </TableHead>
                      <TableHead className="font-bold">
                        Extrude/Intrude (mm)
                      </TableHead>
                      <TableHead className="font-bold">
                        Buccal/Lingual (*)
                      </TableHead>
                      <TableHead className="font-bold">
                        Mesial/Distal (*)
                      </TableHead>
                      <TableHead className="font-bold">Rotation (*)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {measurements.map((row, idx) => (
                      <TableRow
                        key={idx}
                        // className={idx % 2 !== 0 && "bg-muted"}
                      >
                        <TableCell>{row.tooth}</TableCell>
                        <TableCell>{row.leftRight}</TableCell>
                        <TableCell>{row.forwardBackward}</TableCell>
                        <TableCell>{row.extrudeIntrude}</TableCell>
                        <TableCell>{row.buccalLingual}</TableCell>
                        <TableCell>{row.mesialDistal}</TableCell>
                        <TableCell>{row.rotation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          ))}
      </div>
    </Suspense>
  );
}

const measurements = [
  {
    tooth: "LL5",
    leftRight: "0.00",
    forwardBackward: "0.00",
    extrudeIntrude: "0.00",
    buccalLingual: "-3.87",
    mesialDistal: "-1.74",
    rotation: "0.16",
  },
  {
    tooth: "LR3",
    leftRight: "0.00",
    forwardBackward: "0.00",
    extrudeIntrude: "0.00",
    buccalLingual: "0.00",
    mesialDistal: "0.00",
    rotation: "-8.67",
  },
  {
    tooth: "LR3",
    leftRight: "0.00",
    forwardBackward: "0.00",
    extrudeIntrude: "0.00",
    buccalLingual: "0.00",
    mesialDistal: "0.00",
    rotation: "-0.44",
  },
  {
    tooth: "LR3",
    leftRight: "0.00",
    forwardBackward: "0.00",
    extrudeIntrude: "0.00",
    buccalLingual: "0.00",
    mesialDistal: "0.00",
    rotation: "-0.44",
  },
  {
    tooth: "LR3",
    leftRight: "0.00",
    forwardBackward: "0.00",
    extrudeIntrude: "0.00",
    buccalLingual: "0.00",
    mesialDistal: "0.00",
    rotation: "-8.67",
  },
  {
    tooth: "LR3",
    leftRight: "0.00",
    forwardBackward: "0.00",
    extrudeIntrude: "0.00",
    buccalLingual: "-1.93",
    mesialDistal: "0.00",
    rotation: "-8.67",
  },
  {
    tooth: "LR3",
    leftRight: "0.00",
    forwardBackward: "0.00",
    extrudeIntrude: "0.00",
    buccalLingual: "0.00",
    mesialDistal: "0.00",
    rotation: "-8.67",
  },
  {
    tooth: "LR3",
    leftRight: "0.00",
    forwardBackward: "0.00",
    extrudeIntrude: "0.00",
    buccalLingual: "0.00",
    mesialDistal: "0.00",
    rotation: "-0.44",
  },
];
