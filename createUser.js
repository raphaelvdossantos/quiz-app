const http = require('http');
const crypto = require('node:crypto');

function createSuperUser() {
  const args = process.argv;

  const username = args[2];
  const pwd = args[3];
  console.log({ username, pwd, args });

  if (username && pwd) {
    const newUser = {
      id: generateUniqueId(username),
      isAdmin: true,
      username,
      password: pwd,
      answers: [],
    };

    try {
      return postNewUser(newUser);
    } catch (err) {
      console.log("Something wen't wrong :/");
    }
  }

  console.log(`Please provide a username and password, given: \n
    $username: ${username}; password: ${pwd}`);
}

function postNewUser(user) {
  const data = JSON.stringify(user);
  const options = {
    hostname: 'localhost',
    port: 3003,
    path: '/user',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };

  const req = http.request(options, (res) => {
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.write(data);
  req.end();
}

function generateUniqueId(seed) {
  const enc = new TextEncoder();
  const arr = enc.encode(seed);
  let values = '';
  for (const i of crypto.getRandomValues(arr)) {
    values += i;
  }

  return Number(values);
}

createSuperUser();
