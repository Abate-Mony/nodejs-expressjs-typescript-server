const wait = (n = 5000) => new Promise((resolve) => setTimeout(resolve, n));
async function createUserAsync({ name, email, password }) {
    await wait();
    return { name, email, password };
}
export { createUserAsync, wait };
export default function createUser({ name, email, password }) {
    return { name, email, password };
}
//# sourceMappingURL=createUser.js.map