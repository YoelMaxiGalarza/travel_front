import { useEffect, useState } from 'react';
import { authService } from '../services/authService';
import UserList from './UserList';
import DashboardHeader from './DashboardHeader';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const token = authService.getCurrentUser()?.token;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://your-backend-url/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader title="Admin Dashboard" />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">User Management</h2>
              <UserList users={users} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;