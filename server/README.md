## Getting Started

Follow the appropriate instructions depending on whether you are using MongoDB Atlas or MongoDB Compass



## MongoDB Atlas Users

1. Create a free account by following the folloing link,

* [MongoDB Atlas](https://www.mongodb.com/atlas/database)

2. Once you have created your account click on the connect button.

<img src=".././images/image6.png" alt="Screenshot 6">
3. Then click the drivers option. 
<img src=".././images/image7.png" alt="Screenshot 7">

4. Copy the connection string. 

<img src=".././images/image8.png" alt="Screenshot 8">
5. Create a .env file inside the server folder.
```
touch .env
```

6. Paste the connection into your .env file as the MONGODB_CREDENTIALS variable. 

<img src=".././images/image4.png" alt="Screenshot 4">

7. Change '<password>' to the the password you used for your MongoDB Atlas account. 
  
8. Save your changes and run the server with npm start from inside the server directory. 
  ```
  npm start
  ```
