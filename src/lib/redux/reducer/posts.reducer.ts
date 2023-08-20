import { postsTypes } from "../action-types";
import { IPosts } from "../types/posts.modal";
import { calculateTotalPages, calculateWindowSize } from "../../../utils";
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
  windowSize: 0,
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
      const { posts, direction = IPosts.ScrollDirection.NONE } =
        action.payload as {
          posts: IPosts.Response[];
          direction: IPosts.ScrollDirection;
        };
      let newList: IPosts.Response[] = [];
      if (state.pagination.windowSize <= state.posts.length) {
        newList = [...state.posts];
        switch (direction) {
          case IPosts.ScrollDirection.DOWN:
            newList = [...newList, ...posts];
            newList.splice(0, posts.length);
            break;
          case IPosts.ScrollDirection.UP:
            newList = [...posts, ...newList];
            newList.splice(
              newList.length - state.pagination.limit,
              newList.length
            );
            break;
        }
      } else {
        newList = [...state.posts, ...posts];
      }

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
      const currentLimit: number = action.payload;
      return {
        ...state,
        pagination: {
          ...state.pagination,
          limit: currentLimit,
          totalPages: calculateTotalPages(
            currentLimit,
            state.pagination.totalItem
          ),
          windowSize: calculateWindowSize(currentLimit),
        },
      };

    default:
      return state;
  }
};
