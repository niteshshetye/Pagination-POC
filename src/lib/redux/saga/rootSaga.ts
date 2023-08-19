import { all, fork } from "redux-saga/effects";
import { watchPosts } from "./posts.saga";

export function* rootSaga() {
  yield all([fork(watchPosts)]);
}
