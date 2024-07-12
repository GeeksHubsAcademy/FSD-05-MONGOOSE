import bcrypt from "bcrypt"
import User from "./user.model.js"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validar

    // Tratar info
    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS))

    const newUSer = await User.create(
      {
        email: email,
        password: hashedPassword
      }
    )

    res.status(201).json(
      {
        success: true,
        message: "User registered",
        data: newUSer
      }
    )        
  } catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "Error registering user", 
        error: error.message
      }
    )
  }
}

export const login = async (req, res) =>{
  try {
    const { email, password } = req.body

    // validaciones

    const user = await User.findOne(
      {
        email: email
      }
    )

    if(!user) {
      return res.status(400).json(
        {
          success: false,
          message: "user or password invalid"
        }
      )
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if(!isPasswordValid){
      return res.status(400).json(
        {
          success: false,
          message: "user or password invalid"
        }
      )
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h"
      }
    )

    console.log(user);
    res.status(200).json(
      {
        success: true,
        message: "user Logged",
        token: token
      }
    )
  } catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "Error loging user",
        error: error.message
      }
    )
  }
}