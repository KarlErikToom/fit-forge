// app/login/page.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RegisterForm } from "./RegisterForm";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token =  cookieStore.get("token")?.value;

  // Replace this with your token validation logic or API call
  const isLoggedIn = await validateToken(token);

  if (isLoggedIn) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

    <RegisterForm />
    </div>
  );
}

async function validateToken(token) {
  if (!token) return false;

  try {
    const res = await fetch("http://localhost:5000/api/auth/check", {
      headers: {
        cookie: `token=${token}`,  // pass token in cookie header for SSR fetch
      },
      cache: "no-store", // ensure fresh validation on every request
    });

    if (!res.ok) return false;

    const data = await res.json();
    return data.loggedIn;
  } catch (err) {
    console.error("Auth check failed", err);
    return false;
  }
}
