"use server";
import dbConnect from "@/database/dbConnect";
import Interaction from "@/database/models/interaction.model";
import Post from "@/database/models/post.model";

export async function viewPost({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) {
  try {
    await dbConnect();
  } catch (error) {}
  const interaction = new Interaction({
    user: userId,
    action: "view",
    post: postId,
    createdAt: new Date(),
  });

  await interaction.save();
}
