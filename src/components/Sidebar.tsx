import React, { useRef } from 'react';
import { Users, Shield, Layout } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Sidebar = () => {
  const location = useLocation();
  const container=useRef(null);
  
  const links = [
    { to: '/', icon: Layout, label: 'Dashboard' },
    { to: '/users', icon: Users, label: 'Users' },
    { to: '/roles', icon: Shield, label: 'Roles' },
  ];

  useGSAP(()=>{
    gsap.from('.side',{
      x:-300,
      opacity:0,
      duration:1,
      delay:2,
      stagger:0.3
    })
  },{scope:container}) 

  return (
    <div ref={container} className="bg-gray-900 text-white w-64 min-h-full p-4">
      <div className="flex items-center gap-2 mb-8">
        <Shield className="side w-8 h-8 text-indigo-400" />
        <h1 className="side text-xl font-bold">RBAC Admin</h1>
      </div>
      <nav>
        {links.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`side flex items-center gap-2 p-3 rounded-lg mb-2 transition-colors ${
              location.pathname === to
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;