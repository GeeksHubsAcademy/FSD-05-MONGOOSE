import { Router } from 'express'
import { createGame, deleteGame, getAllGames } from './games.controller.js'

const router = Router()

router.post('/', createGame)
router.get('/', getAllGames)
router.delete('/:id', deleteGame)

export { router }