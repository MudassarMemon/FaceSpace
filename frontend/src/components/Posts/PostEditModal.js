import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { deletePost } from "../../store/posts";
import { Modal } from "../../context/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./PostEditModal.css";

function PostEditModal({
  post,
  user,
  sessionUser,
  setShowEditModal,
  setEditPostId,
  editPostId,
}) {
  const [editPostAuthorId, setEditPostAuthorId] = useState("");
  const [modalY, setmodalY] = useState(0);
  const [showPostSettingsModal, setShowPostSettingsModal] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(editPostId));
  };

  const getElementCoordinates = async (postId) => {
    let coordinates = document
      .querySelector(`#edit-post-icon${postId}`)
      .getBoundingClientRect();
    setmodalY(coordinates.bottom);
  };

  return (
    <>
      {post.feedId === sessionUser.id || post.authorId === sessionUser.id ? (
        <div
          className="edit-post-icon"
          id={`edit-post-icon${post.id}`}
          onClick={(e) => {
            setEditPostId(post.id);
            setEditPostAuthorId(post.authorId);
            getElementCoordinates(post.id);
            setShowPostSettingsModal(true);
          }}
        >
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      ) : (
        ""
      )}

      {showPostSettingsModal && (
        <Modal
          background={false}
          position={[modalY, "20.5%", null, null]}
          onClose={() => setShowPostSettingsModal(false)}
        >
          {editPostAuthorId === sessionUser.id ? (
            <div className="post-settings">
              <div
                className="edit-posts-container"
                onClick={() => {
                  setShowPostSettingsModal(false);
                  setShowEditModal(true);
                }}
              >
                <div className="edit-posts-icon"></div>
                <button>Edit Post</button>
              </div>

              <div
                className="delete-posts-container"
                onClick={() => {
                  handleDelete();
                  setShowPostSettingsModal(false);
                }}
              >
                <div className="delete-posts-icon"></div>
                <button>Delete Post</button>
              </div>
            </div>
          ) : (
            <div className="post-settings">
              <div
                className="delete-posts-container"
                onClick={() => {
                  handleDelete();
                  setShowPostSettingsModal(false);
                }}
              >
                <div className="delete-posts-icon"></div>
                <button>Delete Post</button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}

export default PostEditModal;
