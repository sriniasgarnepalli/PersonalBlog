import { useState } from "react";
import articlesData from "../Articles.json";
import axios from "axios";

export default function NewArticle() {
  const [selectedDate, setSelectedDate] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let currentArticleId = articlesData.length + 1;
    const newArticle = {
      id: currentArticleId,
      title: articleTitle,
      content: articleContent,
      publishingDate: selectedDate
    };

    try {
      const response = await axios.post(
        "http://localhost:8574/api/newarticle",
        newArticle
      );
      console.log("Article submitted:", response.data);
      setArticleContent("");
      setArticleTitle("");
      setSelectedDate("");
    } catch (e) {
      console.log("Error while submitting article:", e);
    }
  };
  return (
    <>
      <h1>New Article</h1>
      <div>
        <form id="new-article" onSubmit={handleSubmit}>
          <label htmlFor="article-title">Article Title</label> <br></br>
          <textarea
            name="article-title"
            id="article-title"
            placeholder="Article Title"
            maxLength="25"
            required
            value={articleTitle}
            onChange={(e) => {
              setArticleTitle(e.target.value);
            }}
          ></textarea>{" "}
          <br></br> <br></br>
          <label htmlFor="publishing-date">Publishing Date</label> <br></br>
          <input
            type="date"
            id="publishing-date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={today}
            required
          />{" "}
          <br></br> <br></br>
          <label htmlFor="article-content">Article Title</label> <br></br>
          <textarea
            name="article-content"
            id="article-content"
            placeholder="Article Content"
            maxLength="800"
            rows={10}
            cols={50}
            required
            value={articleContent}
            onChange={(e) => {
              setArticleContent(e.target.value);
            }}
          ></textarea>{" "}
          <br></br> <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
