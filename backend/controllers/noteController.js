const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");

const getNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Unathorized");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unathorized");
  }
  const notes = await Note.find({ ticket: req.params.ticketId });
  res.status(200).json(notes);
});

const addNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Unathorized");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unathorized");
  }
  const note = await Note.create({
    user: req.user.id,
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
  });
  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNotes,
};
