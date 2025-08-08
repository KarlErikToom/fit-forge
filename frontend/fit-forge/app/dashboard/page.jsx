"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch("http://localhost:5000/api/clients", {
          credentials: "include", // send cookies automatically
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setClients(data);
      } catch (err) {
        setError(err.message);
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
