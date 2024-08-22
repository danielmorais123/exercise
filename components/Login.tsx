"use client";

import ThemeSwitcher from "@/app/ThemeSwitcher";
import { Input } from "@/components/ui/input";
import { User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
export default function Login({ users }: { users: User[] }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const { toast } = useToast();

  async function login() {
    const user = users.find(
      (x) => x.email === email && x.password === password
    );

    if (!user) {
      toast({
        title: "Utilizador não Encontrado",
        description:
          "Não foi encontrado nenhum utilizador com esse email e password",
      });

      setEmail("");
      setPassword("");
      return;
    }
    const r = await fetch("http://localhost:3000/cookie/email", {
      method: "post",
      body: JSON.stringify(email),
    });
    const response = await r.json();

    if (!response?.sucess) {
      toast({
        title: "Erro",
        description: "Erro ao guardar a sua sessão",
      });
    } else {
      router.push("/");
    }
  }
  return (
    <div className="min-h-screen  flex flex-col gap-2 p-2">
      <div className="flex justify-end">
        <ThemeSwitcher />
      </div>
      <div className=" justify-center items-center flex-grow flex gap-2">
        <div className="border w-[350px] h-[400px] justify-center p-10 dark:border-zinc-800 rounded-xl bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border-zinc-100 flex flex-col gap-3">
          <p className="text-2xl font-bold">Welcome back</p>

          <form className="flex flex-col gap-3">
            <div className="text-sm flex-col gap-1 flex">
              <label htmlFor="email">Email</label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
                type="email"
              />
            </div>
            <div className="text-sm flex-col gap-1 flex">
              <label htmlFor="password">Password</label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                id="password"
                type="password"
              />
            </div>
            <button
              className="bg-blue-500 text-white text-sm py-2 rounded-md"
              type="button"
              onClick={login}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
