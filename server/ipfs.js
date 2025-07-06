const express = require('express');
const multer = require('multer');
const { create } = require('ipfs-http-client');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'server/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Infura IPFS client
const projectId = process.env.INFURA_PROJECT_ID;
const projectSecret = process.env.INFURA_PROJECT_SECRET;
const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const filePath = req.file.path;
    const fileStream = fs.createReadStream(filePath);
    const { cid } = await ipfs.add(fileStream);
    const fileUrl = `https://ipfs.infura.io/ipfs/${cid}`;
    // Optionally, create metadata and upload as well
    // const metadata = { ... };
    // const { cid: metaCid } = await ipfs.add(JSON.stringify(metadata));
    // const metadataUri = `https://ipfs.infura.io/ipfs/${metaCid}`;
    // For now, just return fileUrl and cid
    res.json({ cid: cid.toString(), fileUrl });
    // Clean up local file
    fs.unlink(filePath, () => {});
  } catch (err) {
    console.error('IPFS upload error:', err);
    res.status(500).json({ error: 'IPFS upload failed' });
  }
});

module.exports = router; 