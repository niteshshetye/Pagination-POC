import { postsTypes } from "../action-types";
import { postsActions } from "./../actions";
import { put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { apiConfig } from "../../../config/config";
import { IPosts } from "../types/posts";

const fetchPosts = (params: IPosts.RequiredParams) =>
  axios.get(`${apiConfig.BASE_URL}${apiConfig.POSTS}`, { params });

function* workerPosts(action: ReturnType<typeof postsActions.postsRequired>) {
  try {
    const { data }: AxiosResponse<IPosts.Response[]> = yield fetchPosts(
      action.payload
    );
    yield put(postsActions.postsSuccess(data));
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
