
const userModel = require('../models/userModel');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await userModel.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await userModel.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async createUser(req, res) {
    const { name, email } = req.body;
    try {
      const newUser = await userModel.createUser(name, email);
      res.status(201).json({ message: 'User created successfully', id: newUser.id });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const { email } = req.body;
    try {
      const updatedUser = await userModel.updateUser(id, email);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully', email: updatedUser.email });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const deletedUser = await userModel.deleteUser(id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
