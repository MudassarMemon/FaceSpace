function ProfileIntro({ user }) {
  return (
    <div className="profile-bio-container">
      <h2>Bio</h2>
      {user ? user.bio : ""}
    </div>
  );
}

export default ProfileIntro;
