const billInput = document.querySelector("#bill-input");
const selectTip = document.querySelectorAll(".tip-percentage");
const tipCustom = document.querySelector(".tip-custom");
const numberOfPeople = document.querySelector("#number-of-people-input");
const tipAmountValue = document.querySelector(".tip-amount-value");
const totalValuePerPeson = document.querySelector(".total-amount-per-person");
const btnCalculate = document.querySelector(".btn-calculate");
const btnReset = document.querySelector(".btn-reset");

//make tip percentage buttons clickable
selectTip.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    selectTip.forEach((tipBtn) => {
      tipBtn.classList.remove("active");
    });

    if (event.target.classList.contains("tip-custom")) {
      event.target.parentElement.classList.add("active");
    } else {
      event.target.classList.add("active");
    }
  });
});

//CALCULATE BUTTON
const calculateTip = () => {
  const billValue = parseFloat(billInput.value);
  const noOfPeople = parseFloat(numberOfPeople.value);
  const tipCustomActive = document.querySelector(".select-tip-custom.active");
  let tipPercentage = parseInt(
    document.querySelector(".tip-percentage.active").dataset.percentage
  );

  if (tipCustomActive) {
    tipPercentage = parseFloat(document.querySelector(".tip-custom").value);
  }

  const total = parseFloat((tipPercentage / 100) * billValue).toFixed(2);
  const tipAmount = parseFloat(total / noOfPeople).toFixed(2);
  const totalAmountPlusTip = parseFloat(
    (billValue + parseFloat(total)) / noOfPeople
  ).toFixed(2);

  tipAmountValue.innerHTML = `$${tipAmount}`;
  totalValuePerPeson.innerHTML = `$${totalAmountPlusTip}`;
};

btnCalculate.addEventListener("click", () => {
  calculateTip();
});

//RESET BUTTON
btnReset.addEventListener("click", () => {
  billInput.value = "0";
  tipCustom.value = "";
  numberOfPeople.value = "1";
  tipAmountValue.innerHTML = "$0.00";
  totalValuePerPeson.innerHTML = "$0.00";

  selectTip.forEach((tipBtn) => {
    tipBtn.classList.remove("active");
  });
});

const isNumber = (num) => {
  // Allow Exceptions
  if (
    num === "Backspace" ||
    num === "ArrowLeft" ||
    num === "ArrowRight" ||
    num === "."
  ) {
    return true;
  }

  const regex = /^[0-9]+$/;

  return regex.test(num);
};

//PREVENT ALPHABET INPUT
billInput.addEventListener("keydown", (event) => {
  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});

tipCustom.addEventListener("keydown", (event) => {
  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});

numberOfPeople.addEventListener("keydown", (event) => {
  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});
