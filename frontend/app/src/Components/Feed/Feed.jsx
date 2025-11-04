import Navbar from "../NavBar/Navbar";
import FeedPosts from "./FeedPosts";
import grayimage from "../../Assets/defaultPicture.PNG";
import defaultPicture from "../../Assets/userDefault.png";

const dummyPosts = [
    {
      id: 1,
      imageURL: grayimage,
      caption: "Beautiful mountain view! 🏔️",
      likes: ["user1", "user2", "user3"],
      comments: [
        { id: 1, username: "alice", text: "Amazing photo!", createdAt: "2h ago" },
        { id: 2, username: "bob", text: "Love it!", createdAt: "1h ago" }
      ],
      createdAt: "1 day ago",
      createdBy: {
        username: "naturelover",
        profilePicURL: defaultPicture
      }
    },
    {
      id: 2,
      imageURL: grayimage,
      caption: "Nature is beautiful 🌿",
      likes: ["user1", "user2"],
      comments: [
        { id: 3, username: "charlie", text: "Stunning!", createdAt: "3h ago" }
      ],
      createdAt: "2 days ago",
      createdBy: {
        username: "explorer",
        profilePicURL: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150"
      }
    },
    {
      id: 3,
      imageURL: grayimage,
      caption: "Sunset vibes 🌅",
      likes: ["user1"],
      comments: [],
      createdAt: "3 days ago",
      createdBy: {
        username: "sunsetlover",
        profilePicURL: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
      }
    }
  ];

const Feed = () => {
    return (
      <div style={{
        width: "100vw",   
        height: "100vh",
        margin: "0",
        padding: "0",
    }}>
        <Navbar />
        <FeedPosts posts={dummyPosts} />
      </div>
    );
  };
  
  export default Feed;