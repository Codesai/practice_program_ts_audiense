# Smart Vault System

A kata to practice extracting examples from user stories and writing unit tests using [test doubles](https://gist.github.com/trikitrok/c35768c3f67e10f4f0c6ecb0320e64d7).

## The Smart Vault system

### **Hardware Components**

* **Keypad Interface:** Serves as the primary input point for access codes and provides visual feedback/error messaging to the user.
* **Registry Service:** A centralized database used to validate access credentials and provide authorization signals.
* **Door Mechanism:** An electromechanical assembly equipped with sensors to detect and report its physical state (**Unlocked**, **Open**, or **Jammed**).
* **Inventory Scanner:** A hardware-software suite that performs automated sweeps of the vault contents upon closure.
* **Activity Log & Emergency Buffer:** Dual-layered storage systems; the first is a networked log for standard entries, and the second is a local fail-safe for when network connectivity is compromised.
* **Communication Terminals:** Automated interfaces that route "Restock Orders" to fulfillment systems and "Emergency Alerts" to management consoles.

### **System Behavior & Logic**

#### **1. Access and Authorization**
The process is initiated when a code is entered via the **Keypad**. The system queries the **Registry Service** to verify authorization. 
* **If Unauthorized:** The system remains idle. 
* **If Authorized:** A signal is sent to the **Door Mechanism** to unlock.

#### **2. Mechanical Feedback and Entry Logging**
The system monitors the Door Mechanism for status reports:
* **Mechanical Failure:** If the door reports a "Jammed" status, the system pushes a specific error message to the Keypad display. A log entry is recorded in the **Activity Log**.
* **Successful Entry:** A log entry is recorded when the door confirms a status of "Open."

#### **3. Post-Closure Inventory Sweep**
Once the door is closed, the **Inventory Scanner** triggers a sweep. The system then applies conditional logic based on item counts:

| Item Count | Action Taken |
| :--- | :--- |
| **6 or more** | No action required. |
| **1 to 5** | Trigger an automated **Restock Order**. |
| **Exactly 0** | Trigger an **Emergency Alert** to the Management Terminal. |

### User stories

> As a staff member, when I enter a valid code on the keypad, the door unlocks to let me in.

> As a staff member entering a valid code,
> when the door jams,
> a specific error is displayed on the keypad display, so that I can call a technician.

> As a staff member, 
> when I enter an incorrect code on the keypad 
> and the door does not unlock,
> a specific error is displayed on the keypad display to let me know.

> As a Operations Manager when a staff member unlocks the door, 
> I want the activity log to have an entry indicating that the door was opened and by whom, 
> so that we maintain a continuous and reliable record of activity.

> As a Operations Manager, when a staff member can't unlock the door, 
> I want the activity log to have an entry indicating why the door could not be unlocked and who tired to do it, 
> so that we maintain a continuous and reliable record of activity.

> As a Supplier, when the door is closed, 
> I want to be notified when the inventory sensor counts 5 or fewer items, so that I can replenish stock efficiently.

### Constraints

The `SmartVaultSystem` class has only two public methods:

1. `onCodeIntroduced(code: Code, id: EmployeeId): void;`
2. `onDoorClosed(): void;`

### Help

* [Examples of test doubles with Jests](https://gist.github.com/trikitrok/c35768c3f67e10f4f0c6ecb0320e64d7)

* Use [jest-when](https://www.npmjs.com/package/jest-when) for more readable stubs.

