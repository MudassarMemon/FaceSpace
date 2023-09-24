import "./PostForm.css";
import { useState, useEffect, useRef } from "react";
import { createPost, getPost, updatePost } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";

function PostForm({ onClose, user, postId }) {
  const post = useSelector(getPost(postId));
  const [body, setBody] = useState(postId ? post.body : "");
  const dispatch = useDispatch();
  const postInput = useRef();
  const authorId = user.id;

  useEffect(() => {
    postInput.current.focus();
  }, [postInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    if (postId) {
      return dispatch(updatePost({ ...post, body }));
    } else {
      return dispatch(createPost({ authorId, body }));
    }
  };

  return (
    <div className="create-post-form">
      <img
        onClick={onClose}
        id="close-create-post"
        alt="close-create-post"
        src="https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/zgulV2zGm8t.png"
      />
      <form onSubmit={handleSubmit}>
        <h1>{postId ? "Edit post" : "Create post"}</h1>
        <textarea
          ref={postInput}
          value={body}
          placeholder="What's on your mind?"
          onChange={(e) => setBody(e.target.value)}
          id="create-post"
          name="create-post"
          rows="4"
          cols="50"
        />
        <input
          id="post-button"
          type="submit"
          value={postId ? "Save" : "Post"}
        />
      </form>
    </div>
  );
}

export default PostForm;
