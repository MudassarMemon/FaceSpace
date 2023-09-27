import "./PostComments.css";
import { useSelector } from "react-redux";
import { getComment } from "../../store/comments";

function PostComments({ postId }) {
  const comments = useSelector(getComment(postId));

  return (
    <div className="post-comments">
      <ul>
        {comments && comments.length > 0
          ? comments.map((comment) => {
              return (
                <div key={comment.id} className="post-comment" id={comment.id}>
                  <li key={comment.id}>{comment.body}</li>
                </div>
              );
            })
          : null}
      </ul>
    </div>
  );
}

export default PostComments;
