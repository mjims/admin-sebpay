import { useEffect, useState } from 'react';
import StatCard from '@/common/StatCard';
import RecentActivity from './RecentActivity';
import { FiUsers, FiDollarSign, FiCreditCard, FiFileText } from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    transactions: 0,
    merchants: 0,
    pendingKyc: 0,
  });

  useEffect(() => {
    // Fetch stats from API
    const fetchStats = async () => {
      // Replace with actual API calls
      setStats({
        users: 1245,
        transactions: 5678,
        merchants: 342,
        pendingKyc: 23,
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Tableau de Bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<FiUsers />} 
          title="Utilisateurs" 
          value={stats.users} 
          link="/admin/users" 
        />
        <StatCard 
          icon={<FiDollarSign />} 
          title="Transactions" 
          value={stats.transactions} 
          link="/admin/transactions" 
        />
        <StatCard 
          icon={<FiCreditCard />} 
          title="Marchands" 
          value={stats.merchants} 
          link="/admin/merchants" 
        />
        <StatCard 
          icon={<FiFileText />} 
          title="KYC en Attente" 
          value={stats.pendingKyc} 
          link="/admin/kyc" 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        {/* Add other dashboard widgets here */}
      </div>
    </div>
  );
};

export default Dashboard;