"use server";
import Post, { IPost } from "@/database/models/post.model";

import dbConnect from "@/database/dbConnect";
import { FilterQuery } from "mongoose";

import {
  CreateNewPostParams,
  DeletePostParams,
  GetPostParams,
  GetTagByPostIdParams,
  UpdatePostParams,
} from "./shared.types";
import { getSession } from "../authOptions";
import { getOneUser } from "./user.actions";

export const getUniqueTags = async () => {
  try {
    const uniqueTags = await Post.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: null, tags: { $addToSet: "$tags" } } },
      { $project: { tags: 1, _id: 0 } },
    ]);
    if (uniqueTags.length > 0) {
      return uniqueTags[0].tags;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error retrieving tags", error);
  }
};
// just using basic crud funcitons for now
export const getAllPosts = async (params: GetPostParams) => {
  try {
    await dbConnect();
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<IPost> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }
    let sortOptions = {};

    switch (filter) {
      case "components":
        query.postType = "components";
        sortOptions = { createdAt: -1 };
        break;
      case "knowledge":
        query.postType = "knowledge";
        sortOptions = { createdAt: -1 };
        break;
      case "workflow":
        query.postType = "workflows";
        sortOptions = { createdAt: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
        break;
    }
    // const totalPosts = await Post.countDocuments(query);

    const filteredPosts = await Post.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);
    // const isNext = totalPosts > skipAmount + Post.length;

    return { posts: filteredPosts as IPost[] };
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = async (postId: GetTagByPostIdParams) => {
  try {
    await dbConnect();
    const post = await Post.findById(postId);
    return post as IPost;
  } catch (error) {
    console.log(error);
  }
};

export const createNewPost = async (data: CreateNewPostParams) => {
  try {
    await dbConnect();
    console.log(data);
    const session = await getSession();
    const userEmail = session?.user?.email;
    if (!userEmail) {
      return false;
    }
    const user = await getOneUser(userEmail);
    const userId = user?._id;

    const post = await Post.create({
      title: data.title,
      description: data.description,
      content: data.content,
      code: data.code,
      author: userId,
      postType: data.postType,
      tags: data.tags,
      resourceLinks: data.resourceLinks,
      experiences: data.experiences,
    });

    if (post) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updatePost = async ({ _id, updateData }: UpdatePostParams) => {
  try {
    await dbConnect();

    const post = await Post.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    return post as IPost;
  } catch (error) {
    console.log(error);
  }
};

export const deletePostById = async (_id: DeletePostParams) => {
  try {
    await dbConnect();
    const deletedPost = await Post.findByIdAndDelete(_id);
    return deletedPost as IPost;
  } catch (error) {
    console.log(error);
  }
};
export const getAllPostTypes = async (params: GetPostParams) => {
  try {
    await dbConnect();
    //   const { posts } = params;
  } catch (error) {
    console.log(error);
  }
};
