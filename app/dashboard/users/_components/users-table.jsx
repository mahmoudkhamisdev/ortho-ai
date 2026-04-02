"use client";

import DeleteButton from "@/components/buttons/delete-button";
import UserAvatar from "@/components/common/user-avatar";
import SortButton from "@/components/table/sort-button";
import TableLayout from "@/components/table/table-layout";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { CheckCircle, CircleX, Eye, Table } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DrawerProfileForm from "./drawer-profile-form";
import { statusVariants } from "@/lib/utils";
import ButtonTooltip from "@/components/buttons/button-tooltip";
import { Button } from "@/components/ui/button";

export default function UsersTable({
  users = [],
  pagination = {},
  me = {},
  title = "",
  btnTitle = "",
  hideActions,
}) {
  const { getStatusIcon, getStatusColor } = statusVariants();

  const router = useRouter();
  const isTeacher = me.role === "teacher";

  const columns = [
    {
      accessorKey: `name`,
      header: ({ column }) => <SortButton column={column} title={"Name"} />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <UserAvatar
            name={row.original?.name}
            image={row.original?.image?.file_path}
          />
          <div className="-space-y-1">
            <div className="font-medium capitalize">{row.original?.name}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 group">
          {row.original?.phone ? (
            <>
              <Link
                href={
                  row.original?.phone
                    ? `https://wa.me/${row.original?.phone.replace("+", "")}`
                    : "#"
                }
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm text-end"
                dir={"ltr"}
              >
                {row.original?.phone}
              </Link>
              <CopyButton
                className="group-hover:opacity-100 opacity-0 transition-opacity"
                content={row.original.phone || "---"}
                size="sm"
                variant="outline"
              />
            </>
          ) : (
            "---"
          )}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => <SortButton column={column} title={"Status"} />,
      cell: ({ row }) => {
        const status = row.original.role;

        return (
          <Badge
            className={cn(
              getStatusColor(status === "admin" ? "complete" : "pending"),
              "flex items-center gap-1 w-fit rounded-full",
            )}
          >
            {status === "admin" ? "Complete" : "Pending"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) =>
        row.original?.created_at
          ? dayjs(row.original?.created_at).format("YYYY-MM-DD")
          : "---",
    },
    {
      accessorKey: "actions",
      header: () => "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <DrawerProfileForm user={row.original} profile={row.original} />
          <ButtonTooltip
            content={<Eye />}
            tooltip={"Patient Profile"}
            onClick={() => router.push("/dashboard/users/1")}
          />
          <DeleteButton
            apiLink={`/users/${row.original?.id}`}
            name={row.original?.name}
            onSuccess={() => router.refresh()}
          />
        </div>
      ),
    },
  ];

  return (
    <TableLayout
      title={title}
      columns={columns}
      data={users}
      hideActions={hideActions}
      badges={
        !hideActions
          ? [
              { title: "All", count: pagination?.total || 0, Icon: Table },
              { title: "Complete", count: 0, Icon: CheckCircle },
              { title: "Pending", count: 0, Icon: CircleX },
            ]
          : []
      }
      // pagination={pagination}
      AdditionComponent={
        <>
          {hideActions && (
            <Link href={"/dashboard/users"} aschild="true">
              <Button variant="link">View all</Button>
            </Link>
          )}
        </>
      }
    />
  );
}
