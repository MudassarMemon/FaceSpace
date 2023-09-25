import "./ProfilePosts.css";
import { Modal } from "../../context/Modal";
import { useState } from "react";
import PostForm from "./PostForm";
import { useSelector } from "react-redux";
import { getPosts } from "../../store/posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { getUsers } from "../../store/users";

function ProfilePosts({ user }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPostSettingsModal, setShowPostSettingsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPostId, setEditPostId] = useState("");
  const posts = useSelector(getPosts);
  const users = useSelector(getUsers);

  const sortedPosts = () => {
    let sorted = [];
    for (let i = posts.length - 1; i >= 0; i--) {
      sorted.push(posts[i]);
    }
    return sorted;
  };

  return (
    <div className="profile-posts-container">
      <div className="create-profile-post">
        <img
          id="userLogo"
          alt="userLogo"
          src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
        ></img>
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
              onClick={() => {
                setEditPostId(post.id);
                setShowPostSettingsModal(true);
              }}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </div>
            <div className="post-author">
              {users[post.authorId - 1].firstName}{" "}
              {users[post.authorId - 1].lastName}
            </div>
            <div className="post-body">{post.body}</div>
            <div className="add-comment">
              <input
                className="comment-input"
                type="text"
                placeholder="Write a comment..."
              />
            </div>
          </li>
        ))}
      </ul>

      {showPostSettingsModal && (
        <Modal
          background={false}
          onClose={() => setShowPostSettingsModal(false)}
        >
          <button
            onClick={() => {
              setShowPostSettingsModal(false);
              setShowEditModal(true);
            }}
          >
            Edit Post
          </button>
          <button>Delete Post</button>
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
