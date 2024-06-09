import {Notifier} from "./notifier";
import {InputReader} from "./inputReader";

export class SecurityManager {
    private notifier: Notifier;
    private inputReader: InputReader;

    constructor(notifier: Notifier, inputReader: InputReader) {
        this.notifier = notifier;
        this.inputReader = inputReader;
    }

    public createValidUser(): void {
        this.notifier.notify("Enter a username");
        let username = this.inputReader.read();
        this.notifier.notify("Enter your full name");
        let fullName = this.inputReader.read();
        this.notifier.notify("Enter your password");
        let password = this.inputReader.read();
        this.notifier.notify("Re-enter your password");
        let confirmedPassword = this.inputReader.read();

        if (this.passwordsDoNotMatch(password, confirmedPassword)) {
            this.notifier.notify("The passwords don't match")
            return;
        }

        if (this.isPasswordToShort(password)) {
            this.notifier.notify("Password must be at least 8 characters in length")
            return;
        }

        const encryptedPassword = this.encryptPassword(password);
        this.notifier.notify(`Saving Details for User (${username}, ${fullName}, ${encryptedPassword})\n`)
    }

    private isPasswordToShort(password: string) {
        return password.length < 8;
    }

    private passwordsDoNotMatch(password: string, confirmedPassword: string) {
        return password !== confirmedPassword;
    }

    private encryptPassword(password: string) : string {
        return password.split("").reverse().join("");
    }
}