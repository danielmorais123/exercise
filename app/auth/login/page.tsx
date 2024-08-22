import Login from "@/components/Login";
import { FileType, User } from "@/lib/types";
import { promises as fs } from "fs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const cookieStore = cookies();
  const cookieEmail = cookieStore.get("email");
  if (cookieEmail?.value) {
    console.log("VALIDA")
    redirect("/");
  }
  const promiseUsers = await fetch("http://localhost:5000/users");
  const users: User[] = await promiseUsers.json();

  console.log(users)

  return <Login users={users} />;
}
