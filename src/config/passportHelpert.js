import passport from "passport";
import {validarToken} from "../middlewares/jwt.js";
import { Strategy as BearerStrategy } from "passport-http-bearer";

passport.use(new BearerStrategy(
    async function(token,done) {
        console.log(token);
        const usuario = await validarToken(token)
        console.log(usuario);
        if (!usuario) return done(null, false);
        return done(null,usuario);
    }
));
export default passport;