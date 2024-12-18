"use server";
import Post, { IPost } from "@/database/models/post.model";

import dbConnect from "@/database/dbConnect";
import mongoose, { FilterQuery } from "mongoose";

import {
  CreateNewPostParams,
  DeletePostParams,
  UpdatePostParams,
} from "./shared.types";
import { getSession } from "../authOptions";
import { getOneUser } from "./user.actions";
import { revalidatePath } from "next/cache";
import { PostReturnType, PostFetchType } from "@/types";

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
export const getPostCount = async (userId: string) => {
  try {
    await dbConnect();
    const postDates = await Post.find({ userId }).select("createdAt");
    return postDates.map((post) => post.createdAt.toISOString());
  } catch (error) {
    console.log(error);
  }
};
export type SearchParams = {
  page?: string; // Pagination page
  postType?: string; // Post type
  term?: string; // Search term
  tag?: string; // Specific tag
};

export async function getPosts(params: SearchParams) {
  await dbConnect();

  const { page = "1", postType = "all", term, tag } = params;
  const itemsPerPage = 10;

  // Build query
  const query: any = {};

  if (postType && postType !== "all") {
    query.type = postType;
  }

  if (term) {
    query.$or = [
      { title: { $regex: term, $options: "i" } },
      { content: { $regex: term, $options: "i" } },
    ];
  }

  if (tag) {
    query.tags = tag;
  }

  // Fetch posts
  const posts = await Post.find(query)
    .skip((parseInt(page) - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .exec();

  // Return the data
  return posts;
}
export const getAllPosts = async ({
  searchQuery,
  page,
  pageSize,

  filter,
}: PostFetchType): Promise<PostReturnType[]> => {
  try {
    await dbConnect();

    const skipAmount = (page! - 1) * pageSize!;

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

    const filteredPosts = await Post.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize!);
    // const isNext = totalPosts > skipAmount + Post.length;

    return [
      { posts: filteredPosts as IPost[], totalPosts: filteredPosts.length },
    ];
  } catch (error) {
    console.log(error);
    return []; // Add a return statement here
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

export const getRecentPosts = async (limit: number) => {
  try {
    await dbConnect();
    const session = await getSession();
    const user = JSON.parse(
      JSON.stringify(await getOneUser(session?.user?.email!))
    );
    const posts = await Post.find({ userId: user.id! })
      .sort({ createdAt: -1 })
      .limit(limit);
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

export const updatePost = async ({ _id, updateData }: UpdatePostParams) => {
  try {
    await dbConnect();

    const post = await Post.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    console.log(post);
    revalidatePath(`/posts/${_id}`);
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
// export const searchPosts = async (params: GetPostParams) => {
//   try {
//     await dbConnect();
//     const session =await getSession()
//      const user = await getOneUser(session?.user?.email!);
//     const { searchQuery, filter, page = 1, pageSize = 10 } = params;
//     const filterObject: FilterQuery<IPost> = { author: user?.id };
//     const skipAmount = (page - 1) * pageSize;
//        if (searchQuery) {
//          filterObject.$or = [
//            { title: { $regex: new RegExp(searchQuery, "i") } },
//            { content: { $regex: new RegExp(searchQuery, "i") } },
//            { postType: { $regex: new RegExp(searchQuery, "i") } },
//          ];
//        }
//     let sortOptions = {};
//     switch (filter) {
//       case "knowledge":
//         sortOptions = {createdAt: -1};
//         break;
//       case "component":
//         sortOptions = { views: -1 };
//         break;
//       case "workflow":
//        sortOptions = { $size: 0 };
//         break;
//       default:
//         break;
//     }
//     const posts = await Post.find(filterObject).populate("tags").populate('author').sort(sortOptions).skip(skipAmount).limit(pageSize);
//     const totalPosts = await Post.countDocuments(filterObject);
//     const isNext = totalPosts > skipAmount + posts.length;
//     return {
//       posts: JSON.parse(JSON.stringify(posts)) as IPost[],
//       isNext,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };
export async function getFilteredPosts({
  tag,
  createType,
  page = 1,
  postsPerPage = 10,
}: {
  tag?: string;
  createType?: string;
  page: number;
  postsPerPage: number;
}) {
  try {
    await dbConnect();
    const session = await getSession();

    const skipAmount = (page - 1) * postsPerPage;
    const dbUser = await getOneUser(session?.user?.email!);
    const filterObject: FilterQuery<IPost> = { author: dbUser?.id };
    if (tag) {
      const tagToUse = (await Post.find(filterObject.tags)) as string[];
      if (tagToUse) {
        filterObject.tags = tagToUse.filter((t) => t === tag);
      }
    }

    if (createType) {
      filterObject.createType = createType;
    }

    const posts = await Post.find(filterObject)
      .populate("tags")
      .skip(skipAmount)
      .limit(postsPerPage);

    const itemCount = await Post.countDocuments(filterObject);

    return {
      posts: posts as IPost[],
      pageCount: Math.ceil(itemCount / postsPerPage),
    };
  } catch (error) {
    console.log("Error getting posts with tag", error);
  }
}
export const findPostByTag = async (tag: string) => {
  const tagsArray: string[] = [];
  try {
    await dbConnect();
    const session = await getSession();
    const dbUser = await getOneUser(session?.user?.email!);
    const filterObject: FilterQuery<IPost> = {
      author: dbUser?.id,
      tags: { $elemMatch: { $eq: tag } },
    };
    const posts = (await Post.find(filterObject)) as IPost[];

    return JSON.parse(JSON.stringify(posts)) as IPost[];
  } catch (error) {
    console.log("Error querying tags", error);
  }
  return tagsArray;
};
