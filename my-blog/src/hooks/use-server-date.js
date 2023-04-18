import { useEffect, useState } from "react";
import axios from "axios";

export function useArticleData(initialValue, articleId, user, isLoading, getToken)  {
  const [articleInfo, setArticleInfo] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      if (isLoading) return;

      const authtoken = await getToken();
      const res = await axios.get(`http://localhost:8000/api/articles/${articleId}`,
        {
          headers: {authtoken} 
        }
        );
      const { upvotes, comments, title, content, canVote } = res.data;
      setArticleInfo({ upvotes, comments, title, content, canVote });
    }
    fetchData();
  }, [articleId, user, isLoading]);

  return [articleInfo, setArticleInfo];
}

export function useArticlesData() {
  const [articlesInfo, setArticlesInfo] = useState([]);

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
