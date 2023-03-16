import { useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "./MotFoundPage";
import { useArticleData } from "../hooks/use-server-date";
import CommenentsList from "../components/comments-list";
import axios from "axios";
import AddCommentForm from "../components/add-comment-form";
import useUser from "../hooks/use-user";

const UpvotesSection = ({ addUpvote, login, canVote, user, upvotes }) => {
  return (
    <div className="upvotes-section">
      {canVote ? (
        <button onClick={addUpvote}>Upvote</button>
      ) : (
        !user && <button onClick={login}>Login to Upvote</button>
      )}
      <p> This article has {upvotes} upvote(s)</p>
    </div>
  );
};

const ArticlePage = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const { user, isLoading, getToken } = useUser();
  const [articleInfo, setArticleInfo] = useArticleData(
    { upvotes: 0, comments: [] },
    articleId,
    user,
    isLoading,
    getToken
  );

  const addUpvote = async () => {
    const authtoken = await getToken();
    const res = await axios.put(
      `http://localhost:8000/api/articles/${articleId}/upvote`,
      null,
      { headers: { authtoken: authtoken } }
    );
    if (res.data.error) {
      return alert(res.data.error);
    }
    setArticleInfo(res.data);
  };

  const login = () => {
    navigate("/login/");
  };

  const addComment = async ({ name, commentText }) => {
    const authtoken = await getToken();
    const res = await axios.post(
      `http://localhost:8000/api/articles/${articleId}/comments`,
      {
        postedBy: name,
        text: commentText,
      },
      { headers: { authtoken: authtoken } }
    );

    setArticleInfo(res.data);
  };

  if (!articleInfo) {
    return <NotFoundPage />;
  }

  if (!articleInfo.title) {
    return <></>;
  }

  console.log(articleInfo);

  return (
    <>
      <h1>{articleInfo.title}</h1>
      <UpvotesSection
        user={user}
        canVote={articleInfo.canVote}
        addUpvote={addUpvote}
        login={login}
        upvotes={articleInfo.upvotes}
      />
      {articleInfo.content?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {user ? (
        <AddCommentForm addComment={addComment} />
      ) : (
        <button onClick={login}>Login to add a comment</button>
      )}
      {articleInfo.comments.length ? (
        <CommenentsList comments={articleInfo.comments} />
      ) : null}
    </>
  );
};

export default ArticlePage;
