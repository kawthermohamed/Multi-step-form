let steps = document.querySelectorAll(".step");
console.log(steps.length - 1);
let indicators = document.querySelectorAll(".side-indicators .no");
let nextBtn = document.querySelector(".next");
let backBtn = document.querySelector(".back");
let confirmBtn = document.querySelector(".confirm");
let changeBtn = document.querySelector(".change-plan");
let currentStep = 0;
let checkFuns = [chk1, chk2, chk3, chk4];
let stepvalidation = ["false", "false", "false", "false"];

checkCurrentStep();

//current step check

function checkCurrentStep() {
  if (currentStep == 0) {
    backBtn.classList.add("disable");
  } else {
    backBtn.classList.remove("disable");
  }
  if (currentStep == steps.length - 2) {
    nextBtn.classList.add("disable");
    confirmBtn.classList.remove("disable");
  } else {
    nextBtn.classList.remove("disable");
    confirmBtn.classList.add("disable");
  }
  if (currentStep == steps.length - 1) {
    confirmBtn.classList.add("disable");
    backBtn.classList.add("disable");
    nextBtn.classList.add("disable");
  }
}

//step1

function chk1() {
  let inName = document.querySelector("#name");
  let inMail = document.querySelector("#email");
  let inPhone = document.querySelector("#phone");
  let nameWarning = document.querySelector(".name .warning");
  let mailWarning = document.querySelector(".email .warning");
  let phoneWarning = document.querySelector(".phone .warning");

  let validName = "false";
  let validMail = "false";
  let validPhone = "false";
  if (inName.value == "") {
    nameWarning.classList.add("enter");
  } else {
    nameWarning.classList.remove("enter");

    validName = "true";
  }
  if (inMail.value == "") {
    mailWarning.classList.add("enter");
  } else {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inMail.value.match(mailformat)) {
      mailWarning.classList.remove("enter");

      validMail = "true";
    } else {
      mailWarning.classList.add("enter");
    }
  }

  if (inPhone.value == "") {
    phoneWarning.classList.add("enter");
  } else {
    phoneWarning.classList.remove("enter");

    validPhone = "true";
  }
  if (validName == "true" && validMail == "true" && validPhone == "true") {
    stepvalidation[1] = "true";
    nextdecession();
  }
}
//step 2
let plans = document.querySelectorAll(".plan");
plans.forEach((plan) => {
  plan.onclick = function () {
    plans.forEach((ele) => {
      ele.classList.remove("select");
    });
    plan.classList.toggle("select");
  };
});
//
let planTime = document.querySelector(".toggle span");
let yeSpan = document.querySelector(".ye");
let moSpan = document.querySelector(".mo");

planTime.onclick = function () {
  planTime.classList.toggle("year");
  yeSpan.classList.toggle("select");
  moSpan.classList.toggle("select");
};

//

function chk2() {
  plans.forEach((elem) => {
    if (elem.classList.contains("select")) {
      stepvalidation[2] = "true";
      nextdecession();
    }
  });
}

//step 3
let services = document.querySelectorAll(".serv-box");
console.log(services);
let rightChk = document.querySelectorAll(".services img");
services.forEach((serv) => {
  serv.onclick = function () {
    serv.classList.toggle("select");
    serv.children[0].children[0].classList.toggle("checked");
    serv.children[0].children[1].classList.toggle("checked");
  };
});
function chk3() {
  if (
    services[0].classList.contains("select") ||
    services[1].classList.contains("select") ||
    services[2].classList.contains("select")
  ) {
    stepvalidation[3] = "true";
    cusPlan.innerHTML = "";

    filling();

    nextdecession();
  }
}
//step 4
let planSpan = document.querySelector(".ch-plan");
let timeSpan = document.querySelector(".ch-addon");
let priceSpan = document.querySelector(".ch-price");

let cusPlan = document.querySelector(".cus-p");
let totTime = document.querySelector(".tot-addon");
let totPrice = document.querySelector(".tot-price");
//div    cus-plan cus-price

function filling() {
  //1
  plans.forEach((pl) => {
    if (pl.classList.contains("select")) {
      console.log(pl.dataset.name);
      console.log(pl.dataset.price);

      planSpan.innerHTML = pl.dataset.name;
      planTime.classList.contains("year")
        ? (priceSpan.innerHTML = pl.dataset.yprice)
        : (priceSpan.innerHTML = pl.dataset.price);
      //   priceSpan.innerHTML = pl.dataset.price;
    }
  });
  //2
  if (planTime.classList.contains("year")) {
    timeSpan.innerHTML = "(yearly)";
  } else {
    timeSpan.innerHTML = "(Monthly)";
  }

  //3
  services.forEach((se) => {
    if (se.classList.contains("select")) {
      let parentCustom = document.createElement("div");
      let planCustom = document.createElement("span");
      planCustom.classList.add("cus-plan");

      planCustom.innerHTML = se.dataset.option;
      let priceCustom = document.createElement("span");
      priceCustom.classList.add("cus-price");
      timeSpan.innerHTML == "(Monthly)"
        ? (priceCustom.innerHTML = ` $${se.dataset.price}/m`)
        : (priceCustom.innerHTML = ` $${se.dataset.yprice}/y`);

      parentCustom.appendChild(planCustom);
      parentCustom.appendChild(priceCustom);
      cusPlan.appendChild(parentCustom);
    } else {
    }
  });
  //4 total
  timeSpan.innerHTML == "(Monthly)"
    ? (totTime.innerHTML = "(per month)")
    : (totTime.innerHTML = "(per year)");
  let total = 0;
  let servprices = document.querySelectorAll(".cus-price");
  let planTprice;
  timeSpan.innerHTML == "(Monthly)"
    ? (planTprice = +priceSpan.innerHTML.slice(1, 3))
    : (planTprice = +priceSpan.innerHTML.slice(2, 5));
  let prices = [planTprice];
  servprices.forEach((pr) => {
    prices.push(parseInt(pr.innerHTML.slice(2)));
  });
  console.log(prices);
  //heeeeeeeeeeeeeeeeeeeeeeereeeeeeeeeeee
  for (i = 0; i < prices.length; i++) {
    total = total + prices[i];
  }
  timeSpan.innerHTML == "(Monthly)"
    ? (totPrice.innerHTML = `$${total}/m`)
    : (totPrice.innerHTML = `$${total}/y`);
}

function chk4() {}

//

//next fun
nextBtn.onclick = function () {
  Valid();

  checkCurrentStep();
};
//back fun
backBtn.onclick = function () {
  removeActive();
  addbackActive();
  currentStep--;
  console.log(currentStep);
  checkCurrentStep();
};
//
function Valid() {
  checkFuns[currentStep]();
}
//next procedures
function nextdecession() {
  removeActive();
  addActive();
  currentStep++;
  checkCurrentStep();

  console.log(currentStep);
}

function removeActive() {
  steps[currentStep].classList.remove("active");
  indicators[currentStep].classList.remove("active");
}
function addActive() {
  steps[currentStep + 1].classList.add("active");
  indicators[currentStep + 1].classList.add("active");
}

//back procedures
function addbackActive() {
  steps[currentStep - 1].classList.add("active");
  indicators[currentStep - 1].classList.add("active");
}

//
confirmBtn.onclick = function () {
  removeActive();
  currentStep++;

  steps[steps.length - 1].classList.add("active");
  checkCurrentStep();
};

changeBtn.onclick = function () {
  console.log("hi");
  console.log(currentStep);

  removeActive();
  currentStep = 0;
  console.log(currentStep);

  steps[currentStep].classList.add("active");
  indicators[currentStep].classList.add("active");
  checkCurrentStep();
};
