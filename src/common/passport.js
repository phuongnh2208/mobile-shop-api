const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('config');
const CustomerModel = require('../apps/models/customer'); 

const appConfig = config.get('app');
const GOOGLE_CONFIG = appConfig.googleClientID ? {
    clientID: appConfig.googleClientID,
    clientSecret: appConfig.googleClientSecret,
    callbackURL: "/auth/google/callback", 
    scope: ['profile', 'email'],
} : null;

const FACEBOOK_CONFIG = appConfig.facebookClientID ? {
    clientID: appConfig.facebookClientID,
    clientSecret: appConfig.facebookClientSecret,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'emails', 'photos'],
} : null;

passport.serializeUser((customer, done) => {
    done(null, customer._id); 
});

passport.deserializeUser(async (id, done) => {
    try {
        const customer = await CustomerModel.findById(id);
        done(null, customer);
    } catch (err) {
        done(err, null);
    }
});


if (GOOGLE_CONFIG) {
    passport.use(new GoogleStrategy(GOOGLE_CONFIG,
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                let customer = await CustomerModel.findOne({ email });

                if (!customer) {
                    const bcrypt = require('bcrypt');
                    const hashedPassword = await bcrypt.hash(Math.random().toString(36).substring(2, 15), 10);
                    
                    customer = await CustomerModel.create({
                        fullName: profile.displayName,
                        email: email,
                        password: hashedPassword, 
                        phone: 'GG_N/A', 
                        address: 'GG_N/A',
                    });
                }
                return done(null, customer); 
            } catch (error) {
                return done(error, null);
            }
        }
    ));
}

if (FACEBOOK_CONFIG) {
    passport.use(new FacebookStrategy(FACEBOOK_CONFIG,
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails ? profile.emails[0].value : `${profile.id}@facebook.com`;
                let customer = await CustomerModel.findOne({ email });

                if (!customer) {
                    const bcrypt = require('bcrypt');
                    const hashedPassword = await bcrypt.hash(Math.random().toString(36).substring(2, 15), 10);
                    
                    customer = await CustomerModel.create({
                        fullName: profile.displayName,
                        email: email,
                        password: hashedPassword,
                        phone: 'FB_N/A',
                        address: 'FB_N/A',
                    });
                }
                return done(null, customer);
            } catch (error) {
                return done(error, null);
            }
        }
    ));
}

module.exports = passport;