"use client";

import { useState, useEffect } from "react";
import ApiClient from '../../lib/api'

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = new ApiClient()

 useEffect(() => {
    async function fetchClients() {
      try {
        const data = await api.getClients(); // ✅ Use your API client
        setClients(data);
      } catch (err) {
       

        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  if (loading) return <div>Loading clients...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Clients</h1>
      {clients.length === 0 ? (
        <p>No clients found</p>
      ) : (
        clients.map((client) => <div key={client.id}>{client.name}</div>)
      )}
    </div>
  );
}
