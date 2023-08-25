import passport from "passport";
import {validarToken} from "../middlewares/jwt.js";
import { Strategy as BearerStrategy } from "passport-http-bearer";

passport.use(new BearerStrategy(
    async function(token,done) {
        const usuario = validarToken(token)
        if (!usuario) return done(null, false);
        return done(null,usuario);
    }
));
export default passport;