class User {
    constructor(email, name) {
        this.email = email;
        this.name = name;
    }
    get getUser() {
        return {
            email: this.email,
            name: this.name,
        };
    }
}
const user = new User("abcd@gmail.com", "abcd");
const userInformation = user.getUser;
console.log(userInformation);
export {};
//# sourceMappingURL=class.js.map