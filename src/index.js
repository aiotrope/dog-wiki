import "./styles.css";

const breeds = ["rottweiler", "beagle", "dalmatian", "dingo", "komondor"];

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

// init
function initializeCode() {
  let dogElements = document.createElement("div");
  dogElements.classList.add("container");
  let app = document.querySelector("#app");
  app.appendChild(dogElements);
  for (let i = 0; i < breeds.length; i += 1) {
    const breed = breeds[i];
    dogElements.appendChild(generateDogWikiItem(breed));
  }
}

// wiki html element for diff. dog breeds
function generateDogWikiItem(breed) {
  let wikiItem = document.createElement("div");
  wikiItem.classList.add("wiki-item");

  let wikiContent = document.createElement("div");
  wikiContent.classList.add("wiki-content");

  let imgWrapper = dogImgElement(breed);

  let [wikiText, wikiHeader] = dogWikiContent(breed);

  wikiItem.appendChild(wikiHeader);
  wikiContent.appendChild(imgWrapper);
  wikiContent.appendChild(wikiText);

  wikiItem.appendChild(wikiContent);
  return wikiItem;
}
function dogWikiContent(breed) {
  let wikiHeader = document.createElement("h1");
  wikiHeader.classList.add("wiki-header");
  let wikiText = document.createElement("p");
  wikiText.classList.add("wiki-text");

  getDogBreedInfo(breed)
    .then((wiki) => {
      let textNode = document.createTextNode(wiki.extract);
      wikiText.appendChild(textNode);
      wikiHeader.textContent = wiki.title;
    })
    .catch((error) => {
      console.error("wiki fetch error:", error);
    });
  return [wikiText, wikiHeader];
}
function dogImgElement(breed) {
  let imgWrapper = document.createElement("div");
  imgWrapper.classList.add("img-container");
  let img = document.createElement("img");
  img.classList.add("wiki-img");
  fetchDogImg(breed)
    .then((data) => {
      img.src = data.message;
    })
    .catch((error) => {
      console.error("Dog Img API error:", error);
    });
  imgWrapper.appendChild(img);
  return imgWrapper;
}
async function fetchDogImg(breed) {
  let jsonData;
  try {
    const res = await fetch(
      `https://dog.ceo/api/breed/${breed}/images/random`,
      {}
    );
    jsonData = await res.json();
  } catch (error) {
    console.error(error);
  }

  return jsonData;
}

// description from WikiAPI
async function getDogBreedInfo(breed) {
  let jsonData;
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    jsonData = await res.json();
  } catch {
    console.error(error);
  }
  return jsonData;
}
