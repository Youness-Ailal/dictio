const form = document.querySelector(".search");
const formInput = form.children.item(0);
const formIcon = form.children.item(1);
const typeText1 = document.querySelector(".app__noun");
const typeText2 = document.querySelector(".app__verb");
const listEl1 = document.querySelector(".app__list");
const listEl2 = document.querySelector(".app__verb--list");
const synText1 = document.querySelector(".app__synonym--word");
const def2El = document.querySelector(".mean2");
const sourceContainer = document.querySelector(".source");
const pron = document.querySelector(".app__prounance");
const sourceLnk = document.querySelector(".source__link");
const mode = document.querySelector(".mode-checker");
const wordText = document.querySelector(".app__word");
const audioBtn = document.querySelector(".app__audio");
const style = document.documentElement.style;
const setColor = function (name, value) {
  style.setProperty(name, value);
};
const selectOption = document.querySelector(".header__input-text");
const searchIcon = document.querySelector(".search__icon");
let audioUrl;
let audio;
console.log(def2El);
// https://api.dictionaryapi.dev/api/v2/entries/en/<word>
const getWords = async function (word) {
  audio = "";
  synText1.textContent = "";
  listEl1.innerHTML = "";
  listEl2.innerHTML = "";
  const res = await (
    await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  ).json();
  const data = res[0];
  const { meanings, phonetic, sourceUrls, phonetics } = data;

  if (phonetics.length > 0) {
    audioUrl = phonetics[0].audio;
    audio = new Audio(audioUrl);
  }

  if (meanings.length === 1) {
    const {
      partOfSpeech: type1,
      definitions: def1,
      synonyms: syn1,
    } = meanings.slice(0, 2)[0];
    typeText1.textContent = type1;
    pron.textContent = phonetic;
    wordText.textContent =
      `${formInput?.value.at(0).toUpperCase()}${formInput.value
        ?.substring(1)
        .toLowerCase()}` || "N/A";
    def1.forEach((el, index) => {
      if (index < 5) {
        const li1 = document.createElement("li");
        li1.classList.add("app__item");
        const { definition } = el;
        li1.textContent = definition;
        listEl1.appendChild(li1);
      }
    });
    typeText2.classList.add("hidden");
    def2El.classList.add("hidden");
    listEl2.classList.add("hidden");
    sourceContainer.classList.add("down");
    if (syn1.length >= 1) {
      synText1.textContent = syn1[0];
    }
    sourceLnk.textContent = sourceUrls[0];
    sourceLnk.setAttribute("href", sourceUrls[0]);
    audioBtn.addEventListener("click", e => {
      if (audio) {
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
      }
    });

    return;
  }

  typeText2.classList.remove("hidden");
  def2El.classList.remove("hiddden");
  listEl2.classList.remove("hidden");
  sourceContainer.classList.remove("down");
  const {
    partOfSpeech: type1,
    definitions: def1,
    synonyms: syn1,
  } = meanings.slice(0, 2)[0];
  const {
    partOfSpeech: type2,
    definitions: def2,
    synonyms: syn2,
  } = meanings.slice(0, 2)[1];
  // handels type
  typeText1.textContent = type1;
  typeText2.textContent = type2;
  pron.textContent = phonetic;
  wordText.textContent =
    `${formInput?.value.at(0).toUpperCase()}${formInput.value
      ?.substring(1)
      .toLowerCase()}` || "N/A";

  //handels defintion
  def1.forEach((el, index) => {
    if (index < 5) {
      const li1 = document.createElement("li");
      li1.classList.add("app__item");
      const { definition } = el;
      li1.textContent = definition;
      listEl1.appendChild(li1);
    }
  });
  def2.forEach((el, index) => {
    if (index < 5) {
      const li2 = document.createElement("li");

      li2.classList.add("app__verb--item");
      const { definition } = el;
      li2.textContent = definition;
      listEl2.appendChild(li2);
    }
  });
  //handeles synonym

  if (syn1.length >= 1) {
    synText1.textContent = syn1[0];
  }
  sourceLnk.textContent = sourceUrls[0];
  sourceLnk.setAttribute("href", sourceUrls[0]);
  audioBtn.addEventListener("click", e => {
    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  });
};

form.addEventListener("submit", e => {
  e.preventDefault();

  if (formInput.value) {
    formInput.classList.remove("invalid");
    searchIcon.classList.remove("invalid--icon");
    console.log("sould work");
    getWords(formInput.value);
  } else {
    formInput.classList.add("invalid");
    searchIcon.classList.add("invalid--icon");
  }
});
formIcon.addEventListener("click", e => {
  e.preventDefault();

  if (formInput.value) {
    formInput.classList.remove("invalid");
    searchIcon.classList.remove("invalid--icon");
    console.log("sould work");
    getWords(formInput.value);
  } else {
    formInput.classList.add("invalid");
    searchIcon.classList.add("invalid--icon");
  }
});

//test
const res = await (
  await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/woman`)
).json();
const data = res[0];
console.log(data);
// handels mode checker
mode.addEventListener("change", e => {
  if (e.target.checked) {
    setColor("--white", "#000");
    setColor("--black", "#fff");
    setColor("--text-light", "#6B7280");
    setColor("--text-light-2", "#F1F5F9");
    setColor("--text-light-3", "#E2E8F0");
    setColor("--input-background", "#1F2937");
    setColor("--background", "#0F172A");
    setColor("--audio", "#134E4A");
    setColor("--error", "#4C0519");
  } else {
    setColor("--background", "#fff");
    setColor("--text-light", "#9ca3af");
    setColor("--text-light-2", "#374151");
    setColor("--text-light-3", "#d1d5db");
    setColor("--black", "#000");
    setColor("--white", "#fff");
    setColor("--input-background", "#f1f5f9");
    setColor("--audio", "#f0fdfa");
    setColor("--error", "#fef2f2");
  }
});

//select
selectOption.addEventListener("change", e => {
  switch (e.target.value) {
    case "Serif":
      setColor("--font", "serif");
      break;

    case "Sans-serif":
      setColor("--font", "sans-serif");
      break;

    case "Monospace":
      setColor("--font", "monospace");
      break;

    default:
      break;
  }
});
