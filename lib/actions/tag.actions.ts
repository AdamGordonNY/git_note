import dbConnect from "@/database/dbConnect";
import {
  GetTagByPostIdParams,
  GetTagByUserIdParams,
  UpdateTagParams,
  createNewTagParams,
} from "@/database/models/shared.types";
import tagModel, { ITag } from "@/database/models/tag.model";
import { revalidatePath } from "next/cache";

export const getTagByPostAndUserId = async ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) => {
  try {
    await dbConnect();
    const tag = await tagModel.find({ user: userId, post: postId });
    return tag as ITag[];
  } catch (error) {
    console.log(error);
  }
};

export const createNewTag = async (data: createNewTagParams) => {
  try {
    await dbConnect();
    const tag = await tagModel.create({
      name: data.name,
      posts: data.postId,
      users: data.userId,
    });

    return tag;
  } catch (error) {
    console.log(error);
  }
};
export const updateTag = async (params: UpdateTagParams) => {
  try {
    await dbConnect();
    const { _id, updateData, path } = params;
    await tagModel.findOneAndUpdate(_id, updateData);
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};
export const getTagByUserId = async ({ userId }: GetTagByUserIdParams) => {
  try {
    await dbConnect();
    const tags = await tagModel.find({ users: userId });
    return tags as ITag[];
  } catch (error) {
    console.log(error);
  }
};
export const getTagByPostId = async ({ postId }: GetTagByPostIdParams) => {
  try {
    await dbConnect();
    const tags = await tagModel.find({ posts: postId });
    return tags as ITag[];
  } catch (error) {
    console.log(error);
  }
};
export const getTagById = async ({ _id }: { _id: string }) => {
  try {
    await dbConnect();
    const tag = await tagModel.findById(_id);
    return tag as ITag;
  } catch (error) {
    console.log(error);
  }
};
