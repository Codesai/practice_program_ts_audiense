## Kata Parkqueen System

Parkqueen is a system designed to manage a car parking facility. 
It is automatically triggered by a license plate reader and is responsible for coordinating the physical barrier, processing payments, and alerting security if necessary.

When a vehicle arrives at the entrance, the system receives the license plate, records it along with the exact entry time, and signals the parking barrier to open.

Later, when the vehicle reaches the exit, the system reads the plate again and calculates the total time spent inside.
With this duration, it determines the corresponding fee and sends it to the external payment system.

* If the transaction is successful, the barrier opens.
* If the payment fails for any reason, the system must immediately call the security guard using the notification system.


### Note: Credit Card Payments Only
The client always pays for their parking session using a credit card at the exit. 
The system does not handle cash or alternative payment methods.
This is our value proposition. For this we will take control of the market.

### Edge Cases

* **Unknown Plate at Exit:** If a vehicle attempts to exit but its plate is not registered in the system, do not open the barrier and immediately notify the security guard.
* **Duplicate Entry:** If a vehicle attempts to enter but is already registered as inside the parking lot, ignore the new entry read and do not open the barrier.

### Parking Fees

The parking fees are calculated based on the duration of the stay. 
Any started hour is billed entirely (e.g., a stay of 1 hour and 1 minute is billed as up to 2 hours).

For stays exceeding 7 hours, a flat rate of €9 is applied for every complete 24-hour block, and the remainder of the time is billed according to the standard rates.

| **Duration** | **Fee** |
| --- | --- |
| Up to 1 hour | €2 |
| > 1 hour up to 2 hours | €3 |
| > 2 hours up to 3 hours | €4 |
| > 3 hours up to 4 hours | €5 |
| > 4 hours up to 5 hours | €6 |
| > 5 hours up to 6 hours | €7 |
| > 6 hours up to 7 hours | €8 |
| > 7 hours | €9 per 24h + remaining standard rate |

> **Example:** A stay of 26 hours pays €12. This is calculated as €9 for the first 24-hour block, plus €3 for the remaining 2 hours.

### Constraints

The `Parking` class has only two public methods:

```typescript
enter(plate: string): void;
exit(plate: string): void;

```

### External Systems 

You will also need to design your system to interact with the following external systems:

```typescript
interface Barrier {
  open(): void;
}

interface PaymentGateway {
  process(amount: number): boolean;
}

interface GuardNotifier {
  notify(plate: string): void;
}

```