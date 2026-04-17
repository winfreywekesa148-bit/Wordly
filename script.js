const form = document.getElementById('searchform');
const input = document.getElementById('input');
const result = document.getElementById('result');
const audio = document.getElementById('audio');
const description = document.getElementById('description');
const synonyms = document.getElementById('synonyms');

form.addEventListener('submit', searchWord);

function searchWord(e) {
    e.preventDefault();
    let word = input.value.trim();

    if (word) {
        fetchWord(word);
    } else {
        error("Please enter a word");
    }
    fetchWord(word);
}

function fetchWord(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
            if (!response.ok) throw new Error('Word not found');
            return response.json();
        })
        .then(data => displayResult(data[0]))
        .catch(err => error(err.message));
}
// display results
function displayResult(data) {
    result.innerHTML = '';
    result.textContent = data.word;

   const audioData = data.phonetics.find(p => p.audio);
    if (audioData) {
        audio.src = audioData.audio;
        audio.style.display = 'block';
    } else {
        audio.style.display = 'none';
    }

// description
description.innerHTML = `<p id="description"></p>`;
data.meanings.forEach(meaning => {   
     meaning.definitions.forEach(def => {
        const p = document.createElement('p');
        p.textContent = def.definition;
        description.appendChild(p);
    });
});

// synonyms
synonyms.innerHTML = `<p id="synonyms"></p>`;
const allSynonyms = data.meanings.flatMap(m => m.synonyms);
    if (meaning.synonyms.length > 0) {
        synonyms.innerHTML += `<p><strong>Synonyms:</strong> ${meaning.synonyms.join(', ')}</p>`;
    } else {
        synonyms.innerHTML += `<p><strong>Synonyms:</strong> None</p>`;
    }
};

const searchButton = document.getElementById('button');
searchButton.addEventListener('click', searchWord);
    description.push(data.meanings[0].definitions[0].definition);
    synonyms.push(data.meanings[0].synonyms.join(', '));

// errror handling
function error(message) {
    result.innerHTML = '<p>${message}</p>';
    description.innerHTML = "";
    synonyms.innerHTML = "";
    audio.style.display = 'none';
}

displayResult();
fetchWorld(word);



