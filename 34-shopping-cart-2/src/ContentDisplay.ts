import {CartContent} from "./CartContent";

export interface ContentDisplay {
    show(content: CartContent): void;
}
