const CommenentsList = ({ comments }) => (
  <>
    <h3>Comments:</h3>
    {comments.map((comment) => (
      <div className="comment" key={comment.text + Math.random()}>
        <h4>{comment.postedBy}</h4>
        {comment.text}
      </div>
    ))}
  </>
);

export default CommenentsList;
