import passportLocal from "passport-local";
import passport from "passport";
import login_registerService from "../services/login_registerService";

let LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                let user = await login_registerService.findUserByEmail(email);
                if (!user) {
                    return done(null, false, req.flash("errors", `This user email "${email}" doesn't exist`));
                }
                let match = await login_registerService.checkPassword(password, user.password);
                if (match === true) {
                    return done(null, user, null);
                } else {
                    return done(null, false, req.flash("errors", match));
                }
            } catch (err) {
                console.log(err);
                return done(null, false, { message: err });
            }
        }));

};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    login_registerService.findUserById(id).then((user) => {
        return done(null, user);
    }).catch(error => {
        return done(error, null)
    });
});

module.exports = initPassportLocal;
