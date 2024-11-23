import { useRef } from 'react';
import { Users, Shield, Lock } from 'lucide-react';
import { mockUsers, mockRoles } from '../data/mockData';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

const Dashboard = () => {
  const container = useRef(null);
  const stats = [
    {
      title: 'Total Users',
      value: mockUsers.length,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Roles',
      value: mockRoles.length,
      icon: Shield,
      color: 'bg-green-500',
    },
    {
      title: 'Total Permissions',
      value: Object.values(mockRoles[0].permissions).flat().length,
      icon: Lock,
      color: 'bg-purple-500',
    },
  ];

  useGSAP(() => {
    gsap.from('.side', {
      x: 300,
      opacity: 0,
      duration: 1,
      delay: 2,
      stagger: 0.3,
    });
  }, { scope: container });

  return (
    <div ref={container} className="p-6 overflow-hidden">
      <h1 className="side text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="side bg-white rounded-lg shadow p-6 flex items-center"
          >
            <div className={`${stat.color} p-4 rounded-lg text-white mr-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
