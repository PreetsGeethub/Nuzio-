const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = require("../data/users");


// ==========================================
// REGISTER
// ==========================================

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    // ------------------------------
    // Validation
    // ------------------------------

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }


    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }


    // ------------------------------
    // Check existing user
    // ------------------------------

    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }


    // ------------------------------
    // Hash password
    // ------------------------------

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    // ------------------------------
    // Create user
    // ------------------------------

    const user = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      preferences: null,
      createdAt: new Date().toISOString(),
    };


    users.push(user);


    // ------------------------------
    // Response
    // ------------------------------

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.error("Register error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


// ==========================================
// LOGIN
// ==========================================

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }
  
      const user = users.find(
        (user) => user.email === email.toLowerCase()
      );
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password
      );
  
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      const { password: _, ...userWithoutPassword } = user;
  
      res.json({
        success: true,
        message: "Login successful",
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  };


const getMe = (req, res) => {
    const { password, ...userWithoutPassword } = req.user;
  
    res.json({
      success: true,
      user: userWithoutPassword,
    });
  };
  
  module.exports = {
    register,
    login,
    getMe,
  };