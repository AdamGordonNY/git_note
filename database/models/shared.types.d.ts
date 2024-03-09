import { Schema } from "mongoose";

import { IUser } from "@/database/user.model";

import { ITag } from "@/database/tag.model"; // Import the missing 'ITag' interface
import { IPost } from "@/database/post.model"; // Import the missing 'IPost' interface
export interface SearchParams {
  query: string;
  type?: string | null;
}
export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string; // Add searchQuery parameter
}
export interface CreateUserParams {
  email: string;
  password: string;
  fullname: string;
}
export interface UpdateUserParams {
  _id: Schema.Types.ObjectId;
  updateData: Partial<IUser>;
  path: string;
}
export interface DeleteUserParams {
  _id: string;
}
export interface createNewTagParams {
  name: string;
  postId: Schema.Types.ObjectId[];
  userId: Schema.Types.ObjectId[];
}
export interface GetTagByPostIdParams {
  postId: Schema.Types.ObjectId[];
  name: string;
}
export interface GetTagByUserIdParams {
  userId: Schema.Types.ObjectId[];
  name: string;
}
export interface GetTagByNameParams {
  name: string;
}
export interface UpdateTagParams {
  _id: Schema.Types.ObjectId;
  updateData: Partial<ITag>;
  path: string;
}
export interface DeleteTagParams {
  _id: string;
}
export interface createNewPostParams {
  title: string;
  body: string;
  author: string;
  postType: string;
  tags: string[];
  resourceLink: {
    label: string;
    url: string;
  };
}
export interface GetPostByIdParams {
  postId: string;
}
export interface UpdatePostParams {
  postId: string;
  updateData: Partial<IPost>;
  path: string;
}
export interface DeletePostParams {
  postId: string;
}
export interface GetPostByTagParams {
  tag: string;
}

export interface GetPostByAuthorParams {
  author: string;
}
export interface GetPostByTypeParams {
  type: string;
}
export interface GetPostByResourceLinkParams {
  url: string;
}
export interface GetPostByQueryParams {
  query: string;
}
