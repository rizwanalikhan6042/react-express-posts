const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('./config');
const User = require('./users'); 
const Post = require('./postModal');

const app = express();

const JWT_SECRET = 'e-comm-secret-key';

app.use(cors());
app.use(express.json());

// User Registration
app.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ emailAddress });

    if (existingUser) {
      return res.status(400).json({ message: 'Email address already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      emailAddress,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '2h' });
    // Return success response with token
    res.status(201).json({ message: 'User registered successfully', token });
    // res.send({ result, auth: token });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    // Find the user by email address
    const user = await User.findOne({ emailAddress });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2h' });

    // Return success response with token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Endpoint to handle password reset request
app.post('/forgot-password', async (req, res) => {
  const { emailAddress } = req.body;
  try {


    // Find user by email address
    const user = await User.findOne({ emailAddress });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate password reset token
   app.post('/forgot-password', async (req, res) => {
  const { emailAddress } = req.body;
  try {


    // Find user by email address
    const user = await User.findOne({ emailAddress });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate password reset token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '30m' });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'alikha###@gmail.com',              //we have to paste here our email and app password 
        pass: '########',                         // I didnt written for privacy 
      },
    });
    // Send password reset email
    const resetLink = `http://localhost:3200/reset-password/${token}`;
    await transporter.sendMail({
      from: 'alikha###@gmail.com',
      to: emailAddress,
      subject: 'Password Reset Request',
      html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    });

    res.status(200).json({ message: 'Password reset email sent', token });
  } catch (error) {
    console.error('Error initiating password reset:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to handle password reset token verification and password update
app.post('/reset-password/:token' ,async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {

     console.log(token);
    // Verify token
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // Find user by token
    const user = await User.findOne({ _id: decodedToken.userId });

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Update user's password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Fetch Posts
app.get('/posts', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch posts with pagination
    const posts = await Post.find().skip(skip).limit(limit);

    // Return posts
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Endpoint to handle password reset request
app.post('/forgot-password', async (req, res) => {
  const { emailAddress } = req.body;
  try {


    // Find user by email address
    const user = await User.findOne({ emailAddress });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate password reset token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '30m' });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'alikha394@gmail.com',
        pass: 'vowe qbox cnra sqav',
      },
    });
    // Send password reset email
    const resetLink = `http://localhost:3200/reset-password/${token}`;
    await transporter.sendMail({
      from: 'alikha394@gmail.com',
      to: emailAddress,
      subject: 'Password Reset Request',
      html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    });

    res.status(200).json({ message: 'Password reset email sent', token });
  } catch (error) {
    console.error('Error initiating password reset:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to handle password reset token verification and password update
app.post('/reset-password/:token' ,async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {

     console.log(token);
    // Verify token
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // Find user by token
    const user = await User.findOne({ _id: decodedToken.userId });

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Update user's password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
}

// Start server
app.listen(3200, () => {
  console.log("port connected")
});
