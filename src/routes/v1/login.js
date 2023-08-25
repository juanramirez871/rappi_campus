import {createToken} from '../../middlewares/jwt.js'
import Routes from 'express';
import routesVersioning  from 'express-routes-versioning';
import { loginV1 } from '../../services/login.js'

const router = Routes();
const version = routesVersioning();

router.use(createToken);
 
router.post('/', version({ 
    "1.0.0": loginV1
}));
export {
    router
};