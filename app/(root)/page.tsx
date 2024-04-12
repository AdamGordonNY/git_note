import SignOutButton from "@/components/auth/SignOutButon";
import { getAllPosts } from "@/lib/actions/post.actions";

import { getOneUser } from "@/lib/actions/user.actions";
import { getSession } from "@/lib/authOptions";

import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  let mongoUser;

  if (session) {
    mongoUser = await getOneUser(session.user?.email ?? "");
  }
  const posts = getAllPosts({
    page: 1,
    pageSize: 10,
    filter: "all",
    searchQuery: "",
  });
  if (posts) {
    console.log(posts);
  }

  return (
    <main className="flex-center flex w-full text-white-300">
      <div>
        {" "}
        <SignOutButton />
        <Link href={`/profile/`}>
          <button className="heading-2-bold  bg-primary size-[200px]">
            Profile
          </button>
        </Link>
      </div>
      <div>
        <h2 className="display-2-bold">All Posts</h2>
        <section className="flex w-full flex-col">
          {/* <AllPosts posts={cleanPosts?.posts!} /> */}
        </section>
      </div>
    </main>
  );
}
