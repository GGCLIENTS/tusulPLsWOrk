import "./home.css";
import logo from "./images/logo.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [postText, setPostText] = useState("");
  const [preview, setPreview] = useState(null);
  const [posts, setPosts] = useState([]);
  const [toast, setToast] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          email: user.email,
          photoURL:
            user.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/147/147144.png",
        });
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!postText && !preview) return;

    const newPost = {
      id: Date.now(),
      user: currentUser ? currentUser.email : "Guest",
      avatar: currentUser
        ? currentUser.photoURL
        : "https://cdn-icons-png.flaticon.com/512/147/147144.png",
      content: postText,
      image: preview,
    };

    setPosts((prev) => [newPost, ...prev]);
    setPostText("");
    setPreview(null);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "#fff",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.8)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "12px",
            zIndex: 1000,
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          {toast}
        </div>
      )}

      {/* Navbar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "8px 32px" : "14px 32px", // 👈 added more padding
          background: scrolled
            ? "rgba(0,0,0,0.6)"
            : "rgba(255,255,255,0.1)",
          backdropFilter: "blur(14px)",
          borderRadius: "0 0 12px 12px",
          boxShadow: scrolled
            ? "0 4px 20px rgba(0,0,0,0.3)"
            : "0 4px 12px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
          zIndex: 999,
          boxSizing: "border-box", // 👈 ensures padding doesn’t overflow
        }}
      >
        {/* Left */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img
            src={logo}
            alt="logo"
            style={{
              width: scrolled ? "45px" : "60px",
              height: scrolled ? "45px" : "60px",
              borderRadius: "12px",
              transition: "0.3s ease",
            }}
          />
          {["Contact", "Chats"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                textDecoration: "none",
                color: "#fff",
                fontWeight: "500",
                padding: "6px 12px",
                borderRadius: "8px",
                transition: "0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.2)")
              }
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
              onClick={(e) => {
                e.preventDefault();
                showToast(`${link} Одоогоор ашиглалт нд байхгүй!`);
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right */}
        {currentUser ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(255,255,255,0.15)",
              padding: "6px 12px",
              borderRadius: "12px",
              flexShrink: 0, // 👈 prevents squishing on smaller screens
              maxWidth: "100%",
            }}
          >
            <img
              src={currentUser.photoURL}
              alt="profile"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <span
              style={{
                fontWeight: "500",
                fontSize: "0.9rem",
                whiteSpace: "nowrap",
              }}
            >
              {currentUser.email}
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: "#ff6b6b",
                border: "none",
                padding: "6px 12px",
                borderRadius: "8px",
                color: "#fff",
                cursor: "pointer",
                transition: "0.2s",
                whiteSpace: "nowrap", // 👈 ensures button text doesn't break
              }}
              onMouseEnter={(e) => (e.target.style.opacity = 0.8)}
              onMouseLeave={(e) => (e.target.style.opacity = 1)}
            >
              Гарах
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "#4c51bf",
              border: "none",
              padding: "8px 16px",
              borderRadius: "12px",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "500",
              transition: "0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = 0.85)}
            onMouseLeave={(e) => (e.target.style.opacity = 1)}
          >
            нэвтэрх
          </button>
        )}
      </div>

      {/* Content (add padding-top for navbar height) */}
      <div style={{ paddingTop: "100px" }}>
        {currentUser ? (
          <>
            {/* Post Form */}
            <form
              onSubmit={handlePostSubmit}
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
                padding: "1rem",
                marginBottom: "30px",
                width: "100%",
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <textarea
                placeholder="Бичих....."
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  resize: "none",
                  minHeight: "60px",
                  fontSize: "1rem",
                }}
              />
              <input type="file" accept="image/*" onChange={handleImageChange} />

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.4)",
                    objectFit: "contain",
                    maxHeight: "100%",
                  }}
                />
              )}

              <button
                type="submit"
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#4c51bf",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Илгээх
              </button>
            </form>

            {/* Posts */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              {posts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "12px",
                    padding: "15px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <img
                      src={post.avatar}
                      alt="user"
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        border: "1px solid #fff",
                      }}
                    />
                    <p style={{ fontWeight: "bold", fontSize: "0.95rem" }}>
                      {post.user}
                    </p>
                  </div>

                  {post.content && (
                    <p
                      style={{
                        marginBottom: post.image ? "10px" : "0",
                        fontSize: "0.95rem",
                      }}
                    >
                      {post.content}
                    </p>
                  )}

                  {post.image && (
                    <img
                      src={post.image}
                      alt="post"
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                        border: "1px solid rgba(255,255,255,0.4)",
                        objectFit: "contain",
                        maxHeight: "100%",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <h2
            style={{
              textAlign: "center",
              marginTop: "100px",
              color: "#fff",
              opacity: 0.9,
            }}
          >
            Нэвтэрж байж ашиглана уу.
          </h2>
        )}
      </div>
    </div>
  );
}

export default Home;
