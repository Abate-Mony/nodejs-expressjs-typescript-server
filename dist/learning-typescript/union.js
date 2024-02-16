let score;
const user = createUser({
    age: 33,
    password: "122",
    name: "rose",
    email: "kkkd",
});
console.log("this is the new user created", user);
const product = getSingleProduct(2);
function getSingleProduct(id) {
    if (typeof id == "number") {
        // code here
    }
    if (typeof id == "string") {
        //   code here
    }
    return { name: "", age: 2 };
}
function createUser(user) {
    return user;
}
export {};
//# sourceMappingURL=union.js.map