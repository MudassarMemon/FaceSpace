import "./CommentEditForm.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateComment } from "../../store/comments";

function CommentEditForm({ onClose, commentId, commentBody }) {
  const [body, setBody] = useState(commentBody ?? "");
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.stopPropagation();
    dispatch(updateComment({ body, id: commentId }));
    onClose();
  };

  return (
    <div className="edit-comment-form">
      <h1>Edit Comment</h1>
      <img
        onClick={onClose}
        id="close-edit-comment"
        alt="close-edit-comment"
        src="https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/zgulV2zGm8t.png"
      />
      <div className="comment-input">
        <textarea
          className="comment-input"
          type="text"
          placeholder="Write a comment..."
          value={body ?? ""}
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          onClick={(e) => handleUpdate(e)}
          className="update-comment-button"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CommentEditForm;
