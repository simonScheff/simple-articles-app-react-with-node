import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import AboutPage from "./pages/AboutPage";
import ArticleListPage from "./pages/ArticleListPage";
import ArticlePage from "./pages/ArticlePage";
import CreateAccountPage from "./pages/create-account-page";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/login-page";
import NotFoundPage from "./pages/MotFoundPage";
import useUser from "./hooks/use-user";

function App() {
  const { user, userData, logOut, isLoading, getToken, updateUserData } =
    useUser();
  return (
    <Router>
      <div className="App">
        <NavBar userData={userData} logOut={logOut} isLoading={isLoading} />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<ArticleListPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/articles/:articleId"
              element={
                <ArticlePage
                  getToken={getToken}
                  isLoading={isLoading}
                  user={user}
                  userData={userData}
                />
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/create-account"
              element={
                <CreateAccountPage
                  user={user}
                  getToken={getToken}
                  updateUserData={updateUserData}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
