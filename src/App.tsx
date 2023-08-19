import { useCallback, useEffect } from "react";
import { postsActions } from "./lib/redux/actions";
import { PaginationParams } from "./config/config";
import { useDispatch } from "react-redux";
import { AppDispatch, AppState } from "./lib/redux/store";
import { useSelector } from "react-redux";
import { IPosts } from "./lib/redux/types/posts";

const App = () => {
  const { posts, loading, error, pagination } = useSelector(
    (state: AppState) => state.posts
  );
  const dispatch: AppDispatch = useDispatch();

  const fetchPosts = useCallback(() => {
    dispatch(
      postsActions.postsRequired({
        [PaginationParams.page]: `${pagination.page}`,
        [PaginationParams.limit]: `${pagination.limit}`,
      })
    );
  }, [dispatch, pagination.limit, pagination.page]);

  useEffect(() => {
    fetchPosts();
  }, []);

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
      <div className="main-list">
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
