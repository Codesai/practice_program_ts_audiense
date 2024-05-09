import {Product} from "../src/Product";
import {EmailService} from "../src/EmailService";
import {instance, mock} from "ts-mockito";
import {Checkout} from "../src/CheckOut";

describe("Checkout", () => {
    it("order comfirmation falis if user does not accept terms of service", () => {
        // note for tester:
        // Accept Newsletter
        // Do not Accept Terms
        const emailService = mock<EmailService>();
        const polkaDotSocks = new Product("Polka-dot Socks");
        const checkout = new Checkout(polkaDotSocks, instance(emailService));

        expect(() => {
            checkout.confirmOrder()
        }).toThrow();
    });
});
