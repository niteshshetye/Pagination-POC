import { postsTypes } from "../action-types";
import { IPosts } from "../types/posts";

const error: IPosts.Error = {
  isError: false,
  msg: "",
};

const pagination: IPosts.IPagination = {
  page: 1,
  limit: 5,
};

const postInitialState: IPosts.State = {
  loading: false,
  posts: [],
  error,
  pagination,
};

export const postsReducer = (
  state: IPosts.State = postInitialState,
  action: IPosts.IPostsActions
): IPosts.State => {
  switch (action.type) {
    case postsTypes.POSTS_REQUIRED:
      return {
        ...state,
        loading: true,
      };

    case postsTypes.POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error,
        posts: action.payload,
        pagination: {
          page: state.pagination.page + 1,
          limit: state.pagination.limit,
        },
      };

    case postsTypes.POSTS_FAILED:
      return {
        ...state,
        posts: [],
        error: action.payload,
      };

    default:
      return state;
  }
};
