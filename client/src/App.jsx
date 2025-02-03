import { Route, Routes } from "react-router";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Answer2Question, Main, SubjectQuestions } from "./pages";
import { Suspense } from "react";
import { Loader } from "./components/Loader";

function App() {
  return (
    <div className="h-full w-full bg-base-100">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Main />
            </Suspense>
          }
        />
        <Route
          path="/subject_questions"
          element={
            <Suspense fallback={<Loader />}>
              <SubjectQuestions />
            </Suspense>
          }
        />
        <Route
          path="/answer2question"
          element={
            <Suspense fallback={<Loader />}>
              <Answer2Question />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
