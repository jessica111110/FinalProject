# maepic - Map your most epic pics instantly while traveling.
This is our final project of our Web Development Bootcamp at Ironhack.

Created using the MERN stack, Google Maps API, Cloudinary, Reactstrap and CSS.

![maepic Logo](./client/src/images/maepic_logo_interim.png)

by Alina and Jessica

#### Post your epic pictures on a map... instantly based on geolocation!
##### See which pictures others share on their map. So many unknown places to explore.

## Screenshots

![SS1](./client/public/Screenshot(665).png)

![SS2](./client/public/Screenshot(664).png)

![SS3](./client/public/Screenshot(663).png)

![SS4](./client/public/Screenshot(658).png)

![SS5](./client/public/Screenshot(659).png)

![SS6](./client/public/Screenshot(662).png)

![SS7](./client/public/Screenshot(651).png)

![SS8](./client/public/Screenshot(653).png)

![SS9](./client/public/Screenshot(656).png)


## How to run this on your local machine

1. Clone or copy this repository
```
$ git clone https://github.com/jessica111110/FinalProject.git
```

2. In the directory of the project run:

**To install all the packages**
```
$ npm install
# OR
$ (cd server && npm install)
$ (cd client && npm install)
```
**To install a package for the server**
```sh
$ cd server
$ npm install --save axios
```

**To install a package for the client**
```sh
$ cd client
$ npm install --save axios
```

3. Open two terminal windows to get the application up and running on server and client side

**Terminal 1**
```
$npm run dev:server // -> # Server running on http://localhost:4000/
```
**Terminal 2**
```
$npm run dev:client // -> # Client running on http://localhost:3000/
#OR
$npm run dev:windows:client // -> # If you are a windows user
```

4. In order to upload pictures and access Google Maps, it is necessary to create the following `.env` files:

**server/.env**
```
PORT=4000
CLOUDINARY_CLOUD_NAME= // -> Here your Cloudinary cloud name
CLOUDINARY_API_KEY= // -> Here your API Key
CLOUDINARY_API_SECRET= // -> Here your API secret key
MONGODB_URI=mongodb://localhost/27017/project3db
```

**client/.env**
```
REACT_APP_GOOGLE_API_KEY=AIzaSyAhPX46V_30-b2s3yLtWJgHp9JI3tzQ5VA
```

Alternately direct your browser to the live version on [Heroku](https://maepic.herokuapp.com). Please be aware that this is not the current version due to technical issues.

