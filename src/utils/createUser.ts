type User = {
  name: string;
  email: string;
  password: string;
};
const wait = (n: number = 5000): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, n));
async function createUserAsync({ name, email, password }: User): Promise<User> {
  await wait();
  return { name, email, password };
}
export { User, createUserAsync,wait };
export default function createUser({ name, email, password }: User): User {
  return { name, email, password };
}
