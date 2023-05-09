import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  comments: null,
};

//////////////////////////////////////////////////////////////////////////////////
const increaseScore = (comments, commentId) => {
  const newComments = comments.map((comment) => {
    return comment.id === commentId
      ? { ...comment, score: comment.score + 1 }
      : comment;
  });
  return newComments;
};

//////////////////////////////////////////////////////////////////////////////////
const decreaseScore = (comments, commentId) => {
  const newComments = comments.map((comment) => {
    return comment.id === commentId
      ? { ...comment, score: comment.score - 1 }
      : comment;
  });

  return newComments;
};
//////////////////////////////////////////////////////////////////////////////////
const addComment = (comments, newComment) => {
  return [...comments, newComment];
};
//////////////////////////////////////////////////////////////////////////////////
const removeComment = (comments, currentId) => {
  const filteredComments = comments.filter((comment) => {
    return comment.id !== currentId;
  });

  return filteredComments;
};

//////////////////////////////////////////////////////////////////////////////////
const editComment = (comments, content, user) => {
  const newComment = {
    ...user,
    content: content,
  };

  const targetComment = comments.find((comment) => comment.id === user.id);

  return [
    ...comments.filter((comment) => comment.id !== targetComment?.id),
    newComment,
  ];
};

export const commentEdited = (comments, content, user) => {
  const edit = editComment(comments, content, user);
  // return createAction(COMMENTS_ACTION_TYPES.SET_COMMENTS, edit);
};
//////////////////////////////////////////////////////////////////////////////////
//
//////////////////////////////////////////////////////////////////////////////////

export const commentsSlice = createSlice({
  name: "comments",
  initialState: INITIAL_STATE,
  reducers: {
    setComments(state, action) {
      state.comments = action.payload;
    },
    addToComments(state, action) {
      state.comments = addComment(state.comments, action.payload);
    },
    scoreIncreased(state, action) {
      state.comments = increaseScore(state.comments, action.payload);
    },
    scoreDecreased(state, action) {
      state.comments = decreaseScore(state.comments, action.payload);
    },
    commentRemoved(state, action) {
      state.comments = removeComment(state.comments, action, payload);
    },
  },
});

export const { setComments, addToComments, scoreIncreased, scoreDecreased } =
  commentsSlice.actions;

export const commentsReducer = commentsSlice.reducer;
