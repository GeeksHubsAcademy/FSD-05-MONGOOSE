import { Router } from 'express'
import { router as gamesRoutes} from './entities/games/games.routes.js'
import { router as usersRoutes } from './entities/users/users.routes.js'
import { commentRouter } from './entities/comments/comments.routes.js'

const router = Router()

router.use('/games', gamesRoutes)
router.use('/users', usersRoutes)
router.use('/comments', commentRouter)

export { router }