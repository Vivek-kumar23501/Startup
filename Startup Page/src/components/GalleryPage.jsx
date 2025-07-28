// components/GalleryPage.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Spinner,
  Alert
} from "reactstrap";
import axios from "axios";
import GecNavbar from "./Navbar";
import "./GalleryPage.css"; // ✅ You’ll create this file

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/institute/gallery");
      setPhotos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Error loading gallery:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <>
      <GecNavbar />
      <Container className="my-5">
        <h2 className="text-center mb-4">📸 Startup Cell Gallery</h2>
        {loading ? (
          <div className="text-center"><Spinner color="primary" /></div>
        ) : photos.length === 0 ? (
          <Alert color="info">No photos available yet.</Alert>
        ) : (
          <div className="gallery-grid">
            {photos.map((photo) => (
              <div key={photo._id} className="gallery-item">
                <img
                  src={photo.image}
                  alt={photo.caption || "Gallery Image"}
                  className="gallery-img"
                />
                {photo.caption && <div className="caption">{photo.caption}</div>}
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default GalleryPage;
