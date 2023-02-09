import { useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "./MotFoundPage";
import { useArticleData } from "../hooks/use-server-date";
import CommenentsList from "../components/comments-list";
import axios from "axios";
import AddCommentForm from "../components/add-comment-form";
import useUser from "../hooks/use-user";

const ArticlePage = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const [articleInfo, setArticleInfo] = useArticleData(
    { upvotes: 0, comments: [] },
    articleId
  );
  const { user,  } = useUser();
  const addUpvote = async () => {
    const res = await axios.put(
      `http://localhost:8000/api/articles/${articleId}/upvote`
    );
    setArticleInfo(res.data);
  };

  const login = () => {
    navigate('/login/')
  };

  const addComment = async ({ name, commentText }) => {
    const res = await axios.post(
      `http://localhost:8000/api/articles/${articleId}/comments`,
      {
        postedBy: name,
        text: commentText,
      }
    );

    setArticleInfo(res.data);
  };

  //addUpvote();
  if (!articleInfo) {
    return <NotFoundPage />;
  }


  return (
    <>
      <h1>{articleInfo.title}</h1>
      <div className="upvotes-section">
        {user ? (
          <button onClick={addUpvote}>Upvote</button>
        ) : (
          <button onClick={login}>Login to Upvote</button>
        )}
        <p> This article has {articleInfo.upvotes} upvote(s)</p>
      </div>

      {articleInfo.content?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {user ? 
      <AddCommentForm addComment={addComment} />
      : 
      <button onClick={login}>Login to add a comment</button>
    }
      {articleInfo.comments.length ? (
        <CommenentsList comments={articleInfo.comments} />
      ) : null}
    </>
  );
};

export default ArticlePage;
