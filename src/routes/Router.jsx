import { BrowserRouter , Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import HomePage from "../pages/HomePage/HomePage";
import PostPage from "../pages/PostPage/PostPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;