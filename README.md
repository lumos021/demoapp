# Web Application with Image Optimization

This project is a full-stack web application that utilizes Node.js and Express.js for the backend, MongoDB for data storage, and HTML, CSS, and JavaScript for the frontend. The design is responsive thanks to Bootstrap. A unique feature of this application is the implementation of image size reduction and conversion to .webp format for storage.

## Features

- **Backend**: Utilizes Node.js and Express.js for server-side operations.
- **Database**: Stores data using MongoDB, a NoSQL database.
- **Frontend**: Developed using HTML, CSS, and JavaScript without any modern frameworks like React.js, Vue.js, or Angular.
- **Design**: Employs Bootstrap for responsive design, ensuring the application looks good on all devices.
- **Image Optimization**: Implements image size reduction and conversion to .webp format for efficient storage and faster loading times.

## Libraries Used

This project uses the following libraries:

- `ejs` for generating HTML markup with plain JavaScript.
- `express` for handling server-side operations.
- `express-session` for managing user sessions.
- `mongodb` and `mongoose` for interacting with MongoDB.
- `multer` for handling `multipart/form-data`, which is primarily used for uploading files.
- `passport` and `passport-google-oauth` for handling authentication.
- `sharp` for converting large images into common formats (JPEG, PNG, WebP) and optimizing them for the web.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://jestjs.io/docs/getting-started) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles the application in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


## Learn More

You can learn more in the [Express.js documentation](https://expressjs.com/), [MongoDB documentation](https://docs.mongodb.com/), and [Bootstrap documentation](https://getbootstrap.com/docs/5.1/getting-started/introduction/).