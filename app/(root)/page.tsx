import SignOutButton from "@/components/auth/SignOutButon";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="text-white-100">
      <SignOutButton />
    </main>
  );
}
