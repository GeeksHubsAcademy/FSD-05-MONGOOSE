import { Router } from 'express'
import { router as gamesRoutes} from './entities/games/games.routes.js'

const router = Router()

router.use('/games', gamesRoutes)

export { router }