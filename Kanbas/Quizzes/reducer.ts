import { createSlice } from "@reduxjs/toolkit";
import React, { useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

const initialState = {
  quizzes: [],
  quiz: { name: "New Quiz 123", description: "New Description" },
};


const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addquiz: (state, action) => {
      state.quizzes = [action.payload, ...state.quizzes] as typeof state.quizzes;
    },
    setquizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    deletequiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz: any) => quiz._id !== action.payload
      );
    },
    updatequiz: (state: { quizzes: any[]; quiz: { name: string; description: string; }; }, action) => {
      state.quizzes = state.quizzes.map((quiz: any) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    setquiz: (state, action) => {
      state.quiz = action.payload;
    },
  },
});


export const { addquiz, deletequiz,
  updatequiz, setquiz, setquizzes }: { addquiz: any, deletequiz: any, updatequiz: any, setquiz: any, setquizzes: any } = quizzesSlice.actions;
export default quizzesSlice.reducer;