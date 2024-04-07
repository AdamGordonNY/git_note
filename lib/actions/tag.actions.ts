"use server";
import dbConnect from "@/database/dbConnect";
import {
  GetTagByPostIdParams,
  UpdateTagParams,
  CreateNewTagParams,
} from "@/lib/actions/shared.types";
import Tag, { ITag } from "@/database/models/tag.model";

export const createNewTag = async (data: CreateNewTagParams) => {
  try {
    await dbConnect();
    const tag = await Tag.create({
      name: data.name,
      postId: data.postId,
    });
    if (tag) return true;
  } catch (error) {
    return false;
  }
};
export const updateTag = async (params: UpdateTagParams) => {
  try {
    await dbConnect();
    const { _id, updateData } = params;
    await Tag.findOneAndUpdate({ _id }, updateData);
  } catch (error) {
    console.log(error);
  }
};
export const getAllTags = async () => {
  try {
    await dbConnect();
    const tags = await Tag.find();
    return tags as ITag[];
  } catch (error) {
    console.log(error);
  }
};
export const getTagByPostId = async ({ postId }: GetTagByPostIdParams) => {
  try {
    await dbConnect();
    const tags = await Tag.find({ postId });
    return tags as ITag[];
  } catch (error) {
    console.log(error);
  }
};
export const getTagById = async ({ _id }: { _id: string }) => {
  try {
    await dbConnect();
    const tag = await Tag.findById(_id);
    return tag as ITag;
  } catch (error) {
    console.log(error);
  }
};
export const getTagByName = async ({ name }: { name: string }) => {
  try {
    await dbConnect();
    const tag = await Tag.findOne({ name });
    return tag as ITag;
  } catch (error) {
    console.log(error);
  }
};
