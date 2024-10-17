import { useParams } from "react-router-dom";
import EditArticle from "../components/EditArticle";
import articles from "../Articles.json";

const EditArticlePage = () => {
  const { id } = useParams();
  const article = articles.find((a) => a.id === parseInt(id));

  if (!article) {
    return <h2>Article not found</h2>;
  }

  return <EditArticle article={article} />;
};

export default EditArticlePage;
