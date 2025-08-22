"use client";

import { createContext, useContext, useState, useEffect } from "react";
import ApiClient from "@/lib/api";

const ClientContext = createContext();

export const useClients = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClients must be used within a ClientProvider");
  }
  return context;
};

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = new ApiClient();

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getClients();
      setClients(data);
    } catch (error) {
      setError(error.message);
      console.error("failed to fetch clients:", error);
    } finally {
      setLoading(false);
    }
  }
  async function addClient(clientData) {
    try {
      const newClient = await api.createClient(clientData);
      setClients((prevClients) => [...prevClients, newClient]);
      return newClient;
    } catch (error) {
      console.error("failed to create client:", error);
      throw error;
    }
  }

  async function deleteClient(clientId) {
    try {
      await api.deleteClient(clientId);
      setClients((prevClients) =>
        prevClients.filter((client) => client._id !== clientId)
      );
    } catch (error) {
      console.error("failed to delete client:", error);
      throw error;
    }
  }

  const refreshClients = () =>{
    fetchClients();
  }

  const value= {
     clients,
    loading,
    error,
    addClient,
    deleteClient,
    refreshClients,
    fetchClients,
  }
  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};
