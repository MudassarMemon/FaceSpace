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

function ProfilePosts({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPostSettingsModal, setShowPostSettingsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPostId, setEditPostId] = useState("");
  const [modalX, setmodalX] = useState(0);
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
              onClick={(e) => {
                setEditPostId(post.id);
                setmodalX(e.clientX - 200);
                setmodalY(e.clientY);
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
              <div className="comment-input">
                <input
                  className="comment-input"
                  type="text"
                  placeholder="Write a comment..."
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {showPostSettingsModal && (
        <Modal
          background={false}
          position={[modalY, null, null, modalX]}
          onClose={() => setShowPostSettingsModal(false)}
        >
          <div className="post-settings">
            <button
              onClick={() => {
                setShowPostSettingsModal(false);
                setShowEditModal(true);
              }}
            >
              Edit Post
            </button>
            <button
              onClick={() => {
                handleDelete();
                setShowPostSettingsModal(false);
              }}
            >
              Delete Post
            </button>
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
