import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";

function PostList({ favorites, onToggleFavorite }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  async function loadPosts() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );

      if (!response.ok) throw new Error("โหลดข้อมูลโพสต์ไม่สำเร็จ");

      const result = await response.json();
      setPosts(result.slice(0, 20));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <LoadingSpinner />;

  if (error) {
    return <p style={{ color: "#c53030" }}>เกิดข้อผิดพลาด: {error}</p>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "#2d3748",
            borderBottom: "2px solid #1e40af",
            paddingBottom: "0.5rem",
          }}
        >
          โพสต์ล่าสุด
        </h2>

        <button
          onClick={loadPosts}
          style={{
            background: "#edf2f7",
            border: "1px solid #cbd5e0",
            padding: "0.4rem 0.8rem",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          🔄 โหลดใหม่
        </button>
      </div>

      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
        }}
      />

      {filtered.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;
