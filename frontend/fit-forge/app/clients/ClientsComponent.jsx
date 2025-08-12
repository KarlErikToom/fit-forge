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
          <Link key={client._id}  href="">
          <Card className="w-[240px] h-[240px] max-w-sm m-2" >
            <CardHeader className="items-center justify-center">
              <CardTitle className="flex items-center justify-center">
              <Avatar className="flex flex-col items-center justify-center">
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
            <CardContent className="p-2 overflow-y-auto max-h-[100px]">
              <CardDescription >Lorem asddddddd ddddddddd ddddd ddddddd ipsum dolor sit amet consectetur adipisicing elit. Porro corporis recusandae reiciendis voluptatum excepturi expedita doloremque. Laudantium quod et nihil!</CardDescription>
            </CardContent>
          </Card>
      </Link>
        ))
      )}
    </>
  );
}
