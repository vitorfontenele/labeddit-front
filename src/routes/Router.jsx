import { BrowserRouter , Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/post/:id" />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;