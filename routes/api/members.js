const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

const members = require('../../Members');

// Get all members
router.get('/', (req, res) => res.json(members));

// Get single member
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const member = members.filter(member => (member.id).toString() === id);
  const isMember = member.length > 0 ? true : false;
  if (isMember) {
    res.json(member);
  } else {
    res.status(400).json({ msg: `No member found with id of ${id}` });
  }
});

// Create Member
router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ msg: 'Please include a name and an email' });
  }
  const newMember = {
    id: uuidv4(),
    name,
    email,
    status: 'active'
  };
  members.push(newMember);
  res.send({ msg: 'Member registred' });
});

module.exports = router;
