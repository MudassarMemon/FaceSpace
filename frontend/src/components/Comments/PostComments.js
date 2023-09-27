import "./PostComments.css";
import { useSelector } from "react-redux";
import { getComment } from "../../store/comments";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

function PostComments({ postId, sessionUser }) {
  const comments = useSelector(getComment(postId));

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
              <div className="comment-settings">
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default PostComments;
