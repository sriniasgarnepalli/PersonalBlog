import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();
const PORT = 8574;

app.use(
  cors({
    origin: "http://localhost:5173" // Allow only this origin
  })
);
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesFilePath = path.join(__dirname, "Articles.json");
console.log(articlesFilePath);

app.post("/api/newarticle", (req, res) => {
  const NewArticle = req.body;

  fs.readFile(articlesFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading the file");
    }

    let articles = [];
    try {
      articles = JSON.parse(data);
    } catch (e) {
      console.log(e);
      return res.status(500).send("Error parsing JSON data.");
    }

    articles.push(NewArticle);

    fs.writeFile(articlesFilePath, JSON.stringify(articles, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error writing to the file.");
      }
      res.status(201).send(NewArticle);
    });
  });
});

app.put("/api/editarticle/:id", (req, res) => {
  const { id } = req.params;
  const updatedArticle = req.body;

  fs.readFile(articlesFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading the file");
    }

    const fileData = JSON.parse(data);

    if (!Array.isArray(fileData)) {
      return res.status(500).send("Internal server error");
    }

    const index = fileData.findIndex((item) => item.id == id);

    if (index === -1) {
      return res.status(404).json({ message: `Article id: ${id} not found` });
    }
    fileData[index] = { ...fileData[index], ...updatedArticle };

    fs.writeFile(articlesFilePath, JSON.stringify(fileData, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error writing to the file.");
      }
      res.status(201).send(fileData);
    });
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.error("Error starting the server:", error);
});
