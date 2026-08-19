export interface PaymentGateway {
  process(amount: number): boolean;
}
