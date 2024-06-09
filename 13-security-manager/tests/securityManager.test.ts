import {SecurityManager} from "../src/securityManager";
import {instance, mock, verify, when} from "ts-mockito";
import {Notifier} from "../src/notifier";
import {InputReader} from "../src/inputReader";

describe("Security Manager", () => {

    const username = "Pepe";
    const fullName = "Pepe Garcia";
    let notifier: Notifier;
    let reader: InputReader;
    let securityManager: SecurityManager;

    beforeEach(() => {
        notifier = mock<Notifier>();
        reader = mock<InputReader>();
        securityManager = new SecurityManager(instance(notifier), instance(reader));
    });

    it("Do not save user when password and confirm password are not equals", () => {
        introducingPasswords("Pepe1234", "Pepe1234.");

        createUser();

        verifyNotifiedMessages("The passwords don't match");
    });
    
    it("Do not save user when password too short", () => {
        introducingPasswords("Pepe123", "Pepe123");

        createUser();

        verifyNotifiedMessages("Password must be at least 8 characters in length");
    });

    it("Save user", () => {
        const validPassword = "Pepe1234";
        introducingPasswords(validPassword, validPassword);

        createUser();

        const reversedPassword = "4321epeP";
        verifyNotifiedMessages(`Saving Details for User (${username}, ${fullName}, ${reversedPassword})\n`);
    });

    function createUser() {
        securityManager.createValidUser();
    }

    function introducingPasswords(password: string, confirmedPassword: string) {
        when(reader.read()).thenReturn(username, fullName, password, confirmedPassword)
    }

    function verifyNotifiedMessages(lastMessage: string) {
        verify(notifier.notify("Enter a username")).calledBefore(notifier.notify("Enter your full name"))
        verify(notifier.notify("Enter your full name")).calledBefore(notifier.notify("Enter your password"))
        verify(notifier.notify("Enter your password")).calledBefore(notifier.notify("Re-enter your password"))
        verify(notifier.notify("Re-enter your password")).calledBefore(notifier.notify(lastMessage))
    }
});