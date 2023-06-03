import { Validator } from "./validator";

const validator = new Validator();

export class CardNumberFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.onSubmit = this.onSubmit.bind(this);
  }

  static get markup() {
    return `
    <div class="widget">
      <ul class="cards">
        <li class="card mir disabled" title="Мир"></li>
        <li class="card visa disabled" title="Visa"></li>
        <li class="card mastercard disabled" title="Mastercard"></li>
        <li class="card maestro disabled" title="Maestro"></li>
        <li class="card american-express disabled" title="American Express"></li>
        <li class="card unknown disabled" title="Unknown pay system"></li>
      </ul>
      <form class="card-form">
        <div class="form-group">
          <input type="text" placeholder="Введите номер карты" class="input">
          <button class="submit">Проверить</button>
        </div>
      </form>
    </div>
      `;
  }

  static get submitSelector() {
    return ".submit";
  }

  static get inputSelector() {
    return ".input";
  }

  static get selector() {
    return ".card-form";
  }

  bindToDOM() {
    this.parentEl.innerHTML = CardNumberFormWidget.markup;
    this.element = this.parentEl.querySelector(CardNumberFormWidget.selector);
    this.submit = this.element.querySelector(
      CardNumberFormWidget.submitSelector
    );
    this.input = this.element.querySelector(CardNumberFormWidget.inputSelector);
    this.cards = this.parentEl.querySelectorAll(".card");

    this.element.addEventListener("submit", this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();

    for (const card of this.cards) {
      card.classList.add("disabled");
    }

    const value = this.input.value;
    const paySystem = validator.checkPaySystem(value);
    const paySystemIcon = document.querySelector(`.${paySystem}`);

    if (validator.isValidCheckDigit(value)) {
      paySystemIcon.classList.remove("disabled");
      this.input.classList.add("valid");
      this.input.classList.remove("invalid");
    } else {
      this.input.classList.add("invalid");
      this.input.classList.remove("valid");
    }
  }
}
