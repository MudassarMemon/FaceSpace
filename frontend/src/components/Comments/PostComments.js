import "./PostComments.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { getComment, deleteComment } from "../../store/comments";
import CommentEditForm from "./CommentEditForm";

function PostComments({ users, postId, postAuthor, sessionUser }) {
  const postComments = useSelector(getComment(postId));
  const [commentId, setCommentId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showEditFormModal, setShowEditFormModal] = useState(false);
  const editCommentRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (editCommentRef.current && !editCommentRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  function handleDelete(id) {
    return (e) => {
      e.stopPropagation();
      dispatch(deleteComment(id));
      setCommentId("");
    };
  }

  if (!postComments || !(postComments.length > 0)) return null;

  return (
    <>
      <div className="post-comments">
        <ul>
          {postComments.map((comment) => {
            return (
              <div key={comment.id} className="post-comment" id={comment.id}>
                <Link to={`/users/${comment.authorId}`}>
                  <img
                    alt=""
                    src={users && users[comment.authorId - 1]?.avatarUrl}
                  />
                </Link>

                <li id="comment-body" key={comment.id}>
                  <Link to={`/users/${comment.authorId}`}>
                    {users &&
                      users[comment.authorId - 1] &&
                      `${users[comment.authorId - 1].firstName} ${
                        users[comment.authorId - 1].lastName
                      }`}
                  </Link>
                  <p>{comment.body}</p>
                </li>
                {comment.authorId === sessionUser.id ||
                postAuthor === sessionUser.id ? (
                  <div
                    className="comment-edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCommentId(comment.id);
                      toggleDropdown(e);
                    }}
                  >
                    <FontAwesomeIcon icon={faEllipsis} />
                  </div>
                ) : (
                  ""
                )}
                {isOpen && commentId === comment.id && (
                  <div ref={editCommentRef} className="comment-edit-options">
                    <div className="delete-comment-icon"> </div>
                    <button onClick={handleDelete(comment.id)}>Delete</button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowEditFormModal(true);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </ul>
      </div>
      {showEditFormModal && (
        <Modal onClose={() => setShowEditFormModal(false)}>
          <CommentEditForm
            onClose={() => setShowEditFormModal(false)}
            commentId={commentId}
          />
        </Modal>
      )}
    </>
  );
}

export default PostComments;
