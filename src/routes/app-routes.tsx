import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Review from "../pages/Review";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reviews/new" element={<Review />} />
    </Routes>
  );
};

export default AppRoutes;
