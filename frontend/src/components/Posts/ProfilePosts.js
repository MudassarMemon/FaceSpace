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
import PostComments from "../Comments/PostComments";

function ProfilePosts({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPostSettingsModal, setShowPostSettingsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPostId, setEditPostId] = useState("");
  const [editPostAuthorId, setEditPostAuthorId] = useState("");
  const [modalY, setmodalY] = useState(0);
  const posts = useSelector(getPosts);
  const users = useSelector(getUsers);
  const dispatch = useDispatch();

  const sortedPosts = () => {
    let sorted = [...posts].sort((a, b) => {
      let dateA = new Date(a.createdAt);
      let dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
    return sorted;
  };

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
            <PostForm
              postId={editPostId}
              onClose={() => setShowCreateModal(false)}
              user={user}
            />
          </Modal>
        )}
      </div>

      <ul>
        {sortedPosts().map((post) => (
          <li key={post.id}>
            {post.feedId === user.id || post.authorId === sessionUser.id ? (
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
            <PostComments postId={post.id} />
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
