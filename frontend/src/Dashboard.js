// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

function Dashboard() {
  const { getToken } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const token = await getToken();

        const response = await fetch('http://localhost:3000/api/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }

    fetchDashboard();
  }, [getToken]);

  return (
    <div>
      <h2>🌐 TripleW Learn Dashboard</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading dashboard data...</p>
      )}
    </div>
  );
}

export default Dashboard;
