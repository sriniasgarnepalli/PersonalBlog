import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../client/pages/HomePage";
import ArticlePage from "../client/pages/ArticlePage";
import AdminPage from "../client/pages/AdminPage";
import NewArticle from "../client/pages/NewArticle";
import EditArticlePage from "../client/pages/editArticlePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/new" element={<NewArticle />} />
        <Route path="/edit/:id" element={<EditArticlePage />} />
      </Routes>
    </Router>
  );
};

export default App;
