const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const { getMember, getMemberThroughId } = require('./queries');
const bcrypt = require('bcryptjs');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const member = await getMember(username);
            if(!member) {
                return done(null, false, { message: "Incorrect username" });
            }
            const isMatch = await bcrypt.compare(password, member.password);
            if(!isMatch) {
                console.log("password mismatch");
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, member)
        } catch (error) {
            console.log(error);
        }
    })
);

passport.serializeUser((member, done) => {
    done(null, member.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const member = await getMemberThroughId(id);
        if (!member) return done(null, false);

        done(null, member);
    } catch (error) {
        done(error);
    }
});

module.exports = {
    passport,
    session
};