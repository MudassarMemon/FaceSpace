import "./PostComments.css";
import { useSelector } from "react-redux";
import { getComment } from "../../store/comments";
import { useEffect } from "react";

function PostComments({ postId }) {
  const comments = useSelector(getComment(postId));

  useEffect(() => {}, [comments]);

  return (
    <div className="post-comments">
      <ul>
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="post-comment" id={comment.id}>
              <li key={comment.id}>{comment.body}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default PostComments;
