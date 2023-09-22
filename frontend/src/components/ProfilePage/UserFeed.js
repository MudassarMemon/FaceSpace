import "./UserFeed.css";

function UserFeed({ posts }) {
  return (
    <>
      <div className="profile-left-container">
        <div className="profile-bio-container"></div>
        <div className="profile-friends-container"></div>
        <div className="profile-photos-container"></div>
      </div>

      <div className="profile-right-container">
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.body}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default UserFeed;
