# Modified Text Processing kata

We'd like to create an endpoint from our existing code that provides the following features:

1. Indicate that the analysis is case-insensitive (it's case-sensitive by default). Use the `caseInsensitive`
   parameter (hint
   use `caseInsensitive=false`).

2. Don't show some words using the `excludedWords` parameter (hint use
   `excludedWords=pepe,koko`).

3. Don't show infrequent words. Indicate the minimum frequency to show using the `freqAbove` parameter (hint use
   `freqAbove=3`).

4. Indicate the maximum number of words to show. Use the `wordsListed` parameter (hint use `wordsListed=2`).

## Constraints.

- Reuse as much domain code as possible (hint: not all current domain code will be reused).

- Use [express](https://expressjs.com/) for the API and test it with [supertest](https://www.npmjs.com/package/supertest).

## Hints

Think about:

- what needs to be different, and what can remain the same to create and endpoint that performs the current text analysis.

- how you would refactor the current CLI application to separate what needs to be different from the parts that can remain the same.

Once you identify what needs to be different and what can remain the same:

1. Refactor the current design to separate those parts (what needs to be different will move to cliApp, and what can remain the same will stay in the domain).
2. Create all the endpoint's specific code inside an api folder (you can use an AI to help you in this part), reuse the domain code.

## Testing the endpoint manually.

To run the server: `ts-node src/api/server.ts`

To manually test de endpoint:
`curl "http://localhost:3000/v1/analysis?text=pipa+hello+world+world+hello+koko+pepe+chacha+pipa+pipa+chacha&excludedWords=pepe,koko&freqAbove=1&wordsListed=3"`

## To know we are done.

Once all functionality is done, if, for instance, the endpoint receives a request like:

`curl "http://localhost:3000/v1/analysis?text=pipa+hello+world+world+hello+koko+pepe+chacha+pipa+pipa+chacha&excludedWords=pepe,koko&freqAbove=1&wordsListed=3"`

it will correspond to the `Input`
`{text: "pipa hello world world hello koko pepe chacha pipa pipa chacha", options: {minFreq: 2, max: 3, noShow: ["pepe", "koko"]}}`,

and it will produce the following JSON response:

`{"analysis":{"countedWords": 11, "wordsWithFrequency": [{"word": "pipa", "frequency": 3}, {"word": "hello","frequency": 2}, {"word": "world", "frequency": 2}]}}`


### Tools

[Use of test doubles with jest](https://gist.github.com/trikitrok/c35768c3f67e10f4f0c6ecb0320e64d7)

### Acknowledgements

Thanks to Matheus Marabesi and Emmanuel Valverde for the
original [Text Processing kata](https://www.codurance.com/katas/text-processing).
