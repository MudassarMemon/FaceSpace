import "./PostComments.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { getComment, getComments, deleteComment } from "../../store/comments";
import { Link } from "react-router-dom";
import { getUsers } from "../../store/users";
import { Modal } from "../../context/Modal";
import CommentEditForm from "./CommentEditForm";

function PostComments({ postId, postAuthor, sessionUser }) {
  const comments = useSelector(getComment(postId));
  const users = useSelector(getUsers);
  const [commentId, setCommentId] = useState("");
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
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

  if (!comments || !(comments.length > 0)) return null;
  return (
    <>
      <div className="post-comments">
        <ul>
          {comments.map((comment) => {
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
                  <div ref={dropdownRef} className="comment-edit-options">
                    <div className="delete-comment-icon"> </div>
                    <button onClick={handleDelete(comment.id)}>Delete</button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowEditModal(true);
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
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <CommentEditForm
            onClose={() => setShowEditModal(false)}
            commentId={commentId}
          />
        </Modal>
      )}
    </>
  );
}

export default PostComments;
