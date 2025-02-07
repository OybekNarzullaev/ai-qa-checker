import { Route, Routes } from "react-router";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Answer2Question, Main, SubjectQuestions } from "./pages";
import { Suspense } from "react";
import { Loader } from "./components/Loader";
import { PrivatePage } from "./providers/PrivatePage";

function App() {
  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="p-3 lg:p-5">
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
                <PrivatePage>
                  <Answer2Question />
                </PrivatePage>
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
