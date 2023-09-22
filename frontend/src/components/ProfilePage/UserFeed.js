import "./UserFeed.css";
import { Modal } from "../../context/Modal";
import { useState } from "react";
import CreatePostForm from "../Posts/CreatePostForm";

function UserFeed({ posts, user }) {
  const [showModal, setShowModal] = useState(false);
  console.log(posts);
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
                setShowModal(true);
              }}
            >
              What's on your mind?
            </button>

            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <CreatePostForm
                  onClose={() => setShowModal(false)}
                  user={user}
                />
              </Modal>
            )}
          </div>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.body}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default UserFeed;
