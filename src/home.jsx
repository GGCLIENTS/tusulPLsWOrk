import "./home.css";
import logo from "./images/logo.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import backgroundImage from './images/BakgroundPicture.jpg';

function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [postText, setPostText] = useState("");
  const [preview, setPreview] = useState(null);
  const [posts, setPosts] = useState([]);
  const [toast, setToast] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editImage, setEditImage] = useState(null);

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
      id: Date.now().toString(),
      user: currentUser ? currentUser.email : "Guest",
      avatar: currentUser
        ? currentUser.photoURL
        : "https://cdn-icons-png.flaticon.com/512/147/147144.png",
      content: postText,
      image: preview,
      createdAt: new Date(),
    };
    setPosts((prev) => [newPost, ...prev]);
    setPostText("");
    setPreview(null);
    showToast("Пост амжилттай нэмэгдлээ!");
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleDeletePost = (postId) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
    showToast("Пост устгагдлаа!");
  };

  const handleEditPost = (post) => {
    setEditingPostId(post.id);
    setEditText(post.content || "");
    setEditImage(post.image || null);
  };

  const handleSaveEdit = () => {
    if (!editText && !editImage) return;

    setPosts((prev) =>
      prev.map((post) =>
        post.id === editingPostId
          ? { ...post, content: editText, image: editImage }
          : post
      )
    );
    setEditingPostId(null);
    setEditText("");
    setEditImage(null);
    showToast("Пост засагдлаа!");
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditImage(imageUrl);
    }
  };

  return (
    <div className="home-container">
      <div className="particles"></div>
      {toast && <div className="toast">{toast}</div>}

      <div className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-left">
          <img src={logo} alt="logo" className="logo" />
          {["Contact", "Chats"].map((link) => (
            <a
              key={link}
              className="nav-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                showToast(`${link} Одоогоор ашиглалт нд байхгүй!`);
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {currentUser ? (
          <div className="header-right">
            <img src={currentUser.photoURL} alt="profile" className="profile-img" />
            <span className="profile-email">{currentUser.email}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Гарах
            </button>
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>
            нэвтэрх
          </button>
        )}
      </div>

      <div className="main-content">
        {currentUser ? (
          <>
            <form onSubmit={handlePostSubmit} className="post-form">
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="post-textarea"
              />
              <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
              {preview && <img src={preview} alt="preview" className="preview-img" />}
              <button type="submit" className="submit-btn">
                Илгээх
              </button>
            </form>

            <div className="posts-container">
              {posts.map((post) => (
                <div key={post.id} className="post">
                  <div className="post-header">
                    <img src={post.avatar} alt="user" className="avatar" />
                    <p className="user-name">{post.user}</p>
                    {currentUser && post.user === currentUser.email && (
                      <div className="post-actions">
                        <button className="edit-btn" onClick={() => handleEditPost(post)}>
                          Засах
                        </button>
                        <button className="delete-btn" onClick={() => handleDeletePost(post.id)}>
                          Устгах
                        </button>
                      </div>
                    )}
                  </div>

                  {editingPostId === post.id ? (
                    <div className="edit-form">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="edit-textarea"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditImageChange}
                        className="edit-file-input"
                      />
                      {editImage && <img src={editImage} alt="edit preview" className="edit-preview" />}
                      <div className="edit-actions">
                        <button className="save-btn" onClick={handleSaveEdit}>
                          Хадгалах
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => {
                            setEditingPostId(null);
                            setEditText("");
                            setEditImage(null);
                          }}
                        >
                          Цуцлах
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {post.content && (
                        <p className={`post-content ${!post.image ? 'no-image' : ''}`}>
                          {post.content}
                        </p>
                      )}
                      {post.image && <img src={post.image} alt="post" className="post-img" />}
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <h2 className="not-logged-in">Нэвтэрж байж ашиглана уу.</h2>
        )}
      </div>
    </div>
  );
}

export default Home;
