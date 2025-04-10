// routes/urlRoutes.ts

import { Router } from 'express'
import { controller } from '../controllers'


const router = Router()

router.post('/shorten', controller.shortenUrl)
router.get('/:slug', controller.redirectUrl.bind)
router.get('/links', controller.getAllLinks.bind);

export default router
