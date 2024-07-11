import bcrypt from "bcrypt"
import User from "./user.model.js"

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