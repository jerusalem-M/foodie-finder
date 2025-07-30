import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MealDetail from "./pages/MealDetail";
import Navbar from "./components/Navbar";
import Categories from "./pages/Categories";
import RandomMeal from "./pages/RandomMeal";
import CategoryPage from "./pages/CategoryPage";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<MealDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/random" element={<RandomMeal />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
