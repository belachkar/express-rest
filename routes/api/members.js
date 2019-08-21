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

// Update Member
router.put('/:id', (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    if ((member.id).toString() === id) {
      const name = req.body.name ? req.body.name : member.name;
      const email = req.body.email ? req.body.email : member.email;
      const status = req.body.status ? req.body.status : member.status;
      const newMember = { id, name, email, status };
      members[i] = newMember;
      return res.json({ msg: 'Member updated successfully.', member });
    }    
  }
  return res.status(400).json({ msg: `No member found with id of ${id}` });  
});

// Delete member
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    if ((member.id).toString() === id) {
      members.splice(i, 1);
      return res.json({ msg: 'Member deleted successfully.', member });
    }
  }
  return res.status(400).json({ msg: `No member found with id of ${id}` }); 
});

module.exports = router;
