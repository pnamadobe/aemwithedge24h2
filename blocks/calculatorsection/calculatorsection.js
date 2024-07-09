import { fetchAPI } from "../../scripts/scripts.js";
import { firstTabActive } from "../emiandeligiblitycalc/commonfile.js";
import { homeLoanCalcFunc } from "../emiandeligiblitycalc/homeloancalculators.js";
import { renderCalculatorData } from "../emiandeligiblitycalc/renderhpcal.js";
import { CalcHTM } from "../emiandeligiblitycalc/templatehtml1.js";

export default async function decorate(block) {
  let cfURL = block.textContent.trim();

  const cfRepsonse = await CFApiCall(cfURL);
  const repsonseData = cfRepsonse.data[0].data;
  const jsonResponseData = JSON.parse(repsonseData);

  block.innerHTML = CalcHTM(jsonResponseData);

  let elgCalDiv, elgOverlay, calculatorType; 

  try {
    elgCalDiv = document.querySelector(".home-page-calculator-call-xf");
    elgOverlay = elgCalDiv.querySelector(".cmp-container--caloverlay");
    const currentSection = document.querySelector(".home-page-calculator-call-xf");
    calculatorType = currentSection.querySelector(".home-loan-calculator-parent.emi") ? "emi" : "eligibility"
    homeLoanCalcFunc(currentSection);
    renderCalculatorData(currentSection, calculatorType);
    firstTabActive(currentSection);
  } catch (error) {
    console.warn(error);
  }
}

export async function CFApiCall(cfurl) {
  const response = await fetchAPI("GET", cfurl);
  const responseJson = await response.json();
  return responseJson;
}
