# Flight Finder Application
This is a Flight Finder application built using Node.js and Express. The application allows users to search for flights and create an account to manage their flight searches. It also provides an admin interface to add new flights. The application uses Passport for user authentication and saves the JWT token in a cookie.

### Routes

- `/api/auth`: API route for user authentication and registration. This route uses passport.js for user authentication and saves the JWT token in a cookie, which is sent back to the client.
- `/api/flight`: API route for searching flights. Users can search for flights using price and time ranges filters. If a direct flight is not available, the route will return all possible connections with stops. This route also includes the following features:
  - A protected POST request for registered users to book flights. Once a flight is booked, the   corresponding seat is removed and the data is saved in the history table in the database.
  - A protected POST request for admin users to add new flights to the database.
- `/api/user`: API route for updating, getting, and deleting user information. This route is protected and can only be accessed by authenticated users

### Authentication

Passport is used for authentication, jsonwebtoken package create the JWT, and the routes with cookie-parser send the cookie to the client. The server is protected, and the user needs to be logged in to access certain routes. The user's role is checked, and the user must have the appropriate role to access certain routes.

### Database

The database is in Postgres in a Docker container. The database contains tables for route, itineraries, price, history and users.

## Installation

To get started, you will need to clone the repository and install the dependencies.

```bash
$ git clone https://github.com/Andrea-Agosta/Flight_finder_API.git
$ cd Flight_finder_API
$ npm install
```
 Once the dependencies are installed, rename your `EXAMPLE.env` and update it with your data. 
 
 Inside the directory `containerConfig` rename the `EXAMPLE_psql.env` file and update it with your data.
 
 Now you can start the development server with the following command:

```bash
$ npm run server
```
This will start the development server at `http://localhost:8080/`.
After, open your docker app or download from [here](https://www.docker.com/).
When the Docker app is running open a new tab on your terminal and type:

```bash
$ npm run docker:init
```
When the build is finished, open another tab on your terminal and run:
```bash
 $ npm run seeder
```
This command fill up your postgress database with data.

### Conclusion
This Flight Finder application provides a user-friendly interface to search for flights, create an account, and manage flight searches. The admin interface allows authorized users to add new flights to the database. With proper error handling and database management, the application provides a smooth user experience.
