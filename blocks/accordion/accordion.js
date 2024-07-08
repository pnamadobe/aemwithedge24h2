import { fetchAPI } from "../../scripts/scripts.js";

/* this function also gets called by accordion-group */
export function generateAccordionDOM(block) {
  const details = document.createElement("details");
  const summary = document.createElement("summary");
  details.append(summary);
  Array.from(block.children).forEach(async (element, i) => {
    if (i === 0) {
      // const heading = element.querySelector("h2,h3,h4,h5,h6");
      const heading = element;
      summary.append(heading || element.textContent.trim());
    } else {
      const url = element.innerText.trim();
      const isurl = url.includes(".json");
      const elementText = element.innerHTML;
      var elementDiv = document.createElement("div");
      if (isurl) {
        let data = await renderDataFromAPI(url);
        elementDiv.innerHTML += JSON.stringify(data);
      } else {
        elementDiv.innerHTML = elementText;
      }
      details.append(elementDiv);
    }
  });
  return details;
}

export default function decorate(block) {
  const dom = generateAccordionDOM(block);
  block.textContent = "";
  block.append(dom);
}

async function renderDataFromAPI(url) {
  const resp = await fetchAPI("GET", url);
  const data = await resp.json();
  return data;
}


