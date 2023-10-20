import "./PostForm.css";
import { useState, useEffect, useRef } from "react";
import { createPost, getPost, updatePost } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";

function PostForm({ onClose, user, postId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const post = useSelector(getPost(postId));
  const [body, setBody] = useState(postId ? post.body : "");
  const [photoFile, setPhotoFile] = useState();
  const [photoURL, setPhotoURL] = useState();
  const dispatch = useDispatch();
  const postInput = useRef();
  const authorId = sessionUser.id;
  const feedId = user.id;

  useEffect(() => {
    postInput.current.focus();
  }, [postInput]);

  const handleRemovePhoto = (e) => {
    e.preventDefault();
    setPhotoFile(null);
    setPhotoURL(null);
  };

  const handleFile = (e) => {
    const file = e.currentTarget.files[0];
    setPhotoFile(file);
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => setPhotoURL(fileReader.result);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    const newPhoto = new FormData();
    // CHECK;
    // newPost.append("post[body]", body);
    // if (photoFile) {
    //   newPost.append("post[photo]", photoFile);
    // } else if (photoURL === null) {
    //   newPost.append("post[photo]", null);
    // }
    // if (modal === "create-post") {
    //   if (userId) {
    //     newPost.append("post[profileUserId]", userId);
    //   } else {
    //     newPost.append("post[profileUserId", currentUser.id);
    //   }
    //   dispatch(createPost(newPost));
    // } else {
    //   newPost.append("post[id]", post.id);
    //   dispatch(updatePost(newPost));
    // }
    // CHECK;
    // newPhoto.append(`user[${e.target.id}]`, e.target.files[0]);
    // dispatch(uploadPhoto({ id: sessionUser.id, photo: newPhoto }));
    if (postId) {
      return dispatch(updatePost({ ...post, body }));
    } else {
      return dispatch(createPost({ authorId, body, feedId }));
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
          placeholder={
            user.id === sessionUser.id
              ? "What's on your mind?"
              : `Write something to ${user.firstName}...`
          }
          onChange={(e) => setBody(e.target.value)}
          id="create-post"
          name="create-post"
          rows="4"
          cols="50"
        />
        {!postId && (
          <div className="post-photo-container">
            {photoURL && (
              <>
                <img alt="" src={photoURL} id="preview" />
                <img
                  onClick={handleRemovePhoto}
                  id="remove-post-image"
                  alt=""
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/zgulV2zGm8t.png"
                />
              </>
            )}
            <div className="post-photo-button">
              Upload an Image <i className="fa-solid fa-image"></i>
              <input
                type="file"
                className="upload-image"
                onChange={(e) => handleFile(e)}
              />
            </div>
          </div>
        )}
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
