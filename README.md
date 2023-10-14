# Welcome to Quiz-App

Quiz-App is an application that allows users to create and answer quizzes.

### Getting Started

First step is to clone this repository to your local machine.

```
// For SSH use:
git@github.com:raphaelvdossantos/quiz-app.git

//HTTPS:
https://github.com/raphaelvdossantos/quiz-app.git
```

With the repository cloned, open the project folder in your terminal or utilize the terminal from your Code Editor. With the terminal open, run the command below to install all the dependencies for this project:

```
npm install
```

For following step you will need a second terminal to running the commands below, each in its own terminal:

```
// Spawns our mock server
npm run server

// Starts our application
npm start
```

The first command will run our mock server that will listen to our requests. This is done using the [json-server](https://www.npmjs.com/package/json-server) lib, which as the name implies is a REST-API with attached to a database, working as a server. You can see the contents of the mock database in `<root>/db/db.json`.

The second command runs our application.

With everything working, our application should be running on `localhost:3000` with our REST-API running on `localhost:3003`.

### Features

The application allows users to answer quizzes, admin users can also create, edit and delete them.

In the initial page users can see a list of existing quizzes, if any, together with the option to login or create their account.
Admin users will also see an option to delete any of the listed quizzes and an option to create a new one in the navigation bar.

Clicking on one of the quizzes will redirect the user to the quiz page where they can answer the questions and after submiting their reponses check their score.
Admin users can also edit any of the questions from the quiz from this page.

The quiz creation page is reacheable only for admin users. There they can create a quizz adding questions and up-to four possible answers. Selecting one of the answers in the creation page marks it as the correct choice.

### Technical

There is by default only one Admin account with the following credentials:

```
user: Mac
password: 1234
```

It is not possible to create an admin account using the conventional account creating method present on the application page.
To create a new admin user run the command below in the terminal from the project root folter providing a username and a password where pointed (order matters).

```
node createUser <username> <password>
```

### Libs

This project made use of four libraries:

- [TailwindCSS](https://www.npmjs.com/package/tailwindcss): Styling
- [JSON-Server](https://www.npmjs.com/package/json-server): Mock REST-API
- [React-Router-Dom](https://www.npmjs.com/package/react-router-dom): Routing
- [React-Router](https://www.npmjs.com/package/react-router): Routing - Module from the lib above

Others listed in package.json come as default from ReactJS project initialization using create-react-app
