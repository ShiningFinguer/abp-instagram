import React, { useEffect, useState } from "react";

const ProfileHeaderOwn = () => {
  const [userProfile, setUserProfile] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [profile, setProfile] = useState(userProfile);
  const token = sessionStorage.getItem("token");

  const fetchUserProfile = async () => {

    try {
      const res = await fetch("http://localhost:3001/api/users/me", {
        headers: {
          'Authorization': `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setUserProfile(data);
        console.log(data)
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserProfile(); 
  }, []);

  const EditProfileForm = ({ onClose, onProfileUpdated }) => {
    const [formData, setFormData] = useState({
      username: userProfile.username || '',
      email: userProfile.email || '',
      profilePic: userProfile.profilePic || '',
      bio: userProfile.bio || '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`http://localhost:3001/api/users/${userProfile._id}/profile`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
  
        if (res.ok) {
          alert('Perfil actualizado correctamente');
          onProfileUpdated(data.user); 
          onClose();
        } else {
          alert(data.error || 'Error al actualizar el perfil');
        }
      } catch (err) {
        console.error(err);
        alert('Error del servidor');
      }
      fetchUserProfile(); 

    };
  
    return (
      <div className="modal-backdrop">
        <div className="modal">
          <h2>Editar perfil</h2>
          <form onSubmit={handleSubmit}>
            <label>Nombre de usuario:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
  
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
  
            <label>Foto de perfil (URL):</label>
            <input
              type="text"
              name="profilePic"
              value={formData.profilePic}
              onChange={handleChange}
            />
  
            <label>Biografía:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
  
            <div className="form-buttons">
              <button type="submit">Guardar cambios</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
  
        {/* Estilos rápidos */}
        <style jsx>{`
          .modal-backdrop {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.6);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .modal {
            background: white;
            border-radius: 10px;
            padding: 20px;
            width: 400px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
          }
          .form-buttons {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
          }
          input, textarea {
            width: 100%;
            margin-bottom: 10px;
            padding: 8px;
          } 
        `}</style>
      </div>
    );
  };
  


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "2rem" }}>
      {/*Profile Picture */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={userProfile?.profilePic}
          alt="Profile"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
      </div>

      {/* Username and Follow */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
        <h2>{userProfile?.username}</h2>
        <button onClick={() => setShowEditForm(true)}>Editar perfil</button>        
        {showEditForm && (
        <EditProfileForm
          userProfile={profile}
          onClose={() => setShowEditForm(false)}
          onProfileUpdated={setProfile}
        />
      )}
      </div>

      {/* Profile Info */}
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
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
  );
};

export default ProfileHeaderOwn;