const register = [];

function AddAccount() {
  console.log("Creating account. . .");
  const name = prompt("Enter your name");
  const LastName = prompt("Enter your last name");
  const password = prompt("Create your password");
  const account = [{ nombre: name, apellido: LastName, contrasena: password }];
  register.push(...account);
  console.log("Account created successfully!");
}

function Menu() {
  let option;
  do {
    option = prompt("Choose an option:\n1. Log In\n2. Register\n3. Exit");
    switch (option) {
      case "1":
        LogIn();
        break;
      case "2":
        AddAccount();
        break;
      case "3":
        console.log("See you next time!");
        break;
      default:
        console.log("Invalid option, please try again.");
    }
  } while (option !== "3");
  alert("Thank you for visiting!");
}

function LogIn() {
  const name = prompt("Enter your name");
  const password = prompt("Enter your password");
  const user = register.find(
    (account) => account.nombre === name && account.contrasena === password
  );

  if (user) {
    console.log(`Welcome, ${user.nombre} ${user.apellido}!`);
  } else {
    console.log("Incorrect name or password. Please try again.");
  }
}

Menu();
