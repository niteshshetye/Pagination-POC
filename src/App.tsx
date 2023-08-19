/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";
import { postsActions } from "./lib/redux/actions";
import { PaginationParams } from "./config/config";
import { useDispatch } from "react-redux";
import { AppDispatch, AppState } from "./lib/redux/store";
import { useSelector } from "react-redux";
import { IPosts } from "./lib/redux/types/posts.modal";
import { getScreenItemLimit } from "./utils";
import "./App.css";

const RESIZE = "resize";

const App = () => {
  const { posts, loading, error, pagination } = useSelector(
    (state: AppState) => state.posts
  );
  const dispatch: AppDispatch = useDispatch();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchPosts = useCallback(
    (params: IPosts.RequiredParams) => {
      dispatch(postsActions.postsRequired(params));
    },
    [dispatch]
  );

  const loadData = useCallback(
    (direction?: IPosts.ScrollDirection) => {
      const limit = getScreenItemLimit();
      const params = {
        [PaginationParams.page]: `${pagination.page}`,
        [PaginationParams.limit]: `${limit}`,
        direction: direction || IPosts.ScrollDirection.NONE,
      };

      dispatch(postsActions.postsChangesLimit(limit));

      fetchPosts(params);
    },
    [dispatch, fetchPosts, pagination.page]
  );

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const handleScreenResize = () => {
      if (debounceRef.current) {
        console.warn("timer clear");
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        console.warn("timer start");
        loadData();
      }, 500);
    };

    window.addEventListener(RESIZE, handleScreenResize);

    return () => {
      window.removeEventListener(RESIZE, handleScreenResize);
    };
  }, [loadData]);

  const handleScrollWindow = (event: any) => {
    let currentPosition = event.target.scrollTop + event.target.offsetHeight;
    let maxScrollSize = event.target.scrollHeight;

    if (
      currentPosition >= maxScrollSize - 2 &&
      pagination.totalPages > pagination.page
    ) {
      console.warn("scroll: going to reach end");
      const params = {
        [PaginationParams.page]: `${pagination.page + 1}`,
        [PaginationParams.limit]: `${pagination.limit}`,
        direction: IPosts.ScrollDirection.DOWN,
      };

      dispatch(postsActions.postsChangesPage(pagination.page + 1));

      fetchPosts(params);
    }
  };

  if (error.isError) {
    return (
      <div className="error-contianer">
        <h2 className="error-msg">{error.msg}</h2>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="main-header">
        <h1>My Posts</h1>
      </div>
      <div className="main-list" onScroll={handleScrollWindow}>
        {loading ? (
          <h2>Loading...!</h2>
        ) : (
          posts.map((post: IPosts.Response) => {
            return (
              <div className="post-card" key={post.id}>
                <h3>
                  {post.id}. {post.title}
                </h3>
                <p>{post.body}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default App;
