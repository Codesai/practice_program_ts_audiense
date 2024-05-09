import {Product} from "./Product";
import {EmailService} from "./EmailService";
import {UserConfirmation} from "./UserConfirmation";
import {OrderCancelledException} from "./OrderCancelledException";

export class Checkout {
    private readonly _emailService: EmailService;
    private readonly _newsLetterSubscribed: UserConfirmation;
    private readonly _product: Product;
    private readonly _termsAndConditionsAccepted: UserConfirmation;

    constructor(product: Product, emailService: EmailService) {
        this._product = product;
        this._emailService = emailService;
        this._newsLetterSubscribed = new UserConfirmation(
            "Subscribe to our product " + product + " newsletter?"
        );
        this._termsAndConditionsAccepted = new UserConfirmation(
            "Accept our terms and conditions?\n" + //
            "(Mandatory to place order for " + product + ")");
    }

    public confirmOrder(): void {
        if (!this._termsAndConditionsAccepted.wasAccepted()) {
            throw new OrderCancelledException(this._product);
        }
        if (this._newsLetterSubscribed.wasAccepted()) {
            this._emailService.subscribeUserFor(this._product);
        }
    }
}
