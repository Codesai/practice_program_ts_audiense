# Modified Text Processing kata

As a developer that writes blog posts I want a tool that helps me to understand better the text I am writing. For that I need a way to know the following:

1. What are the most common words used in the text?

2. How many characters does the text have?

Passing a text through the command line the program should show the results on the console.

Example:
 
    > analyze Hello, this is an example for you to practice. You should grab this text and make it as your test case
    > These are the top 10 most used words:
    > 1 you
    > 2 this
    > 3 your
    > 4 to
    > 5 text
    > 6 test
    > 7 should
    > 8 practice
    > 9 make
    > 10 it
    > The text contains 21 words.

## Features we want to have:

* Don't show some words using the `noshow` parameter (hint use `--noshow=[return constructor readonly class private public]`).

* Show the frequency of each word.

* Don't show infrequent words. Indicate the minimum frequency to show using the `minfreq` parameter (hint use `--minfreq=3`).

* Count the words in the text.

* Indicate the maximum number of words to show. Use the parameter `--max`: `analyze Hello, this is an example --max=2`

* Rank the words from most used to less used.

## Constraints.

- Aside from its constructor the only public method in the entry point class is:

    `analyse(text: string): void;`

- Disable the AI completion of your IDE.

### Tools

[Use of test doubles with jest](https://gist.github.com/trikitrok/c35768c3f67e10f4f0c6ecb0320e64d7)

### Acknowledgements

Thanks to Matheus Marabesi and Emmanuel Valverde for the original [Text Processing kata](https://www.codurance.com/katas/text-processing).
