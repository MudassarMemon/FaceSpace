import "./UserFeed.css";

function UserFeed({ posts, bio }) {
  return (
    <>
      <div className="profile-left-container">
        <div className="profile-bio-container">{bio}</div>
        <div className="profile-friends-container">FRIENDS</div>
        <div className="profile-photos-container">PHOTOS</div>
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
