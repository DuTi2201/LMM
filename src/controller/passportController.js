import passport from 'passport';
import LocalStrategy from 'passport-local';
// import loginService from '../service/loginService';

const configPassport = () => {
    passport.use(new LocalStrategy(function verify(username, password, cb) {
      
        console.log("...check username: ", username, "password: ", password)
        // db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
        //   if (err) { return cb(err); }
        //   if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

        //   crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        //     if (err) { return cb(err); }
        //     if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        //       return cb(null, false, { message: 'Incorrect username or password.' });
        //     }
        //     return cb(null, row);
        //   });
        // });
    }));
}

module.exports = { configPassport }