function randomDataset() {
  var _randomNum = function () {
    return Math.floor(Math.random() * 100) + 5;
  };
    return {
    "key": "Languages",
    "values": [{
      "key": "JavaScript",
      "value": _randomNum()
    }, {
      "key": "C++",
      "value": _randomNum()
    }, {
      "key": "Java",
      "value": _randomNum()
    }, {
      "key": "Ruby",
      "value": _randomNum()
    }, {
      "key": "Python",
      "value": _randomNum()
    }, {
      "key": "PHP",
      "value": _randomNum()
    }, {
      "key": "Perl",
      "value": _randomNum()
    }, {
      "key": "Basic",
      "value": _randomNum()
    }, {
      "key": "Assembly",
      "value": _randomNum()
    }, {
      "key": "Lisp",
      "value": _randomNum()
    }]
  };
}
