// components/InstituteGalleryUpload.jsx
import React, { useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import InstituteNavbar from "./instutenavbar"; // Importing the Institute Navbar

const InstituteGalleryUpload = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setAlert({ type: "danger", message: "Please select an image" });
      return;
    }

    try {
     const res = await fetch("http://localhost:5000/api/institute/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image, caption }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert({ type: "success", message: "Photo uploaded successfully" });
        setCaption("");
        setImage(null);
      } else {
        setAlert({ type: "danger", message: data.error || "Upload failed" });
      }
    } catch (err) {
      console.error("❌ Upload error:", err);
      setAlert({ type: "danger", message: "Something went wrong" });
    }
  };

  return (
    <>
     <InstituteNavbar/>
      <Container className="my-5">
        <h2 className="mb-4 text-center">📤 Upload Photo to Gallery</h2>
        {alert.message && <Alert color={alert.type}>{alert.message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="image">Select Image</Label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </FormGroup>
          <FormGroup>
            <Label for="caption">Caption</Label>
            <Input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Optional caption..."
            />
          </FormGroup>
          <Button color="primary" type="submit">
            Upload
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default InstituteGalleryUpload;
