import { useParams } from "react-router-dom";
import Article from "../components/Article";
import articles from "../Articles.json";

const ArticlePage = () => {
  const { id } = useParams();
  const article = articles.find((a) => a.id === parseInt(id));

  if (!article) {
    return <h2>Article not found</h2>;
  }

  return <Article article={article} />;
};

export default ArticlePage;
