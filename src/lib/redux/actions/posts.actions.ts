import { postsTypes } from "../action-types";
import { IPosts } from "../types/posts.modal";

const postsRequired = (params: IPosts.RequiredParams) => {
  return {
    type: postsTypes.POSTS_REQUIRED,
    payload: params,
  };
};

const postsSuccess = ({
  direction,
  posts,
}: {
  direction: IPosts.ScrollDirection;
  posts: IPosts.Response[];
}) => {
  return {
    type: postsTypes.POSTS_SUCCESS,
    payload: { direction, posts },
  };
};

const postsFailed = (error: IPosts.Error) => {
  return {
    type: postsTypes.POSTS_FAILED,
    payload: error,
  };
};

const postsChangesPage = (page: number) => {
  return {
    type: postsTypes.POSTS_PAGINATION_PAGE,
    payload: page,
  };
};

const postsChangesLimit = (limit: number) => {
  return {
    type: postsTypes.POSTS_PAGINATION_LIMIT,
    payload: limit,
  };
};

export const postsActions = {
  postsRequired,
  postsSuccess,
  postsFailed,
  postsChangesPage,
  postsChangesLimit,
};
