const express = require('express');
const Setting = require('../../models/Setting');

const logger = require('../../debugging/logger');

const router = express.Router();

// @route POST api/settings/update
// @desc Processes file uploads
// @access Public
router.post('/update', (req, res) => {
  const toUpdate = Object.entries(req.body);

  res.status(200).json({ msg: 'success' });

  toUpdate.forEach((value) => {
    Setting.findOneAndUpdate(
      { name: value[0] },
      { value: value[1] },
      {
        new: true,
        upsert: true,
        useFindAndModify: false,
      },
    )
      .catch((err) => logger.error(err));
  });
});

// @route POST api/settings/get
// @desc Processes file uploads
// @access Public
router.post('/get', (req, res) => {
  const { name } = req.body;
  Setting.findOne(
    { name },
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => logger.error(err));
});

// @route POST api/settings/getMultiple
// @desc Processes file uploads
// @access Public
router.post('/getMultiple', (req, res) => {
  const { name } = req.body;
  const settings = name.split(', ');
  Setting.find(
    { name: { $in: settings } },
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => logger.error(err));
});

// @route GET api/settings/list
// @desc Processes file uploads
// @access Public
router.get('/list', (req, res) => {
  Setting.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => logger.error(err));
});

// @route GET api/settings/galleryCode
// @desc Processes file uploads
// @access Public
router.post('/galleryCode', (req, res) => {
  const { name, code } = req.body;
  Setting.findOne(
    { name },
  )
    .then((result) => {
      const equal = result.value === code;
      res.json({ equal });
    })
    .catch((err) => logger.error(err));
});

module.exports = router;
