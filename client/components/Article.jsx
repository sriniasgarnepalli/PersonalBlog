import PropTypes from "prop-types";

const Article = ({ article }) => {
  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <h2>{article.publishingDate}</h2>
    </div>
  );
};

// PropTypes validation
Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    publishingDate: PropTypes.string
  }).isRequired
};

export default Article;
