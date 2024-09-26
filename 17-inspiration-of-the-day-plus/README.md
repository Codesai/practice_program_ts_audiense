Inspiration of the day
================

Problem Description
-------------------

You are to write a service that, every time it gets executed, 
connects to a web service that returns a list of quotes 
containing a word chosen by a manager,
then it randomly selects one quote from the list
and sends it by WhatsApp to a random employee 
so that that employee gets inspired and motivated by the manager.
If everything goes well, the manager will receive the following notification: 
"Nice job, keep on increasing this company's productivity!", if not
the manager will receive the following notification: "Oops, something went wrong..."

 
### Constraints

The entry point of the service only has this public method: `inspireSomeone(word: string): void;`


