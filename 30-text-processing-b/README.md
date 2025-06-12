# Modified Text Processing kata

## Iterations:

1. Don't show some words using the `noshow` parameter (hint use
   `--noshow=[return constructor readonly class private public]`).

2. Don't show infrequent words. Indicate the minimum frequency to show using the `minfreq` parameter (hint use
   `--minfreq=3`).

3. Indicate the maximum number of words to show. Use the `--max` parameter  (hint use `--max=2`).
   
4. Don't show words stored in a file using the `nowordsinfile` parameter (hint use `--nowordsinfile=path_to_file`).

## Constraints.

- Aside from its constructor the only public method in the entry point class is:

  `analyse(text: string): void;`

- Disable the AI completion of your IDE.

### Tools

[Use of test doubles with jest](https://gist.github.com/trikitrok/c35768c3f67e10f4f0c6ecb0320e64d7)

### Acknowledgements

Thanks to Matheus Marabesi and Emmanuel Valverde for the
original [Text Processing kata](https://www.codurance.com/katas/text-processing).
