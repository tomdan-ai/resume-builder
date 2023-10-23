const express = require('express');
const app = express();
const port = 3001; // Choose a port of your preference
const pdf = require('html-pdf'); // Include the html-pdf library

app.use(express.json());

app.post('/generate-pdf', (req, res) => {
  const formData = req.body; // Assuming your form data is sent as JSON

  // Create an HTML template with the form data
  const htmlTemplate = `
    <html>
      <body>
        <h1>Resume</h1>
        <p>Name: ${formData.name}</p>
        <p>Email: ${formData.email}</p>
        <p>Phone: ${formData.phone}</p>
        <p>Education: ${formData.education}</p>
        <p>Experience: ${formData.experience}</p>
      </body>
    </html>
  `;

  // Configure options for pdf creation
  const pdfOptions = { format: 'Letter' };

  // Generate the PDF
  pdf.create(htmlTemplate, pdfOptions).toBuffer((err, buffer) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error generating PDF');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
      res.send(buffer);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
