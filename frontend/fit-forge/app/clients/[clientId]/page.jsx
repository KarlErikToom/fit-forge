import { cookies } from "next/headers";
import ApiClient from "@/lib/api";
import ClientCalendar from "./ClientCalendar";

export default async function ClientPage(props) {
  const params = await props.params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const api = new ApiClient(cookieHeader);
  const client = await api.getClient( params.clientId);

  return <ClientCalendar client={client} clientId={params.clientId} />;
}
