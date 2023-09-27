import "./ProfilePosts.css";
import { Modal } from "../../context/Modal";
import { useEffect, useState } from "react";
import PostForm from "./PostForm";
import { useSelector } from "react-redux";
import { getPosts } from "../../store/posts";
import { getUsers } from "../../store/users";
import { Link } from "react-router-dom";
import { formatDateTime, formatDateShort } from "../Util/DateUtil";
import CommentForm from "../Comments/CommentInput";
import PostComments from "../Comments/PostComments";
import PostEditModal from "./PostEditModal";

function ProfilePosts({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPostId, setEditPostId] = useState("");
  const posts = useSelector(getPosts);
  const users = useSelector(getUsers);

  useEffect(() => {}, [user]);

  const sortedPosts = () => {
    let sorted = [...posts].sort((a, b) => {
      let dateA = new Date(a.createdAt);
      let dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
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
            <PostEditModal
              post={post}
              user={user}
              sessionUser={sessionUser}
              setShowEditModal={setShowEditModal}
              setEditPostId={setEditPostId}
              editPostId={editPostId}
            />

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
                  <p className="created-at">
                    {formatDateShort(post.createdAt)}
                  </p>
                  <p className="last-updated">
                    {post.createdAt === post.updatedAt
                      ? formatDateTime(post.createdAt)
                      : "Edited on " + formatDateTime(post.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
            <div className="post-body">{post.body}</div>
            <PostComments sessionUser={sessionUser} postId={post.id} />
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
