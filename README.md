# WebDevA2

**Screenshots: **
To view screenshot of successful API calls on Postman, open the screenshot_demo zipped folder. There are examples of each required endpoint, each with 200 OK visible in the Postman interface screen. 

**File Organization: **

- The routes folder contain auth.js and posts.js which route apis calls for users to register or login, gain an authentication key, and then access the piazza post database, make changes or delete records.

- The models folder contains the database models for Post and User which organize and store the data entries, viewable in MongoDB.

- The validations folder holds validations.js which ensures correct inputs for user login and registration.

- commands.md lists the npm commands and packages needed in order to run the server and the code provided.

- verifyToken.js and verifyUser.js ensure that the right user is accessing the information, and that the auth token is correct.

**Running the Server: **
Download all files given and edit the .env file to include the correct password (it has been redacted with an X for submission purposes) 
Use `npm start` to run the server, open Postman to make API calls, and MongoDB to see the data records update and reflect the API requests made. 
