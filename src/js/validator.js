export class Validator {
  #paySystems;

  constructor() {
    this.#paySystems = new Map([
      ["2", "mir"],
      ["4", "visa"],
      [["51", "52", "53", "54", "55"], "mastercard"],
      [["34", "37"], "american-express"],
      [
        [
          "5018",
          "5020",
          "5038",
          "5893",
          "6304",
          "6759",
          "6761",
          "6762",
          "6763",
        ],
        "maestro",
      ],
    ]);
  }
  checkPaySystem(value) {
    let paySystem = "unknown";
    for (let key of this.#paySystems.keys()) {
      for (let el of key) {
        let regexp = new RegExp(`^${el}`);
        if (regexp.test(value)) {
          paySystem = this.#paySystems.get(key);
        }
      }
    }
    return paySystem;
  }

  isValidCheckDigit(value) {
    let sum = 0;
    let isOdd = true;
    for (let i = value.length - 2; i >= 0; i--) {
      if (isOdd) {
        if (Number(value[i]) * 2 > 9) {
          sum += Number(value[i]) * 2 - 9;
        } else {
          sum += Number(value[i]) * 2;
        }
      } else {
        sum += Number(value[i]);
      }
      isOdd = !isOdd;
    }

    return (sum + Number(value[value.length - 1])) % 10 === 0;
  }
}
