import { combineReducers } from "@reduxjs/toolkit";
import { postsReducer } from "./posts.reducer";

export const rootReducer = combineReducers({
  posts: postsReducer,
});
