function UserFeed({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.body}</li>
      ))}
    </ul>
  );
}

export default UserFeed;
