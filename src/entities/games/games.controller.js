import Game from "./game.model.js"

export const createGame = async (req, res) => {
  try {
    console.log(1);
    const { title, description } = req.body

    if( !title || !description) {
       throw new Error('Title and description are required')
    }
    
    const newGame = await Game.create({
      title: title,
      description: description
    })

    res.status(201).json(
      {
        success: true,
        message: "Game created",
        data: newGame
      }
    )
  } catch (error) {
    if(error.message === 'Title and description are required') {
      return res.status(400).json(
        {
          success: false,
          message: "Error creating game",
          error: error.message
        }
      )
    }

    res.status(500).json(
      {
        success: false,
        message: "Error creating game",
        error: error.message
      }
    )
  }
} 