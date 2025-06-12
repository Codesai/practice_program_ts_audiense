# Modified Text Processing kata

## Iterations:

1. Don't show infrequent words. Indicate the minimum frequency to show using the `minFreq` parameter (hint use
   `--minFreq=3`).

2. Indicate the maximum number of words to show. Use the `--max` parameter  (hint use `--max=2`).

3. What would you need to change in order to create an endpoint for our text analyzer.

   For instance if the endpoint receives a request like:
   
   GET "www.textitos.es/v1/analysis?text=pipa+hello+world+world+hello+koko+pepe+chacha+pipa+pipa+chacha&excludedWords=pepe,koko&freqAbove=1&wordsListed=3"

   that corresponds to the `Input` `{text: "pipa hello world world hello koko pepe chacha pipa pipa chacha", options = {minFreq: 2, max: 3, noShow: ["pepe", "koko"]}}`, 
   
   it will produce the following Json response:

   `{"countedWords": 11, "rankedWords": [{"word": "pipa", "frequency": 3}, {"word": "hello","frequency": 2}, {"word": "world", "frequency": 2}]}`

   Write only the entry point (the controller). Don't worry about the framework in this session.

## Constraints.

- Introduce variations in behavior by composition, not modification of the existing code:

### Tools

[Use of test doubles with jest](https://gist.github.com/trikitrok/c35768c3f67e10f4f0c6ecb0320e64d7)

### Acknowledgements

Thanks to Matheus Marabesi and Emmanuel Valverde for the
original [Text Processing kata](https://www.codurance.com/katas/text-processing).
