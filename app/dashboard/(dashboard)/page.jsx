import { DashboardChartArea } from "./_components/DashboardChartArea";
import { getUsers } from "@/lib/data/users";
import { getMe } from "@/lib/data/auth";
import { DashboardCards } from "./_components/DashboardCards";
import UsersTable from "../users/_components/users-table";

export default async function Dashboard() {
  const [users, me] = await Promise.all([getUsers(), getMe()]);
  return (
    <div className="space-y-4">
      <DashboardCards />

      <DashboardChartArea />

      <UsersTable
        title="Patients"
        users={users.data.slice(0, 5)}
        hideActions={true}
      />
    </div>
  );
}
