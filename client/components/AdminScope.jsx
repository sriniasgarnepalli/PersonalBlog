import { Link } from "react-router-dom";
import articles from "../Articles.json";
import NewArticle from "../pages/NewArticle";

const AdminScope = () => {
  return (
    <>
      <div>
        <h1>Personal Blog</h1>
        <h3 key={1}>
          <Link to={`/new`}>{NewArticle} Add new article</Link>
        </h3>
      </div>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link to={`/article/${article.id}`}>{article.title}</Link>
            <h5 key={article.id}>
              <Link to={`/edit/${article.id}`}> Edit</Link>
            </h5>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdminScope;
