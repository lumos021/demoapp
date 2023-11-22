const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const sharp = require('sharp');
const multer = require('multer');
var passport = require('passport');

const uri = 'mongodb://127.0.0.1:27017/image-gallery'; // Include the database name in the URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
 
const imageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String,
    createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model('Image', imageSchema);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.set('view engine', 'ejs');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

// Middleware to check if Image model is connected
const checkImageModel = (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(500).send('Mongoose not connected');
    }
    next(); // Proceed to the next middleware or route handler
};

// Use the middleware for all routes
app.use(checkImageModel);

// Logout route
app.get('/logout', (req, res) => {
    // Logout and redirect to the home page
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/');
    });
});



app.get('/', function (req, res) {
    // Fetch the user profile from the session
    const user = req.user;
    res.render('static/index', { user });
});

// Image upload route with middleware
app.get('/upload', (req, res) => {
    res.render('static/upload');
});

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Continue with file processing
        const resizedImageBuffer = await sharp(req.file.buffer)
            .resize({ width: 300 })
            .toFormat('webp')
            .toBuffer();

        // Save the processed image to MongoDB using Mongoose
        const image = new Image({
            data: resizedImageBuffer,
            contentType: 'image/webp',
        });

        await image.save();

        res.redirect('/success');
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error uploading image: ${error.message}`);
    }
});


  
var userProfile;

const fetchImages = async () => {
    try {
        const images = await Image.find().sort({ createdAt: -1 }).exec();
        return images;
    } catch (error) {
        console.error(error);
        throw new Error(`Error fetching images: ${error.message}`);
    }
};

app.get('/success', async (req, res) => {
    try {
        const images = await fetchImages();
        res.render('static/success', { user: userProfile, images });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

app.get('/error', (req, res) => res.send("error logging in"));
 
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
 
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */
 
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = 'my-client-id';
const GOOGLE_CLIENT_SECRET = 'my-secret';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });

// Gracefully close MongoDB connection on application shutdown
process.on('SIGINT', () => {
    client.close();
    process.exit();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));
