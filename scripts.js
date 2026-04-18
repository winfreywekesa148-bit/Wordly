// input elements
const form = document.getElementById("searchform");
const input = document.getElementById("input");

// output elements
const wordTitle = document.getElementById("word");
const phonetic = document.getElementById("phonetic");
const audioPlayer = document.getElementById("audio");
const descriptionDiv = document.getElementById("description");
const synonymsDiv = document.getElementById("synonyms");
const source = document.getElementById("source");

// API endpoint
const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// Fetch word data
async function fetchWord(word) {
  try {
    const response = await fetch(API_URL + word);
    
    if (!response.ok) {
      throw new Error("Word not found");
    
    }

    const data = await response.json();
    displayResults(data[0]);

  } catch (error) {
    displayError(error.message);
  }
}

// Display results
function displayResults(data) {
  wordTitle.textContent = data.word;
  phonetic.textContent = data.phonetic || "No pronunciation available";

  // Audio
  const audioSrc = data.phonetics.find(p => p.audio)?.audio;
  if (audioSrc) {
    audioPlayer.src = audioSrc;
    audioPlayer.hidden = false;
  } else {
    audioPlayer.hidden = true;
  }

  // Phonetic
  const phoneticText = data.phonetics.find(p => p.text)?.text;
  if (phoneticText) {
    phonetic.textContent = phoneticText;
  } else {
    phonetic.textContent = "No pronunciation available";
  }

  // Description
  descriptionDiv.innerHTML = "<h3>Description</h3>";
  data.meanings.forEach(meaning => {
    meaning.definitions.forEach(def => {
      const p = document.createElement("p");
      p.classList.add("description");
      p.textContent = def.description;
      descriptionDiv.appendChild(p);
    });
  });

  // Synonyms
  synonymsDiv.innerHTML = "<h3>Synonyms</h3>";
  const synonyms = data.meanings.flatMap(m => 
    m.definitions.flatMap(d => d.synonyms || []));

  if (synonyms.length) {
    synonyms.forEach(syn => {
      const span = document.createElement("span");
      span.classList.add("synonyms");
      span.textContent = syn;
      synonymsDiv.appendChild(span);
    });
  } else {
    synonymsDiv.innerHTML += "<p>No synonyms available</p>";
  }

  // Source
  source.textContent = data.sourceUrls?.[0] || "";
}

// Error display
function displayError(message) {
  document.getElementById("results").innerHTML = `<p>${message}</p>`;
}

function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 5000);
};

function resetUI() {
  input.value = "";
  descriptionDiv.innerHTML = "";
  synonymsDiv.innerHTML = "";
  wordTitle.textContent = "";
  phonetic.textContent = "";
}


// Event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const word = input.value.trim();

  if (!word) {
    displayError("Please enter a word");
    return;
  }

  fetchWord(word);
  showToast();
  setTimeout(resetUI, 5000);
});

