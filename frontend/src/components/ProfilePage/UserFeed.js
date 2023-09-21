function UserFeed({ posts }) {
  return (
    <>
      {posts.map((post) => (
        <li>{post.body}</li>
      ))}
    </>
  );
}

export default UserFeed;
