import { combineReducers } from "@reduxjs/toolkit";
import { commentsReducer } from "./comments/comments.reducer";

export const rootReducer = combineReducers({
  comments: commentsReducer,
});
