import "./CommentLikes.css";
import { useDispatch } from "react-redux";
import { likeComment } from "../../store/comments";

function CommentLikes({ comment, users, sessionUser }) {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likeComment(comment.id));
  };

  return (
    <>
      <p
        id="comment-like"
        className={
          comment.likes.findIndex((like) => like.user_id === sessionUser.id) < 0
            ? ""
            : "comment-liked"
        }
        onClick={handleLike}
      >
        Like
      </p>

      <div className="comment-likes-list">
        <ul>
          {comment.likes.map((like) => {
            return (
              <li key={like.id}>
                {users[like.user_id - 1]?.firstName +
                  " " +
                  users[like.user_id - 1]?.lastName}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default CommentLikes;
