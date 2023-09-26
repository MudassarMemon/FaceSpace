import "./ProfilePosts.css";
import { Modal } from "../../context/Modal";
import { useState } from "react";
import PostForm from "./PostForm";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, getPosts } from "../../store/posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { getUsers } from "../../store/users";
import { Link } from "react-router-dom";
import { formatDateTime, formatDateShort } from "../Util/DateUtil";
import CommentForm from "../Comments/CommentInput";

function ProfilePosts({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPostSettingsModal, setShowPostSettingsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPostId, setEditPostId] = useState("");
  const [modalY, setmodalY] = useState(0);
  const posts = useSelector(getPosts);
  const users = useSelector(getUsers);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(editPostId));
  };

  const sortedPosts = () => {
    let sorted = [];
    for (let i = posts.length - 1; i >= 0; i--) {
      if (posts[i].feedId === user.id) {
        sorted.push(posts[i]);
      }
    }
    return sorted;
  };

  const getElementCoordinates = async (postId) => {
    let coordinates = document
      .querySelector(`#edit-post-icon${postId}`)
      .getBoundingClientRect();
    setmodalY(coordinates.bottom);
  };

  return (
    <div className="profile-posts-container">
      <div className="create-profile-post">
        <img id="userIcon" alt="userLogo" src={sessionUser.profilePicUrl}></img>
        <button
          onClick={() => {
            setShowCreateModal(true);
          }}
        >
          What's on your mind?
        </button>

        {showCreateModal && (
          <Modal onClose={() => setShowCreateModal(false)}>
            <PostForm onClose={() => setShowCreateModal(false)} user={user} />
          </Modal>
        )}
      </div>

      <ul>
        {sortedPosts().map((post) => (
          <li key={post.id}>
            <div
              className="edit-post-icon"
              id={`edit-post-icon${post.id}`}
              onClick={(e) => {
                setEditPostId(post.id);
                getElementCoordinates(post.id);
                setShowPostSettingsModal(true);
              }}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </div>
            <div className="post-author">
              <div>
                <img
                  id="userIcon"
                  alt="userLogo"
                  src={user.profilePicUrl}
                ></img>
              </div>
              <div className="post-author-name">
                <div>
                  <Link to={`/users/${post.authorId}`}>
                    {users ? (
                      <>
                        {users[post.authorId - 1]?.firstName}{" "}
                        {users[post.authorId - 1]?.lastName}
                      </>
                    ) : (
                      ""
                    )}
                  </Link>
                  {post.authorId !== user.id ? (
                    <>
                      <div className="arrow-icon"></div>
                      <Link to={`/users/${user.id}`}>
                        {user.firstName} {user.lastName}
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <p>{formatDateShort(post.createdAt)}</p>
                </div>
              </div>
            </div>
            <div className="post-body">{post.body}</div>
            <div className="add-comment">
              <div>
                <img
                  id="userIcon"
                  alt="userLogo"
                  src={user.profilePicUrl}
                ></img>
              </div>
              <CommentForm authorId={sessionUser.id} postId={post.id} />
            </div>
          </li>
        ))}
      </ul>

      {showPostSettingsModal && (
        <Modal
          background={false}
          position={[modalY, "20.5%", null, null]}
          onClose={() => setShowPostSettingsModal(false)}
        >
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
        </Modal>
      )}

      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <PostForm
            onClose={() => setShowEditModal(false)}
            user={user}
            postId={editPostId}
          />
        </Modal>
      )}
    </div>
  );
}

export default ProfilePosts;
