<div align="center">    
   <img src="src/assets/logo.png">
   <p>School Node.js</p>
 </div>

## 📗 About
<p>Welcome to my Rest API project developed in MJV nodejs School.

Imagine a robust, reliable, and user-friendly API that allows businesses to manage their customers and products in one place.
With this API, businesses can create, get, update and delete user and product. It offers a range of features including user authentication, authorization and error handling</p>

<br></br>

## ⌨️ Try it out

### My API is hosted [here](https://mjv-final-project.onrender.com/) and you can try it out by using its [swagger](https://mjv-final-project.onrender.com/api-docs/).

<br></br>


## 📌 Run the project
```bash
# Clone the remote repository
$ git clone https://github.com/marianagsoares/mjv_final_project.git
```

```bash
# Install the dependencies
$ npm install
```

```bash
# Initialize the project using the local database
$ npm run dev

# Initialize the project using the cloud database
$ npm start
```
<br></br>

## 🔐 Routes

<p></p>
<p></p>

### Auth

| Method |    Endpoint    |     Route Description     | Status | Token Required |
| ------ | -------------  | --------------------------| ------ | ---------------| 
| POST    | /authenticate |  Authenticate user        |   200  | <p align="center">❌</p>| 
| POST    | /forgot_password | Send a token to user email |   200  | <p align="center">❌</p>| 
| POST   | /reset_password   | Reset user password        |   200  | <p align="center">❌</p>| 

<p></p>
<p></p>

### Users Collection

| Method |    Endpoint    |     Route Description     | Status | Token Required |
| ------ | -------------  | --------------------------| ------ | ---------------| 
| GET    | /users         |  List all users           |   200  | <p align="center">✔️</p>| 
| GET    | /users/:id     |  List a user by id        |   200  | <p align="center">✔️</p>| 
| POST   | /users         |  Create a user            |   201  | <p align="center">❌</p>| 
| PUT    | /users/:id     |  Update a user by id      |   200  | <p align="center">✔️</p>|  
| DELETE | /users         |  Delete a user by id      |   204  | <p align="center">✔️</p>|

<p></p>
<p></p>

### Products Collection

| Method |    Endpoint     |     Route Description     | Status | Token Required          | <p align="center">Permissions</p> |
| ------ | -------------   | --------------------------| ------ | ------------------------|-------------|
| GET    | /products       |  List all products        |   200  |<p align="center">✔️</p> | Administrador e Colaborador |
| GET    | /products/:code |  List a product by code   |   200  |<p align="center">✔️</p>  | Administrador e Colaborador|
| POST   | /products       |  Create a product         |   201  |<p align="center">✔️</p> | <p align="center">Administrador</p>|
| PUT    | /products/:code |  Update a product by code |   200  |<p align="center">✔️</p> | <p align="center">Administrador</p>|
| DELETE | /products/:code |  Delete a product by code |   204  |<p align="center">✔️</p> | <p align="center">Administrador</p>|

<br></br>

## 💻 Tecnologies
 <div align='center'>
     <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="50" height="50"/>
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg" width="50" height="50" />
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain-wordmark.svg" width="50" height="50">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" width="50" height="50">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" width="50" height="50">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="50" height="50">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="50" height="50"/>
 </div>

 <br></br>

| Tool           | Description                                                             |
| -------------- | ----------------------------------------------------------------------- |
| `JavaScript`   | Programming language.                                                   |
| `TypeScript`   | JavaScript superset that adds features to the language, such as typing. |
| `MongoDB`      | Document-oriented non-relational database.                              |
| `Mongoose`     | Library that creates a connection between MongoDB and the Node.js.      |
| `MongoCompass` | Interface to visualize data persistence.                                |
| `Nodemon`      | Library responsible for listening updates and restarting the server.    |
| `Nodejs`       | JavaScript runtime environment.                                         |
| `Insomnia`     | Open source for client API testing.                                     |
| `npm`          | Package management.                                                     |
| `Express`      | Nodejs framework.                                                       |
| `cors`         | Library that manages access to application resources.                   |
| `bcryptjs`     | Library to encrypting data.                                             |
| `jsonwebtoken` | Library to implement JSON web token protocol.                           |
| `dotenv`       | Library for managing environment variables.                             |
| `nodemailer`   | Library to send email to user.                                          |

<br></br>
## 🖋 Authoress
<p align="center">Developed by Mariana Galindo</p>
<div align="center">
   <br>
   <a href = "mailto:marianasoares.ti@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white"   target="_blank"></a>
   <a href="https://www.linkedin.com/in/mariana-galindo-391413220/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
 <br>
 </div>