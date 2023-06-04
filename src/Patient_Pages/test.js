import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const UploadFile = () => {
  //! For UploadFile Validation
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Please select a valid image file (JPEG, PNG, or GIF).");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle file submission logic here
    if (file) {
      console.log("File:", file);
      // Perform further actions with the file, such as uploading to a server
    } else {
      setError("Please select a file to upload.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Upload Image</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleChange} />
        <Form.Text className="text-danger">{error}</Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Upload
      </Button>
    </Form>
  );
};
