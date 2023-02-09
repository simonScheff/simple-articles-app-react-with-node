import { useState } from "react";

const AddCommentForm = ({addComment}) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  
  return (
    <div id="add-comment-form">
      <h3>Add a comment</h3>
      <label>
        Name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </label>
      <label>
        Comment:
        <textarea
          rows="4"
          cols="50"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </label>
      <button onClick={() => addComment({name, commentText})}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
