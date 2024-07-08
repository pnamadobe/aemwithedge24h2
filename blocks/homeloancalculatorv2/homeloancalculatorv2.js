/* import { renderCalculatorData } from "./renderhpcal.js";
import { firstTabActive } from "./commonfile.js"; */
import { homeloanCalHTML } from "./templatehtmlv2.js";
import { homeLoanCalcFunc } from "./homeloancalculators.js";
import { calculatorTypeTabClick, mainTabClick, renderEmiEligibility } from "./combineemieligibility.js";

 
let calculatorType, emiCalDiv, emiOverlay;

export default async function decorate(block) {
  let cfURL = block.querySelector("a")?.textContent.trim();
  // const cfRepsonse = await CFApiCall(cfURL);

  const callJson = {
    total: 1,
    offset: 0,
    limit: 1,
    data: [
      {
        maindivbackground: "emi",
        mainheadingclass: "",
        title: "",
        salaried: {
          salariedcheck: true,
          salariedtabid: "salariedTab",
          salariedtabname: "employementStatus",
          salariedtabvalue: "65",
          salariedtabtext: "I'm Salaried",
          calculatorsalariedimg: "https://publish-p133703-e1305981.adobeaemcloud.com/content/dam/piramalfinance/product-page/home-loan/calculator-salaried.svg",
          calculatorsalariedimgalt: "salaried",
        },
        business: {
          businesscheck: true,
          businesstabid: "businessTab",
          businesstabname: "employementStatus",
          businesstabvalue: "80",
          businesstabtext: "I'm doing Business",
          calculatorbusinessimg: "https://publish-p133703-e1305981.adobeaemcloud.com/content/dam/piramalfinance/product-page/home-loan/calculator-business.svg",
          calculatorbusinessimgalt: "business",
        },
        selectloantype: {
          checboxemitab: true,
          subheading: "Calculate EMI & Check eligibility",
          subheadingtow: "",
        },
        tabname: {
          firsttabbname: "EMI Calculator",
          secondtabbname: "Eligibility Calculator",
          thridtabname: "",
        },
        chechboxemiobj: {
          chechboxemi: true,
          loanamout: [
            {
              label: "Loan amount (Rs.)",
              labelyearsvalue: "",
              rupeesign: "₹",
              dataslider: "em1",
              dataattr: "loanamt",
              rangeminvalue: "500000",
              rangemaxvalue: "100000000",
              rangestep: "10000",
              displayvalue: "2500000",
              minvaluetext: "5L",
              maxvaluetext: "10Cr",
            },
            {
              label: "Loan Tenure (Years)",
              labelyearsvalue: "Years",
              rupeesign: "",
              dataslider: "em2",
              dataattr: "tenure",
              rangeminvalue: "5",
              rangemaxvalue: "30",
              rangestep: "1",
              displayvalue: "10",
              minvaluetext: "5Y",
              maxvaluetext: "30Y",
            },
            {
              label: "Interest Rate (% p.a)",
              labelyearsvalue: "%",
              rupeesign: "",
              dataslider: "em3",
              dataattr: "roi",
              rangeminvalue: "7",
              rangemaxvalue: "30",
              rangestep: "0.1",
              displayvalue: "11",
              minvaluetext: "7%",
              maxvaluetext: "30%",
            },
          ],
        },
        chechboxelibilityobj: {
          chechboxemi: true,
          loanamout: [
            {
              label: "Gross Monthly Income (Rs.)",
              labelyearsvalue: "",
              rupeesign: "₹",
              dataslider: "el1",
              dataattr: "income",
              rangeminvalue: "20000",
              rangemaxvalue: "1000000",
              rangestep: "10000",
              displayvalue: "100000",
              minvaluetext: "20k",
              maxvaluetext: "10L",
            },
            {
              label: "Other Loan EMIs (Rs.)",
              labelyearsvalue: "",
              rupeesign: "₹",
              dataslider: "el2",
              dataattr: "otherloan",
              rangeminvalue: "0",
              rangemaxvalue: "500000",
              rangestep: "5000",
              displayvalue: "0",
              minvaluetext: "0",
              maxvaluetext: "5L",
            },
            {
              label: "Interest Rate (% p.a)",
              labelyearsvalue: "%",
              rupeesign: "",
              dataslider: "el3",
              dataattr: "roi",
              rangeminvalue: "10.5",
              rangemaxvalue: "20",
              rangestep: "0.1",
              displayvalue: "10.5",
              minvaluetext: "10.50%",
              maxvaluetext: "20%",
            },
            {
              label: "Loan Tenure (Years)",
              labelyearsvalue: "Years",
              rupeesign: "",
              dataslider: "el4",
              dataattr: "tenure",
              rangeminvalue: "5",
              rangemaxvalue: "30",
              rangestep: "1",
              displayvalue: "10",
              minvaluetext: "5Y",
              maxvaluetext: "30Y",
            }
          ],
        },
        calendarboxemi: "https://publish-p133703-e1305981.adobeaemcloud.com/content/dam/piramalfinance/homepage/images/calc-calendar-mobile.webp",
        calendarmobileelg: "https://publish-p133703-e1305981.adobeaemcloud.com/content/dam/piramalfinance/product-page/home-loan/calculator-tick.png",
        outputtext1: "Your home loan EMI is",
        outputtext2: "Your home loan eligibility is",
        principaltext: "Principal amount",
        interesttext: "Interest amount",
        button1text: "Talk to loan expert",
        button2text: "Apply loan now",
        button1link: "",
        button2link: "",
        pageproperties: "hl",
      },
    ],
    ":type": "sheet",
  };

  block.innerHTML = homeloanCalHTML(callJson);
  debugger;
  try {
    let currentSection = document.querySelector(".home-page-calculator-call-xf");
    let calculatorType = currentSection.querySelector('.tab-emi-calc.active');

    if(calculatorType.classList.contains('tab-emi-calc')){
      calculatorType = 'emi';
    }else if(calculatorType.classList.contains('tab-eligibility-calc')){
      calculatorType = 'eligibility';
    }

    let calDefaultValueObj = {};

    let calculators = document.querySelectorAll(".homeloancalculator .calctabs .commoncalculator");
    
    calculators.forEach((cal, index) => {
        const resetId = "calid-" + index;
        cal.dataset.resetId = resetId;
        calDefaultValueObj[resetId] = Object.fromEntries([...cal.querySelectorAll("input[type=range]")].map(input => [input.id, input.value]));
    });

    sessionStorage.setItem("calDefaultValueObj", JSON.stringify(calDefaultValueObj));

  homeLoanCalcFunc(currentSection);

    let isCombinedEmiEligibility = document.querySelector(".combined-emi-eligibility");
    if(isCombinedEmiEligibility) {
        let parentElement = isCombinedEmiEligibility.closest(".homeloancalculator");
        renderEmiEligibility(parentElement);
        mainTabClick(parentElement);
        calculatorTypeTabClick(parentElement);

        parentElement.addEventListener("change", function({target}) {
            if(target.tagName != "INPUT") return;
            renderEmiEligibility(parentElement);
        });

    }

  /* renderCalculatorData(currentSection, calculatorType);
  firstTabActive(currentSection); */

  } catch (error) {
    console.warn(error);
  }
}

export async function CFApiCall(cfurl) {
  const cfModification = cfurl?.replace("/content/dam/", "/api/assets/");
  const response = await fetchAPI(cfModification);
  const responseJson = await response.json();
  return responseJson;
}

/* export function homeLoancalculatorCallXf() {
  document.querySelectorAll("[data-teaserv2-xf='home-page-calculator-call-xf']") &&
    document.querySelectorAll("[data-teaserv2-xf='home-page-calculator-call-xf']").forEach((eachTeaserv2) => {
      eachTeaserv2.addEventListener("click", function (e) {
        e.stopImmediatePropagation();
        const xfGetAttr = this.getAttribute("data-teaserv2-xf");
        const findSectionXFShow = document.querySelector("." + xfGetAttr);
        const currentSection = document.querySelector(".home-page-calculator-call-xf .homeloancalculator-wrapper");
        findSectionXFShow.querySelector(".overlayDiv").classList.add("show");
        if (xfGetAttr == "home-page-calculator-call-xf") {
          findSectionXFShow.classList.remove("dp-none"); // look
          calculatorType = "emi";
          emiOverlay.classList.add("show");
          document.querySelector(".modal-overlay").classList.add("overlay");
          document.querySelector(".modal-overlay").classList.remove("dp-none");
          document.body.style.overflow = "hidden";
          homeLoanCalcFunc(currentSection);
          renderCalculatorData(currentSection, calculatorType);
          firstTabActive(currentSection);
        }
        targetObject.model = currentSection;
        // xfShowHideBodyClick(currentSection);
      });
    });
} */

