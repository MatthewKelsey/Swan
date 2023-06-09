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
5. Create a .env file inside the server folder
 
```
touch .env
```

6. Paste the connection into your .env file as the MONGODB_CREDENTIALS variable. 

<img src=".././images/image5.png" alt="Screenshot 5">

7. Change '<password>' to the the password you used for your MongoDB Atlas account. 
  
8. Save your changes and run the server with npm start from inside the server directory. 
  ```
  npm start
  ```



## MongoDB Compass Users (local)
  
 
  
1. Install MongoDB by following the manufacturer's instructions for your operating system. 
  
  * [Installation](https://www.mongodb.com/docs/manual/administration/install-community/)
  
<h2> MacOS and Linux users.</h2>
  
2. Once installed MacOS and Linux users can run an instance of MongoDB by running the following command in a new terminal window.
  
  ```
  sudo mongod
  ```
  
3. Create a .env file inside the server folder.
 
```
touch .env
```
4. The default location for your local database is mongodb://localhost:27017/. Paste this connection string as your MONGODB_CREDENTIALS variable.
  
  
<img src=".././images/image5.png" alt="Screenshot 5">
  
5. Save your changes and run the server with npm start from inside the server directory. 
  ```
  npm start
  ```
  
  <h2>Windows users. </h2>
  
 2. Once installed Windows users can run an instance of MongoDB by navigating to MongoDB by running this command in the command prompt windows.
 
```
cd C:\Program Files\MongoDB\Server\6.0\bin
```

3. Then starting an instance of MongoDB running this command in the command prompt window.

```
mongod
```
4. Create a .env file inside the server folder.
 
```
touch .env
```
5. The default location for your local database is mongodb://127.0.0.1:27017/. WIndows users are recommended to use mongodb://127.0.0.1:27017/ instead of mongodb://localhost:27017/. Paste this connection string as your MONGODB_CREDENTIALS variable.

```
mongodb://127.0.0.1:27017/
```
  
<img src=".././images/image5.png" alt="Screenshot 5">
  
6. Save your changes and run the server with npm start from inside the server directory. 
  ```
  npm start
  ```
