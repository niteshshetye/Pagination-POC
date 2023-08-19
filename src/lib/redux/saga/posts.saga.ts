import { postsTypes } from "../action-types";
import { postsActions } from "./../actions";
import { put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { ApiConfig } from "../../../config/config";
import { IPosts } from "../types/posts.modal";

const fetchPosts = (params: Omit<IPosts.RequiredParams, "direction">) =>
  axios.get(`${ApiConfig.BASE_URL}${ApiConfig.POSTS}`, { params });

function* workerPosts(action: ReturnType<typeof postsActions.postsRequired>) {
  const { direction, ...params } = action.payload;
  try {
    const { data }: AxiosResponse<IPosts.Response[]> = yield fetchPosts(params);
    yield put(postsActions.postsSuccess({ posts: data, direction }));
  } catch (error: any) {
    console.error(error?.response);
    yield put(
      postsActions.postsFailed({ isError: true, msg: "Something went Wrong!" })
    );
  }
}

export function* watchPosts() {
  yield takeLatest(postsTypes.POSTS_REQUIRED, workerPosts);
}
