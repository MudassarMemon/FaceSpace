import "./UserFeed.css";
import { Modal } from "../../context/Modal";
import { useState } from "react";
import PostForm from "../Posts/PostForm";
import { useSelector } from "react-redux";
import { getPosts } from "../../store/posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

function UserFeed({ user }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPostId, setEditPostId] = useState("");
  const posts = useSelector(getPosts);
  const sessionUser = useSelector((state) => state.session.user);

  const sortedPosts = () => {
    let sorted = [];
    for (let i = posts.length - 1; i >= 0; i--) {
      sorted.push(posts[i]);
    }
    return sorted;
  };

  return (
    <>
      <div className="profile-left-container">
        <div className="profile-bio-container">
          <h2>Bio</h2>
          {user ? user.bio : ""}
        </div>
        <div className="profile-friends-container">
          <h2>Friends</h2>
        </div>
        <div className="profile-photos-container">
          <h2>Photos</h2>
        </div>
      </div>

      <div className="profile-right-container">
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
                <PostForm
                  onClose={() => setShowCreateModal(false)}
                  user={user}
                />
              </Modal>
            )}
          </div>
          <ul>
            {sortedPosts().map((post) => (
              <li
                onClick={() => {
                  setEditPostId(post.id);
                  setShowEditModal(true);
                }}
                key={post.id}
              >
                <div className="edit-post-icon">
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
                <div className="post-author">{sessionUser.firstName}</div>
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
      </div>
    </>
  );
}

export default UserFeed;
