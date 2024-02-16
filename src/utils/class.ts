class User {
  name: string;
  email: string;
  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }
  get getUser(): {
    email: string;
    name: string;
  } {
    return {
      email: this.email,
      name: this.name,
    };
  }
}

const user = new User("abcd@gmail.com", "abcd");
const userInformation = user.getUser;
console.log(userInformation);
