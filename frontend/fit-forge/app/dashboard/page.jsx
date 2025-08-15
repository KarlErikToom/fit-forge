import { cookies } from "next/headers";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import ApiClient from "@/lib/api";

async function getData() {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const api = new ApiClient(cookieHeader);
  const clients = await api.getClients( );
  return clients
}

export default async function DemoPage() {
  const clients = await getData()
  console.log(clients)

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={clients} />
    </div>
  )
}