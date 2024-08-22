"use server";

import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const path = process.cwd() + "/db/data.json";
export async function getData() {
  return await fs.readFile(path, "utf8");
}

export async function savePost(form: FormData) {
  const title = String(form.get("titulo"));
  const description = String(form.get("descricao"));
  const userId = String(form.get("userId"));

  try {
    // Read the existing data from the JSON file
    const jsonData = await fs.readFile(path);
    /*@ts-ignore */
    const objectData = JSON.parse(jsonData);

    console.log(objectData.posts);
    // Get the data from the request body

    // Add the new data to the object
    const newData = {
      userId,
      postedAt: new Date().toISOString(),
      title,
      text: description,
    };
    objectData?.posts.push(newData);

    // Convert the object back to a JSON string
    const updatedData = JSON.stringify(objectData);

    // Write the updated data to the JSON file
    await fs.writeFile(path, updatedData);

    // Send a success response
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
}

export async function signOut() {
  const cookieStore = cookies();
  cookieStore.delete("email");

 redirect("/");
}
