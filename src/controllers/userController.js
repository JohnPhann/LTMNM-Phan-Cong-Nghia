const User = require('../model/userModel');
const path = require('path');
const fs = require('fs');

const users = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    age: 25,
    gender: "male"
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    age: 30,
    gender: "female"
  },
  {
    id: 3,
    name: "Lê Hoàng C",
    email: "lehoangc@example.com",
    age: 22,
    gender: "male"
  },
  {
    id: 4,
    name: "Phạm Minh D",
    email: "phamminhd@example.com",
    age: 28,
    gender: "male"
  },
  {
    id: 5,
    name: "Đặng Thùy E",
    email: "dangthuye@example.com",
    age: 26,
    gender: "female"
  }
];

exports.getAllUsers = async (req, res) => {
  try {
    res.render('users', { users });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
    res.send(`Thông tin user ID: ${req.params.id}`);
};

exports.createUser = async (req, res) => {
    res.send('Tạo user mới');
};

exports.updateUser = async (req, res) => {
    res.send(`Cập nhật user ID: ${req.params.id}`);
};

exports.deleteUser = async (req, res) => {
    res.send(`Xóa user ID: ${req.params.id}`);
};
