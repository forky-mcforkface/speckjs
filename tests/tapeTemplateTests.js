var test = require('tape');
var template = require('template-utils.js');
var tapeTemplates = require('tape-templates.js');

// TEST FIXTURE

test('tape template function', function (t) {
    t.plan(2); // How many tests?
    //Dummy data for parsed comment
    var dataObj = {
    specType : 'tape',
    specFileSrc : 'app.js',
    tests : [
      { testTitle: 'sum function',
        assertions: [
          { assertionMessage: 'return the sum of both params',
            assertionType: 'equals',
            assertionInput: 'sum(6, 7)',
            assertionOutput: '13'
          },
          { assertionMessage: 'return the sum of both params',
            assertionType: 'equals',
            assertionInput: 'sum(8, 9)',
            assertionOutput: '17'
          }
        ]
      },
      { testTitle: 'multiply function',
        assertions: [
          { assertionMessage: 'return the product of both params',
            assertionType: 'equals',
            assertionInput: 'mult(4, 5)',
            assertionOutput: '20'
          }
        ]
      }
    ]
    };
    var emptyTestObj = {
      specType : 'tape',
      specFileSrc : 'app.js',
      tests : [
        { testTitle: 'sum function',
          assertions: []
        }
       ]
    };

    var singleTestObj = {
      specType : 'tape',
      specFileSrc : 'app.js',
      tests : [
      { testTitle: 'sum function',
        assertions: [
          { assertionMessage: 'return the sum of both params',
            assertionType: 'equals',
            assertionInput: 'sum(6, 7)',
            assertionOutput: '13'
          },
          { assertionMessage: 'return the sum of both params',
            assertionType: 'equals',
            assertionInput: 'sum(8, 9)',
            assertionOutput: '17'
          }
        ]
      }
     ]
    };
    var normalTestBlock = "test('sum function', function (t) {" +
                            "t.equal(sum(6, 7), 13, 'return the sum of both params')" +
                            "t.equal(sum(8, 9), 17, 'return the sum of both params')"+
                          ")}" +
                          "test('multiply function', function (t) {" +
                            "t.equal(multiply(4, 5), 20, 'return the product of both params')" +
                          ")}";
    var singleTestBlock = "test('sum function', function (t) {" +
                            "t.equal(sum(6, 7), 13, 'return the sum of both params')" +
                            "t.equal(sum(8, 9), 17, 'return the sum of both params')"+
                          ")}";
    var emptyTestBlock = "test('sum function', function (t) {" +
                          "})";
    //It takes an empty object and outputs an empty test block
    t.equal(template.addTestDataToBaseTemplate(tapeTemplates.baseTemplate, emptyTestObj), emptyTestBlock, 'Takes an test with 0 assertion and outputs a base template');
    //It takes one test block and produces a properly formatted tape test
    t.equal(template.addTestDataToBaseTemplate(tapeTemplates.baseTemplate, singleTestObj), emptyTestBlock, 'Takes an test with 0 assertion and outputs a base template');
    //It takes multiple test blocks and produces a properly formatted tape test
    t.equal(template.addTestDataToBaseTemplate(tapeTemplates.baseTemplate, dataObj), normalTestBlock, 'Takes a properly formatted object and outputs a formatted test block');
    //If a field is missing, return error, missing field
});
