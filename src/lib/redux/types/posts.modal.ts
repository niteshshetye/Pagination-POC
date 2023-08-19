import { PaginationParams } from "../../../config/config";

export namespace IPosts {
  export interface State {
    loading: boolean;
    posts: Response[];
    error: Error;
    pagination: IPagination;
  }

  export enum ScrollDirection {
    UP = "UP",
    DOWN = "DOWN",
    NONE = "NONE",
  }

  export interface IPagination {
    page: number;
    limit: number;
    totalItem: number;
    totalPages: number;
  }

  export interface RequiredParams {
    [PaginationParams.page]: string;
    [PaginationParams.limit]: string;
    direction: ScrollDirection;
  }

  export interface Response {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

  export interface Error {
    isError: boolean;
    msg: string;
  }
}
