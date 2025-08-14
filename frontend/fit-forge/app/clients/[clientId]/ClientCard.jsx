"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function ClientCard({ client }) {
  return (
    <Link key={client._id} href="">
      <Card className="w-[240px] max-w-sm m-2">
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
          <CardDescription>{client.email}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
