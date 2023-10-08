import "./CommentEditForm.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateComment, getComment } from "../../store/comments";

function CommentEditForm({ onClose, commentId }) {
  const comment = useSelector(getComment(commentId));
  const [body, setBody] = useState(comment?.body ?? "");
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.stopPropagation();
    dispatch(updateComment({ body, id: commentId }));
    onClose();
  };

  return (
    <div className="edit-comment-form">
      <img
        onClick={onClose}
        id="close-create-post"
        alt="close-create-post"
        src="https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/zgulV2zGm8t.png"
      />
      <div className="comment-input">
        <input
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
