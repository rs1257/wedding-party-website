const express = require("express");
const logger = require('../../debugging/logger');
const nodemailer = require('nodemailer');

const isEmpty = require('../../validation/is-empty');

const router = express.Router();
const Rsvp = require("../../models/Rsvp");

// @route POST api/rsvp/respond
// @desc Send Rsvp response to server
// @access Public
router.post('/respond', (req, res) => {
  const { errors, name, canAttend, starter, main, dessert, additionalNotes } = req.body;

  if (isEmpty(name)) {
    errors.name = 'Name is required';
    return res.status(404).json(errors);
  }

  const update = {
    name,
    attending: canAttend,
    menuChoices: { starter, main, dessert },
    additionalNotes,
  };

  Rsvp.findOneAndUpdate({ name }, update, { new: true, useFindAndModify: false }) // is this an issue????? As this will replace existing ones??
    .then((guest) => {
      logger.info(guest);
      if (!guest) {
        errors.name = 'Guest not found';
        return res.status(404).json(errors);
      }
      return res.json({ msg: 'success' });
    })
    .catch((err) => logger.error(err));
});

// @route POST api/rsvp/add
// @desc Add Rsvp user
// @access Public // TODO should this be private?
router.post('/add', (req, res) => {
  const { errors, name, canAttend, additionalNotes } = req.body;

  if (isEmpty(name)) {
    errors.name = 'Name is required';
    return res.status(404).json(errors);
  }

  const newGuest = new Rsvp({
    name,
    attending: canAttend,
    additionalNotes,
  });

  newGuest.save()
    .then((next) => {
      logger.info(next);
      if (process.env.NODE_ENV === 'production') {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.email,
            pass: process.env.password,
          },
          tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
          },
        });

        const mailOptions = {
          from: process.env.email,
          to: process.env.email,
          subject: 'You have a new RSVP response',
          text: `${next.name} has responded with ${next.attending}.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            logger.error(error);
          } else {
            logger.info(`Email sent: ${info.response}`);
          }
        });
      }

      return res.status(200).json({});
    })
    .catch((err) => logger.error(err));
});

// @route POST api/rsvp/edit
// @desc Edit Rsvp user
// @access Public // TODO should this be private?
router.post('/edit', (req, res) => {
  const { errors, name, canAttend, starter, main, dessert, additionalNotes } = req.body;

  const update = {
    name,
    attending: canAttend,
    menuChoices: { starter, main, dessert },
    additionalNotes,
  };
  Rsvp.findByIdAndUpdate({ _id: req.body.id }, update)
    .then((guest) => {
      logger.info(guest);
      if (!guest) {
        errors.name = 'Guest not found';
        return res.status(404).json(errors);
      }
      return res.json({ msg: 'success' });
    })
    .catch((err) => logger.error(err));
});

// @route POST api/rsvp/delete
// @desc Edit Rsvp user
// @access Public // TODO should this be private?
router.post('/delete', (req, res) => {
  Rsvp.findByIdAndDelete({ _id: req.body.id })
    .then((guest) => {
      logger.info(guest);
      if (!guest) {
        return res.status(404);
      }
      return res.json({ msg: 'success' });
    })
    .catch((err) => logger.error(err));
});

// @route GET api/rsvp/list
// @desc List all guests
// @access Public
router.get('/list', (req, res) => {
  Rsvp
    .find()
    .then((guests) => res.json(guests))
    .catch((err) => logger.error(err));
});

// @route GET api/rsvp/list
// @desc List all guests by attendance
// @access Public
router.post('/list', (req, res) => {

  const { attending } = req.body;

  logger.error(attending);
  let search = {};
  if (attending !== 'all') {
    search = { attending };
  }

  Rsvp
    .find(search)
    .then((guests) => res.json(guests))
    .catch((err) => logger.error(err));
});

module.exports = router;
