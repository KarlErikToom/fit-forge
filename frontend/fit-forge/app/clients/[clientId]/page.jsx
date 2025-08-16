import { cookies } from "next/headers";
import ApiClient from "@/lib/api";
import ClientCalendar from "./ClientCalendar";
import { redirect } from "next/dist/server/api-utils";

export default async function ClientPage(props) {
  const params = await props.params;
  const cookieStore = await cookies();

  const isLoggedIn = await validateToken(token);

  if (!isLoggedIn){
    redirect("/login")
  }

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const api = new ApiClient(cookieHeader);
  const client = await api.getClient( params.clientId);

  return <ClientCalendar client={client} clientId={params.clientId} />;
}


async function validateToken(token) {
  if (!token) return false;

  try {
    const res = await fetch("http://localhost:5000/api/auth/check", {
      headers: {
        cookie: `token=${token}`,  
      },
      cache: "no-store", 
    });

    if (!res.ok) return false;

    const data = await res.json();
    return data.loggedIn;
  } catch (err) {
    console.error("Auth check failed", err);
    return false;
  }
}