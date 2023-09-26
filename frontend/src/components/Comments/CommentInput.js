import "./CommentInput.css";
import { useState } from "react";

function CommentInput() {
  const [comment, setComment] = useState("");

  return (
    <div className="comment-input">
      <input
        className="comment-input"
        type="text"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <i id="submit-message" class="fa-solid fa-paper-plane-top"></i>
    </div>
  );
}

export default CommentInput;
