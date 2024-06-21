import dotenv from 'dotenv';
dotenv.config();
import passport  from'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

    passport.use (new GoogleStrategy({
        clientID:process.env.Google_ClientID,
        clientSecret:process.env.Google_ClientSecret,
        callbackURL:process.env.Google_CallbackURL,
        passReqToCallback:true,
    },function(request,accessToken,refreshToken,profiLe,done){
        return done(null,profiLe)
    }
    ))   

    passport.serializeUser(function(user, done){
        done(null, user);
      });

      // retrieves user from session
      passport.deserializeUser(function(user, done){
        done(null, user);
      });
