"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { savePost } from "@/lib/actions";
import { User } from "@/lib/types";
import { useToast } from "./ui/use-toast";
import { useState } from "react";

export default function MyDialog({ user }: { user: User }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-fit bg-yellow-300 text-black py-2 px-4 rounded-md text-sm">
        Adicionar Post
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Post</DialogTitle>
          <DialogDescription>Adicionar Post</DialogDescription>
        </DialogHeader>
        <form
          action={async (formData) => {
            await savePost(formData);
            setOpen(false);
            // console.log(code)
            // if (code == 200) {
            //   toast({
            //     title: "Sucesso",
            //     description: "Sucesso",
            //   });
            // } else {
            //   toast({
            //     title: "Erro",
            //     description: "Erro ao adicionar post",
            //   });
            // }
          }}
        >
          <div className="grid gap-4 py-4">
            <Input
              id="userId"
              name="userId"
              defaultValue={user?.id}
              className="hidden"
            />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="titulo" className="text-right">
                Titulo
              </Label>
              <Input id="titulo" name="titulo" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descricao" className="text-right">
                Descrição
              </Label>
              <Input name="descricao" id="descricao" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
