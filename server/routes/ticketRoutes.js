const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const authMiddleware = require("../middleware/authMiddleware");

// Create Ticket
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      createdBy: req.user.id
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get User Tickets
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user.id });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Ticket Status (basic for now)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;