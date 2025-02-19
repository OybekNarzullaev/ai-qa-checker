import React from "react";

export const Main = React.lazy(() => import("./Main"));
export const Answer2Question = React.lazy(() => import("./Answer2Question"));
export const MyResults = React.lazy(() => import("./MyResults"));
export const MyQuizResults = React.lazy(() => import("./MyQuizResults"));
export const Answer2QuizQuestion = React.lazy(() =>
  import("./Answer2QuizQuestion")
);
