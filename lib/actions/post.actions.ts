import postModel, { IPost } from "@/database/models/post.model";
import { revalidatePath } from "next/cache";
import dbConnect from "@/database/dbConnect";
import { FilterQuery } from "mongoose";

// just using basic crud funcitons for now
export const getAllPosts = async (params: any) => {
  try {
    await dbConnect();
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof postModel> = {};
    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }
    let sortOptions = {};

    switch (filter) {
      case "userId":
        sortOptions = { questions: -1 };
        break;
      case "postId":
        sortOptions = { createdAt: -1 };
        break;

      default:
        break;
    }
    const totalPosts = await postModel.countDocuments(query);

    const posts = await postModel
      .find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);
    const isNext = totalPosts > skipAmount + postModel.length;

    return { posts: posts as IPost[], isNext };
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = async (postId: string) => {
  try {
    await dbConnect();
    const post = await postModel.findById(postId);
    return post as IPost;
  } catch (error) {
    console.log(error);
  }
};

type createNewPostParams = {
  title: string;
  body: string;
  author: string;
  postType: string;
  tags: string[];
  resourceLink: {
    label: string;
    url: string;
  };
};

export const createNewPost = async (data: createNewPostParams) => {
  try {
    await dbConnect();
    const post = await postModel.create({
      title: data.title,
      body: data.body,
      author: data.author,
      postType: data.postType,
      tags: data.tags,
      resourceLink: data.resourceLink,
    });

    return post;
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = async (
  postId: string,
  updateData: Partial<IPost>,
  path: string
) => {
  try {
    await dbConnect();

    const post = await postModel.findByIdAndUpdate(postId, updateData, {
      new: true,
    });
    revalidatePath(path);
    return post as IPost;
  } catch (error) {
    console.log(error);
  }
};
export const deletePostById = async (postId: string) => {
  try {
    await dbConnect();
    const deletedPost = await postModel.findByIdAndDelete(postId);
    return deletedPost as IPost;
  } catch (error) {
    console.log(error);
  }
};
