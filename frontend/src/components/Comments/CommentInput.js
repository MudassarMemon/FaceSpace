import "./CommentForm.css";
import { useState } from "react";
import createComment from "../../store/comments";
import { useDispatch } from "react-redux";

function CommentForm({ authorId, postId }) {
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log({ body, authorId, postId });
    debugger;
    dispatch(createComment({ body, authorId, postId }));
  };

  return (
    <div className="comment-input">
      <input
        className="comment-input"
        type="text"
        placeholder="Write a comment..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <i
        onClick={handleSubmit}
        id="submit-message"
        className="fa-solid fa-paper-plane-top"
      ></i>
    </div>
  );
}

export default CommentForm;
