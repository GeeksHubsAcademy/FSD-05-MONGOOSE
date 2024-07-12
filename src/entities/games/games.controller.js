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

export const getAllGames = async (req, res) => {
  try {
    const games = await Game.find()
      .select('-updatedAt')
      .populate({
        path: 'userFavourites',
        select: "-password"
      })

    res.status(200).json(
      {
        success: true,
        message: "Games retrieved successfully",
        data: games
      }
    )

  } catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "Error retrieving games",
        error: error.message
      }
    )
  }
}

export const deleteGame= async(req, res) =>{
  try {
      const idDelete= req.params.id
      const idToDeleteValid= Types.ObjectId.isValid(idDelete)
      if(!idToDeleteValid){
          return res.status(400).json({
              success:false,
              message:"Id not valid"
          })
      }
      const deletedGame =await Game.findByIdAndDelete(idDelete)
      if(!deletedGame){
          return res.status(404).json({
              succes:false,
              message:"Not Game found"
          })
      }
      res.status(200).json({
          success:true,
          message:"Game deleted",
      })
      
  } catch (error) {
      return res.status(500).json({
          success:false,
          message:"Error deleting games",
          error:error.message
      })
  }
}

export const addFavouriteGame = async (req, res) => {
  try {
    const gameId = req.params.id
    const userId = req.tokenData.id
    

    const game = await Game.findById(gameId)

    console.log(game);

    if(!game) {
      return res.status(404).json(
        {
          success: false,
          message: "Game not found"
        }
      )
    }

    // game.userFavourites.includes(userId)
    game.userFavourites.push(userId)
    const updateGame = await game.save()

    res.json({
      success: true,
      message: "User added to favourite game",
      data: updateGame
    })    
  } catch (error) {
    res.status(500).json(
      {
        succes: false,
        message: "error adding user to favourite",
        error: error.message
      }
    )
  }
}