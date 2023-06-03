import { CardNumberFormWidget } from "./widget";

const container = document.querySelector(".container");
const form = new CardNumberFormWidget(container);

form.bindToDOM();
