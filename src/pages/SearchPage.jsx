import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h2>ผลการค้นหา: "{q}"</h2>

      {filtered.length === 0 && <p>ไม่พบข้อมูล</p>}

      {filtered.map((post) => (
        <div key={post.id} style={{ marginBottom: "1rem" }}>
          <Link to={`/posts/${post.id}`}>
            <strong>{post.title}</strong>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SearchPage;
