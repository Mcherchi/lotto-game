const {randomNumbers} = require("../Controller/utils");

class Extraction {
  static idCounter = 0;
  #numbers = 5;
  _date;
  _cities = [
    "Bari",
    "Cagliari",
    "Firenze",
    "Genova",
    "Milano",
    "Napoli",
    "Palermo",
    "Roma",
    "Torino",
    "Venezia",
  ];

  constructor(){
    this._id = ++Extraction.idCounter;
    this._date = new Date().toLocaleDateString('it-IT');
    this._extraction = this.#generateExtraction();
  }

  #generateExtraction(){
    const numbersPerCity = {};
    for(const city of this._cities){
        numbersPerCity[city] = randomNumbers(this.#numbers);
    }
    return numbersPerCity;
  }
}

module.exports = {Extraction};