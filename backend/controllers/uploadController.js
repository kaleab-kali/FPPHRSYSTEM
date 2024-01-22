
const path = require('path');
const fs = require('fs');

const uploadsFolder = path.join(__dirname, 'uploads');

const handleFileUpload = (req, res) => {
  const employeeId = req.body._id;
  const employeeFolder = path.join(uploadsFolder, employeeId);
  const destinationPath = path.join(employeeFolder, req.file.filename);

  if (!fs.existsSync(employeeFolder)) {
    fs.mkdirSync(employeeFolder, { recursive: true });
  }

  fs.renameSync(req.file.path, destinationPath);

  res.json({ message: 'File uploaded successfully.' });
};

module.exports = { handleFileUpload };
