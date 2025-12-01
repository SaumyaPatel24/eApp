import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import NotFound from "./pages/NotFound";
import AddItemPage from "./pages/AddItemPage";
import RemoveItemPage from "./pages/RemoveItemPage";
import "./index.css";

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/add-item" element={<AddItemPage />} />
          <Route path="/remove-item" element={<RemoveItemPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;