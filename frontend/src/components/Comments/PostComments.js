import "./PostComments.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getComment, deleteComment } from "../../store/comments";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

function PostComments({ postId, postAuthor, sessionUser }) {
  const comments = useSelector(getComment(postId));
  const [showDelete, setShowDelete] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState("");
  const dispatch = useDispatch();

  function handleDelete(id) {
    return (e) => {
      e.stopPropagation();
      dispatch(deleteComment(id));
      setDeleteCommentId("");
    };
  }

  if (!comments || !(comments.length > 0)) return null;
  return (
    <div className="post-comments">
      <ul>
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="post-comment" id={comment.id}>
              <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
              ></img>
              <li id="comment-body" key={comment.id}>
                <Link to={`/users/${sessionUser.id}`}>
                  {sessionUser.firstName} {sessionUser.lastName}
                </Link>
                <p>{comment.body}</p>
              </li>
              {comment.authorId === sessionUser.id ||
              postAuthor === sessionUser.id ? (
                <div className="comment-settings">
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteCommentId(comment.id);
                      setShowDelete(!showDelete);
                    }}
                  />
                </div>
              ) : (
                ""
              )}
              {showDelete && deleteCommentId === comment.id && (
                <div className="delete-comment">
                  <div className="delete-comment-icon"> </div>
                  <button onClick={handleDelete(comment.id)}>Delete</button>
                </div>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default PostComments;
