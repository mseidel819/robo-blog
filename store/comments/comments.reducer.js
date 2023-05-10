import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const INITIAL_STATE = {
  comments: null,
};

const scoreChanger = (comments, update) => {
  const { id, newScore } = update;

  const newComments = comments.map((comment) => {
    return comment._id === id ? { ...comment, score: newScore } : comment;
  });
  return newComments;
};

const addComment = (comments, newComment) => {
  return [...comments, newComment];
};

const removeComment = (comments, currentId) => {
  const filteredComments = comments.filter((comment) => {
    return comment._id !== currentId;
  });

  return filteredComments;
};

const editComment = (comments, payload) => {
  const { id, newContent } = payload;

  const newComments = comments.map((comment) => {
    return comment._id === id ? { ...comment, content: newContent } : comment;
  });
  return newComments;
};

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
    changeScore(state, action) {
      state.comments = scoreChanger(state.comments, action.payload);
    },
    commentRemoved(state, action) {
      state.comments = removeComment(state.comments, action.payload);
    },
    commentEdited(state, action) {
      state.comments = editComment(state.comments, action.payload);
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.comments,
      };
    },
  },
});

export const {
  setComments,
  addToComments,
  changeScore,
  commentRemoved,
  commentEdited,
} = commentsSlice.actions;

export const commentsReducer = commentsSlice.reducer;
