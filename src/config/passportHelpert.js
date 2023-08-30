import passport from "passport";
import {validarToken} from "../middlewares/jwt.js";
import { Strategy as BearerStrategy } from "passport-http-bearer";

passport.use(new BearerStrategy(
    { passReqToCallback: true },
    async function(req,token,done) {
        const usuario = await validarToken(req,token)
        if (!usuario) return done(null, false);
        return done(null,usuario);
    }
));
export default passport;