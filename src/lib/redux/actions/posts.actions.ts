import { postsTypes } from "../action-types";
import { IPosts } from "../types/posts";

const postsRequired = (params: IPosts.RequiredParams) => {
  return {
    type: postsTypes.POSTS_REQUIRED,
    payload: params,
  };
};

const postsSuccess = (posts: IPosts.Response[]) => {
  return {
    type: postsTypes.POSTS_SUCCESS,
    payload: posts,
  };
};

const postsFailed = (error: IPosts.Error) => {
  return {
    type: postsTypes.POSTS_FAILED,
    payload: error,
  };
};

export const postsActions = {
  postsRequired,
  postsSuccess,
  postsFailed,
};
