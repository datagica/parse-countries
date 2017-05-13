const chai = require('chai')
chai.use(require('chai-fuzzy'))
const { expect } = chai
const parse = require("../lib/index")

describe('@datagica/parse-countries', () => {

  it('should extract countries written in English', () => Promise.all(
    [
      {
        input: "I live in France",
        output: [
          {
            "ngram": "France",
            "position": {
              "begin": 10,
              "end": 16,
              "sentence": 0,
              "word": 3
            },
            "score": 1,
            "value": {
              "ISO_ALPHA_2": "FR",
              "ISO_ALPHA_3": "FRA",
              "UN_M49": "250",
              "aliases": {
                "en": [
                  "France"
                ],
                "fr": [
                  "France"
                ]
              },
              "id": "country-FR",
              "label": {
                "en": "France",
                "fr": "France"
              }
            }
          }
        ]
      }
    ].map(test => parse(test.input).then(output => {
        // console.log("output: " + JSON.stringify(output, null, 2));
        expect(output).to.be.like(test.output);
        return Promise.resolve(true);
    }))
  ))

  it('should extract countries written in French', () => Promise.all(
    [
      {
        input: "Cet été je pars au Monténégro puis en Nouvelle Calédonie",
        output: [
          {
              "ngram": "Nouvelle Calédonie",
              "position": {
                "begin": 38,
                "end": 56,
                "sentence": 0,
                "word": 8
              },
              "score": 1,
              "value": {
                "ISO_ALPHA_2": "NC",
                "ISO_ALPHA_3": "NCL",
                "UN_M49": "540",
                "aliases": {
                  "en": [
                    "New Caledonia"
                  ],
                  "fr": [
                    "Nouvelle Calédonie",
                    "Nouvelle Caledonie"
                  ]
                },
                "id": "country-NC",
                "label": {
                  "en": "New Caledonia",
                  "fr": "Nouvelle Calédonie"
                }
              }
            },
            {
              "ngram": "Monténégro",
              "position": {
                "begin": 19,
                "end": 29,
                "sentence": 0,
                "word": 5
              },
              "score": 1,
              "value": {
                "ISO_ALPHA_2": "ME",
                "ISO_ALPHA_3": "MNE",
                "UN_M49": "499",
                "aliases": {
                  "en": [
                    "Montenegro"
                  ],
                  "fr": [
                    "Monténégro",
                    "Montenegro"
                  ]
                },
                "id": "country-ME",
                "label": {
                  "en": "Montenegro",
                  "fr": "Monténégro"
                }
              }
            }
          ]
      }, {
        "input": "my french girlfriend wants to go to \"bosnie-herzégovine\" (Bosnia and Herzegovina)",
        "output": [
          {
            "ngram": "Bosnia and Herzegovina",
            "value": {
              "id": "country-BA",
              "label": {
                "en": "Bosnia and Herzegovina",
                "fr": " Bosnie-Herzégovine"
              },
              "aliases": {
                "en": [
                  "Bosnia and Herzegovina"
                ],
                "fr": [
                  "Bosnie-Herzégovine",
                  "Bosnie-et-Herzégovine",
                  "Bosnie-Herzegovine",
                  "Bosnie-et-Herzegovine"
                ]
              },
              "ISO_ALPHA_2": "BA",
              "ISO_ALPHA_3": "BIH",
              "UN_M49": "070"
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 11,
              "begin": 58,
              "end": 80
            }
          },
          {
            "ngram": "bosnie-herzégovine",
            "value": {
              "id": "country-BA",
              "label": {
                "en": "Bosnia and Herzegovina",
                "fr": " Bosnie-Herzégovine"
              },
              "aliases": {
                "en": [
                  "Bosnia and Herzegovina"
                ],
                "fr": [
                  "Bosnie-Herzégovine",
                  "Bosnie-et-Herzégovine",
                  "Bosnie-Herzegovine",
                  "Bosnie-et-Herzegovine"
                ]
              },
              "ISO_ALPHA_2": "BA",
              "ISO_ALPHA_3": "BIH",
              "UN_M49": "070"
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 8,
              "begin": 37,
              "end": 55
            }
          }
        ]
      }
    ].map(test => parse(test.input).then(output => {
        // console.log("output: " + JSON.stringify(output, null, 2));
        expect(output).to.be.like(test.output);
        return Promise.resolve(true);
    }))
  ))

})
