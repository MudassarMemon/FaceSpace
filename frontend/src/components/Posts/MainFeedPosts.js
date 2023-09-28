import "./ProfilePosts.css";
import { Modal } from "../../context/Modal";
import { useEffect, useState } from "react";
import PostForm from "./PostForm";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, fetchPosts } from "../../store/posts";
import { getUsers, fetchUsers } from "../../store/users";
import { Link } from "react-router-dom";
import { formatDateTime, formatDateShort } from "../Util/DateUtil";
import CommentForm from "../Comments/CommentInput";
import PostComments from "../Comments/PostComments";
import PostEditModal from "./PostEditModal";

function MainFeedPosts() {
  const sessionUser = useSelector((state) => state.session.user);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPostId, setEditPostId] = useState("");
  const posts = useSelector(getPosts);
  const users = useSelector(getUsers);
  const dispatch = useDispatch();
  console.log(users);

  useEffect(() => {
    dispatch(fetchPosts);
    dispatch(fetchUsers);
  }, [dispatch]);

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
        <img id="userIcon" alt="userLogo" src={sessionUser.photoUrls[1]}></img>
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
              user={sessionUser}
            />
          </Modal>
        )}
      </div>

      <ul>
        {sortedPosts().map((post) => (
          <li key={post.id}>
            <PostEditModal
              post={post}
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
                  src={users && users[post.authorId - 1].photoUrls[1]}
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
                  {post.authorId !== post.feedId ? (
                    <>
                      <div className="arrow-icon"></div>
                      <Link to={`/users/${post.feedId}`}>
                        {users[post.feedId].firstName}{" "}
                        {users[post.feedId].lastName}
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
            <PostComments
              sessionUser={sessionUser}
              postId={post.id}
              postAuthor={post.authorId}
            />
            <div className="add-comment">
              <div>
                <img
                  id="userIcon"
                  alt="userLogo"
                  src={sessionUser && sessionUser.photoUrls[1]}
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
            user={sessionUser}
            postId={editPostId}
          />
        </Modal>
      )}
    </div>
  );
}

export default MainFeedPosts;
