import { Modal } from "../../context/Modal";

function UploadForm({ upload }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    if (postId) {
      return dispatch(updatePost({ ...post, body }));
    } else {
      return dispatch(createPost({ authorId, body, feedId }));
    }
  };

  return (
    <div className="upload-photo">
      <img
        onClick={onClose}
        id="close-upload"
        alt="close-upload"
        src="https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/zgulV2zGm8t.png"
      />

      <div className="file-input-container">
        <label id="file-input-label">
          Upload photo
          <input
            onChange={handleFile}
            type="file"
            id="file-input"
            name="file-input"
          />
        </label>
      </div>

      <button onClick={handleSubmit} className="pp-photo-save">
        Save
      </button>
    </div>
  );
}
