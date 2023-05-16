const express = require('express');
const router = express.Router();
import { userRoute } from './usersRoute';

router.use('/users', userRoute);

export const apiRoute = router;