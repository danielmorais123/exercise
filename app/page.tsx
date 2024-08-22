import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FileType, Post, User } from "@/lib/types";
import { promises as fs } from "fs";
import CardPost from "@/components/card-post";
import MyDialog from "@/components/mydialog";
import { signOut } from "@/lib/actions";
import ThemeSwitcher from "./ThemeSwitcher";
export default async function Home() {
  const cookieStore = cookies();
  const cookieEmail = cookieStore.get("email");
  if (!cookieEmail?.value) {
    redirect("/auth/login");
  }

  // const fileRead = await fs.readFile(process.cwd() + "/db/data.json", "utf8");
  // const file: FileType = JSON.parse(fileRead);
  const promisePosts = await fetch("http://localhost:5000/posts");
  const promiseUsers = await fetch("http://localhost:5000/users");
  const resUsers = promiseUsers.json();
  const resPosts = promisePosts.json();
  const [users, posts]: [users: User[], posts: Post[]] = await Promise.all([
    resUsers,
    resPosts,
  ]);

  console.log({ users, posts });
  // const { posts, users } = file;

  console.log(cookieEmail);
  const user: User | undefined = users.find(
    (x: User) => x.email === cookieEmail?.value
  );

  const postsFromUser: Post[] = posts.filter(
    (x: Post) => x.userId === user?.id
  );

  return (
    <div className="min-h-screen p-2  gap-2 flex flex-col justify-center items-center">
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <form action={signOut}>
          {" "}
          <button
            type="submit"
            className="w-fit bg-yellow-300 text-black py-2 px-4 rounded-md text-sm"
          >
            Sign Out
          </button>
        </form>

        <MyDialog user={user} />
      </div>
      <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto px-2">
        {postsFromUser.map((post, idx) => (
          <CardPost
            key={idx}
            title={post.title}
            description={post.text}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}
