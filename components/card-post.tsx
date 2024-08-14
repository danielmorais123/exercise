import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/lib/types";

export default function CardPost({
  title,
  description,
  user,
}: {
  title: string;
  description: string;
  user: User;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{user.email}</p>
      </CardContent>
      <CardFooter>
        <p>{user.firstName + " " +  user.lastName}</p>
      </CardFooter>
    </Card>
  );
}
