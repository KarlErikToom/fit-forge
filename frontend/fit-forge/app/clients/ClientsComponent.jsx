"use client";

import ApiClient from "@/lib/api";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function ClientsComponent() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const api = new ApiClient();

  useEffect(() => {
    async function fetchClients() {
      try {
        const data = await api.getClients();
        setClients(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  return (
    <>
      {clients.length === 0 ? (
        <p>no clients found</p>
      ) : (
        clients.map((client) => (
          <Link key={client._id}  href={`/clients/${client._id}`}>
          <Card className="w-[240px]  max-w-sm m-2" >
            <CardHeader className="items-center justify-center">
              <CardTitle className="flex items-center justify-center">
              <Avatar className="flex flex-col items-center justify-center w-20 h-20">
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                  />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
                  </CardTitle>
              <CardDescription>
               {client.firstName} {client.lastName}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription >{client.email}</CardDescription>
            </CardContent>
          </Card>
      </Link>
        ))
      )}
    </>
  );
}
