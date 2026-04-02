import { Suspense } from "react";
import UsersTable from "./_components/users-table";
import { getUsers } from "@/lib/data/users";
import { getMe } from "@/lib/data/auth";

export default async function UsersPage({ searchParams }) {
  const { page, search, per_page } = await searchParams;

  const [users, me] = await Promise.all([
    getUsers({ page, search, per_page }),
    getMe(),
  ]);

  return (
    <Suspense fallback={<>Loading...</>}>
      <UsersTable
        users={users?.data}
        pagination={users?.pagination}
        me={me}
        title="Patients"
        hideActions={false}
      />
    </Suspense>
  );
}
