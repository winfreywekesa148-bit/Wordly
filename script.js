const form = document.getElementById('searchform');
const input = document.getElementById('input');
const result = document.getElementById('result');
const audio = document.getElementById('audio');
const description = document.getElementById('description');
const synonyms = document.getElementById('synonyms');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const word = input.value.trim();
    if (!word) return ;

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error('Word not found');
        const data = await response.json();
        displayResult(data[0]);
    } catch (error) {
        result.innerHTML = `<p>${error.message}</p>`;
    }
});

// display results
function displayResult(data) {
    result.textContent = data.word;

    const audio = data.phonetics.find(p => p.audio);
    if (audioData) {
        audio.src = audioData.audio;
        audio.style.display = 'block';
    } else {
        audio.style.display = 'none';
    }
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
data.meanings.forEach(meaning => {
    if (meaning.synonyms.length > 0) {
        synonyms.innerHTML += `<p><strong>Synonyms:</strong> ${meaning.synonyms.join(', ')}</p>`;
    } else {
        synonyms.innerHTML += `<p><strong>Synonyms:</strong> None</p>`;
    }
});


