import { postsTypes } from "../action-types";
import { IPosts } from "../types/posts.modal";
import { calculateTotalPages } from "../../../utils";
import { AnyAction } from "@reduxjs/toolkit";

const error: IPosts.Error = {
  isError: false,
  msg: "",
};

const paginationInitialState: IPosts.IPagination = {
  page: 1,
  limit: 5,
  totalItem: 100,
  totalPages: 0,
};

const postInitialState: IPosts.State = {
  loading: false,
  posts: [],
  error,
  pagination: paginationInitialState,
};

export const postsReducer = (
  state: IPosts.State = postInitialState,
  action: AnyAction
): IPosts.State => {
  switch (action.type) {
    case postsTypes.POSTS_REQUIRED:
      return {
        ...state,
        loading: state.posts.length === 0 ? true : false,
      };

    case postsTypes.POSTS_SUCCESS:
      const { posts } = action.payload;
      const newList = [...state.posts, ...posts];
      return {
        ...state,
        loading: false,
        error,
        posts: newList,
      };

    case postsTypes.POSTS_FAILED:
      return {
        ...state,
        posts: [],
        error: action.payload,
      };
    case postsTypes.POSTS_PAGINATION_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload,
        },
      };

    case postsTypes.POSTS_PAGINATION_LIMIT:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          limit: action.payload,
          totalPages: calculateTotalPages(
            action.payload,
            state.pagination.totalItem
          ),
        },
      };

    default:
      return state;
  }
};
