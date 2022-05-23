const express = require('express');
const multer = require('multer');
const fs = require('fs');
const archiver = require('archiver');
const logger = require('../../debugging/logger');

const router = express.Router();

const imagesDir = 'images';
const imagesZipDir = 'imagesDownload';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).array('file');

// @route POST api/files/upload
// @desc Processes file uploads
// @access Public
router.post('/upload', (req, res) => {
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
  }

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send('Success');
  });
});

// @route GET api/files/list
// @desc List all picture filenames
// @access Public
router.get('/list', (req, res) => {
  fs.readdir('images', (err, files) => {
    res.json(files);
  });
});

// @route GET api/files/download
// @desc Zip images and then download them
// @access Public
router.get('/download', (req, res) => {
  if (!fs.existsSync(imagesZipDir)) {
    fs.mkdirSync(imagesZipDir);
  }
  const filepath = `${imagesZipDir}/${Date.now()}.zip`;
  const output = fs.createWriteStream(filepath);
  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  output.on('close', () => {
    logger.info(`${archive.pointer()} total bytes`);
    logger.info('archiver has been finalized and the output file descriptor has closed.');
    
    res.download(filepath, (err) => {
      if (err) throw err;
      fs.unlink(filepath, (error) => {
        if (error) throw error;
        logger.info(`${filepath} was deleted`);
      });
    });
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);

  archive.directory(imagesDir, false);
  archive.finalize();
});

module.exports = router;
