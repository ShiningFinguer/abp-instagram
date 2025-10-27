import React, { useState } from "react";

const ProfileHeader = ({ userProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowUser = () => {
    alert("Todavia no está conectado a la BBDD xd");
    setIsFollowing(!isFollowing);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "2rem" }}>
      {/*Profile Picture */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={userProfile.profilePicURL}
          alt="Profile"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
      </div>

      {/* Username y Follow */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
        <h2>{userProfile.username}</h2>
        <button
          onClick={handleFollowUser}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>

      {/* DAtos */}
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        <div>
          <strong>{userProfile.posts.length}</strong> Posts
        </div>
        <div>
          <strong>{userProfile.followers.length}</strong> Followers
        </div>
        <div>
          <strong>{userProfile.following.length}</strong> Following
        </div>
      </div>

      {/* Nombre completo */}
      <div style={{ textAlign: "center", fontWeight: "bold" }}>{userProfile.fullName}</div>

      {/* Bio */}
      <div style={{ textAlign: "center" }}>{userProfile.bio}</div>

      {/* Modal de edición (opcional) */}
      {isOpen && <EditProfile isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default ProfileHeader;
