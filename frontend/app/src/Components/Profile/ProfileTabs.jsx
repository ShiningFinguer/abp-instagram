const ProfileTabs = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: "40px",
      textTransform: "uppercase",
      fontWeight: "bold"
    }}>
      {/* Posts */}
      <div style={{
        borderTop: "2px solid black",
        display: "flex",
        alignItems: "center",
        padding: "10px",
        gap: "5px",
        cursor: "pointer"
      }}>
        <span style={{ fontSize: "12px", display: "inline-block" }}>Posts</span>
      </div>

      {/* Tags */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        gap: "5px",
        cursor: "pointer"
      }}>
        <span style={{ fontSize: "12px", display: "inline-block" }}>Tags</span>
      </div>

    </div>
  );
};

export default ProfileTabs;
