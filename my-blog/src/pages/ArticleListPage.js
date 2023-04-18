import ArticlesList from "../components/ArticlesList";
import { useArticlesData } from "../hooks/use-server-date";

const ArticleListPage = () => {
  return (
    <>
      <h1>Articles</h1>
      <ArticlesList articles={useArticlesData()} />
    </>
  );
};

export default ArticleListPage;
