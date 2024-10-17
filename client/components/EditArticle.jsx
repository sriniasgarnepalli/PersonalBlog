import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// import articlesData from "../Articles.json";
import axios from "axios";

const EditArticle = ({ article }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // Populate the form fields with the article data
    setTitle(article.title);
    setContent(article.content);
    setDate(article.publishingDate);
  }, [article]);

  //   const today = new Date().toISOString().split("T")[0];
  const handleSubmit = async (e) => {
    e.preventDefault();
    let currentArticleId = article.id;
    const updatedArticle = {
      id: currentArticleId,
      title: title,
      content: content,
      publishingDate: date
    };

    console.log(updatedArticle);

    try {
      const response = await axios.put(
        `http://localhost:8574/api/editarticle/${currentArticleId}`,
        updatedArticle
      );
      console.log("Article submitted:", response.data);
    } catch (e) {
      console.log("Error while submitting article:", e);
    }
  };
  return (
    <>
      <h1>Edit Article</h1>
      <div>
        <form id="edit-article" onSubmit={handleSubmit}>
          <label htmlFor="article-title">Article Title</label> <br></br>
          <textarea
            name="article-title"
            id="article-title"
            maxLength="25"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></textarea>{" "}
          <br></br> <br></br>
          <label htmlFor="publishing-date">Publishing Date</label> <br></br>
          <input
            type="date"
            id="publishing-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />{" "}
          <br></br> <br></br>
          <label htmlFor="article-content">Article Title</label> <br></br>
          <textarea
            name="article-content"
            id="article-content"
            maxLength="800"
            rows={10}
            cols={50}
            required
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>{" "}
          <br></br> <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

EditArticle.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    publishingDate: PropTypes.string,
    id: PropTypes.number.isRequired
  }).isRequired
};

export default EditArticle;
