import "./CreatePostForm.css";
import { useState } from "react";
// import { receivePost } from "../../store/posts";
// import { useDispatch } from "react-redux";

function CreatePostForm({ onClose, user }) {
  const [postBody, setPostBody] = useState("");
  //   const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(receivePost({body: postBody});
    console.log("submitting");
    console.log(postBody);
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
          value={postBody}
          placeholder="What's on your mind?"
          onChange={(e) => setPostBody(e.target.value)}
          id="create-post"
          name="create-post"
          rows="4"
          cols="50"
        />
        <button>Post</button>
      </form>
    </div>
  );
}

export default CreatePostForm;
