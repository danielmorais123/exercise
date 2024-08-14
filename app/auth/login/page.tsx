import Login from "@/components/Login";
import { FileType } from "@/lib/types";
import { promises as fs } from "fs";

export default async function page() {
  const fileRead = await fs.readFile(process.cwd() + "/db/data.json", "utf8");
  const file: FileType = JSON.parse(fileRead);
  const { users } = file;

  return <Login users={users} />;
}
