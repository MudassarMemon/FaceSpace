import "./CreatePostForm.css";
import { useState, useEffect, useRef } from "react";
import { createPost, receivePost } from "../../store/posts";
import { useDispatch } from "react-redux";

function CreatePostForm({ onClose, user }) {
  const [postBody, setPostBody] = useState("");
  const dispatch = useDispatch();
  const postInput = useRef();
  const author_id = user.id;

  useEffect(() => {
    postInput.current.focus();
  }, [postInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    console.log("submitting");
    console.log(postBody);
    let id = Math.random() * 1000;
    return dispatch(receivePost({ post: { id, body: postBody } }));
    return dispatch(createPost({ id: author_id, body: postBody }));
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
        <h1>Create post</h1>
        <textarea
          ref={postInput}
          value={postBody}
          placeholder="What's on your mind?"
          onChange={(e) => setPostBody(e.target.value)}
          id="create-post"
          name="create-post"
          rows="4"
          cols="50"
        />
        <input id="post-button" type="submit" value="Post" />
      </form>
    </div>
  );
}

export default CreatePostForm;
