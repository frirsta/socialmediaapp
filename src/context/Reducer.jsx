export const postActions = {
  SUBMIT_POST: "SUBMIT_POST",
  HANDLE_ERROR: "HANDLE_ERROR",
  ADD_LIKE: "ADD_LIKE",
  ADD_COMMENT: "ADD_COMMENT",
  ADD_BOOKMARK: "ADD_BOOKMARK",
};

export const postState = {
  error: false,
  posts: [],
  comments: [],
  likes: [],
  bookmarks: [],
};

export const Reducer = (state, action) => {
  switch (action.type) {
    case postActions.SUBMIT_POST:
      return {
        ...state,
        error: false,
        posts: action.posts,
      };
    case postActions.HANDLE_ERROR:
      return {
        ...state,
        error: true,
        posts: [],
      };
    case postActions.ADD_LIKE:
      return {
        ...state,
        error: false,
        likes: action.likes,
      };
    case postActions.ADD_BOOKMARK:
      return {
        ...state,
        error: false,
        bookmarks: action.bookmarks,
      };
    case postActions.ADD_COMMENT:
      return {
        ...state,
        error: false,
        comments: action.comments,
      };
    default:
      return state;
  }
};
