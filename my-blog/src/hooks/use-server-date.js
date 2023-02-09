import { useEffect, useState } from "react";
import axios from "axios";

export function useArticleData(initialValue, articleId) {
  const [articleInfo, setArticleInfo] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `http://localhost:8000/api/articles/${articleId}`
      );
      const { upvotes, comments, title, content } = res.data;
      setArticleInfo({ upvotes, comments, title, content });
    }
    fetchData();
  }, [articleId]);

  return [articleInfo, setArticleInfo];
}

export function useArticlesData(initialValue) {
  const [articlesInfo, setArticlesInfo] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`http://localhost:8000/api/articles`);
      const data = res.data;
      setArticlesInfo(data);
    }
    try {
      fetchData();
    } catch (e) {
      console.log(e);
      alert("Error!");
    }
  }, []);

  return articlesInfo;
}
