import fs from "fs";

console.log("runing this code on the system...");
type User = {
  name: string;
  email: string;
  password: string;
};
function createUser({ name, email, password }: User): User {
  return { name, email, password }
}
// const user = createUser();
