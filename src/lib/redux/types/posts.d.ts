import { PaginationParams } from "../../../config/config";
import { postsActions } from "../actions";

export namespace IPosts {
  export interface State {
    loading: boolean;
    posts: Response[];
    error: Error;
    pagination: IPagination;
  }

  export interface RequiredParams {
    [PaginationParams.page]: string;
    [PaginationParams.limit]: string;
  }

  interface Response {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

  interface Error {
    isError: boolean;
    msg: string;
  }
  interface IPagination {
    page: number;
    limit: number;
  }

  type IPostsActions =
    | postsActions.postsRequired
    | postsActions.postsSuccess
    | postsActions.postsFailed;
}
