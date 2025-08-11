import { fetchStats } from '@/lib/api/admin';
import StatsCards from '@/components/admin/Dashboard/StatsCards';
import RecentActivity from '@/components/admin/Dashboard/RecentActivity';

export default async function AdminDashboard() {
  const stats = await fetchStats();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tableau de Bord</h1>
      
      <StatsCards stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
      </div>
    </div>
  );
}