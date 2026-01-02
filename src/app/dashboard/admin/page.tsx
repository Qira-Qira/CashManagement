'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin_bendahara')) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ClassCash</h1>
            <p className="text-sm text-gray-500">Admin Bendahara Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, <strong>{user?.username}</strong></span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card: Create User */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">➕</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create User Account</h3>
            <p className="text-gray-600 text-sm mb-4">Create new student user accounts</p>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
              Create User
            </button>
          </div>

          {/* Card: Manage Users */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">👥</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Users</h3>
            <p className="text-gray-600 text-sm mb-4">Edit and manage user accounts</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Manage Users
            </button>
          </div>

          {/* Card: Financial Reports */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Reports</h3>
            <p className="text-gray-600 text-sm mb-4">View financial reports and analytics</p>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              View Reports
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
