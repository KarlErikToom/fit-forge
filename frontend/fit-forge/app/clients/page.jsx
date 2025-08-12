import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ClientsComponent } from "./ClientsComponent";

export default async function ClientsPage() {
  const cookieStore = await cookies();
  const token =  cookieStore.get("token")?.value;

  const isLoggedIn = await validateToken(token);

  if (!isLoggedIn) {
    redirect("/login");
  }


  

  return (
    <div className="min-h-screen flex flex-wrap items-center justify-center">

    <ClientsComponent/>
    </div>
  );
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
