import { IUser } from "@/database/models/user.model";
import { Schema } from "mongoose";
import { IPost } from "@/database/models/post.model";
import { ITag } from "@/database/models/tag.model";

export interface UpdateUserParams {
  _id: Schema.Types.ObjectId;
  updateData: Partial<IUser>;
  path: string;
}

export interface UpdatePostParams {
  _id: Schema.Types.ObjectId;
  updateData: Partial<IPost>;
  path: string;
}
export interface UpdateTagParams {
  _id: Schema.Types.ObjectId;
  updateData: Partial<ITag>;
  path: string;
}

export interface GetPostParams {
  page: number;
  pageSize: number;
  filter?: string;
  searchQuery?: string;
}
export interface GetTagParams {
  page: number;
  pageSize: number;
  _id?: Schema.Types.ObjectId;
  name?: string;
}
export interface CreateNewPostParams {
  title: string;
  body: string;
  author: string;
  postType: string;
  tags: Schema.Types.ObjectId[];
  resourceLink?: {
    label: string;
    url: string;
  };
}
