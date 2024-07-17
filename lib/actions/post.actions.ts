"use server";
import Post, { IPost } from "@/database/models/post.model";

import dbConnect from "@/database/dbConnect";
import mongoose, { FilterQuery } from "mongoose";

import {
  CreateNewPostParams,
  DeletePostParams,
  GetPostParams,
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
      case "component":
        query.postType = "component";
        sortOptions = { createdAt: -1 };
        break;
      case "knowledge":
        query.postType = "knowledge";
        sortOptions = { createdAt: -1 };
        break;
      case "workflow":
        query.postType = "workflow";
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

export const getPostById = async (_id: string) => {
  try {
    await dbConnect();
    const post = await Post.findById(_id);
    return post as IPost;
  } catch (error) {
    console.log(error);
  }
};
export const fetchPost = async (_id: string) => {
  try {
    await dbConnect();
    const post = await Post.findOne({ _id });

    return post as IPost;
  } catch (error) {
    console.log(error);
  }
};
export const getRecentPosts = async () => {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ createdAt: -1 }).limit(10);
    return posts as IPost[];
  } catch (error) {
    console.log(error);
  }
};
export const createNewPost = async ({ post }: CreateNewPostParams) => {
  try {
    await dbConnect();

    const session = await getSession();
    const userEmail = session?.user?.email;
    if (!userEmail) {
      return false;
    }
    const user = await getOneUser(userEmail);
    const userId = user?._id;
    const {
      title,
      description,
      content,
      code,
      postType,
      tags,
      resourceLinks,
      experiences,
      image,
    } = post;
    if (postType === undefined) {
      return false;
    }
    if (postType === "component") {
      const post = await Post.create({
        title,
        description,
        content,
        code,
        author: userId,
        postType,
        tags,
        resourceLinks,
        experiences,
        image,
      });
      if (post) return true;
    } else {
      const post = await Post.create({
        title,
        description,
        content,
        author: userId,
        postType,
        tags,
        resourceLinks,
        experiences,
      });
      if (post) return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const filterPostsByType = async ({
  postType,
}: {
  postType: "knowledge" | "component" | "workflow";
}) => {
  try {
    await dbConnect();
    const posts = await Post.find({ postType });
    return posts as IPost[];
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching knowledge posts");
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

export const deletePostById = async ({ _id }: DeletePostParams) => {
  console.log(_id);
  try {
    await dbConnect();
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new Error("Invalid ObjectId");
    }
    const deletedPost = await Post.deleteOne({ _id });
    if (deletedPost) return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    return null;
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
