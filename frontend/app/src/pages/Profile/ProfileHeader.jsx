import React, { useEffect, useState } from "react";

const ProfileHeader = ({}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:3001/api/users/profile", {
          headers: {
            'Authorization': `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setUserProfile(data);

        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserProfile();
  }, []);



  const handleFollowUser = () => {
    
    
  }

  


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
      }}
    >
      {/*Profile Picture */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={userProfile?.profilePicURL || 'https://i.pravatar.cc/300'}
          alt="Profile"
          style={{ width: '150px', height: '150px', borderRadius: '50%' }}
        />
      </div>

      {/* Username and Follow */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <h2>{userProfile?.username}</h2>
        <button onClick={handleFollowUser}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>

      {/* Profile Info */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <div>
          <strong>userProfile?.posts?.length</strong> Posts
        </div>
        <div>
          <strong>userProfile?.followers?.length</strong> Followers
        </div>
        <div>
          <strong>userProfile?.following?.length</strong> Following
        </div>
      </div>

      {/* NAme */}
      <div style={{ textAlign: "center", fontWeight: "bold" }}>{userProfile?.username}</div>

      {/* Bio */}
      <div style={{ textAlign: "center" }}>{userProfile?.bio}</div>
    </div>
  )
}

export default ProfileHeader
