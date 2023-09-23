import "./CreatePostForm.css";
import { useState, useEffect, useRef } from "react";
import { createPost, receivePost } from "../../store/posts";
import { useDispatch } from "react-redux";

function CreatePostForm({ onClose, user }) {
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const postInput = useRef();
  const authorId = user.id;

  useEffect(() => {
    postInput.current.focus();
  }, [postInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    console.log("submitting");
    // console.log(body);
    // let id = Math.random() * 1000;
    // return dispatch(receivePost({ post: { id, body: body } }));
    return dispatch(createPost({ authorId, body }));
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
          value={body}
          placeholder="What's on your mind?"
          onChange={(e) => setBody(e.target.value)}
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
