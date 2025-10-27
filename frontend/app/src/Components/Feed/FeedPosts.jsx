
import ProfilePost from "../Profile/ProfilePost";

const FeedPosts = ({ posts }) => {
    return (
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "20px",
          paddingBottom: "40px",
          minHeight: "calc(100vh - 60px)",
          backgroundColor: "#fafafa",
          margin: "20px"
        }}>
        {posts.map((post) => (
          <ProfilePost 
            key={post.id} 
            post={post} 
            userProfile={post.createdBy}
            showHeader={true}
          />
        ))}
      </div>
    );
  };

export default FeedPosts;