import { BrowserRouter , Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" />
                <Route path="/post/:id" />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;