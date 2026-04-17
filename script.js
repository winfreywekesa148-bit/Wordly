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
