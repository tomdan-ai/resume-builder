import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'; // Import Axios

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the backend to generate the PDF
      const response = await axios.post('/generate-pdf', formData, {
        responseType: 'blob', // Receive the response as a blob (binary)
      });

      // Create a blob URL for the PDF to display it
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // Create a link to display the PDF for preview
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.download = 'resume.pdf';

      // Simulate a click to open the PDF for preview
      link.click();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Education"
        name="education"
        multiline
        rows={4}
        value={formData.education}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Experience"
        name="experience"
        multiline
        rows={4}
        value={formData.experience}
        onChange={handleChange}
        fullWidth
      />
      <Button variant="contained" color="primary" type="submit">
        Generate Resume
      </Button>
    </form>
  );
};

export default ResumeForm;
