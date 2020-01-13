function greeter(person: string) {
    console.log("test-ts");
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);