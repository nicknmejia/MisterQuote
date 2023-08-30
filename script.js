const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter-btn');
const newQuoteBtn = document.getElementById('new-quote-btn');

let apiQuotes = [];

// Show new quote
function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];

    // Check if Author field is blank and replace it with 'Unknown'
    authorText.textContent = !quote.author ? 'Unknown' : quote.author;
    quoteText.textContent = quote.text;

    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
}

// Get Quotes from API
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log(error);
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    window.open(twitterUrl, '_blank');

}

// On Load
getQuotes();

// Event Listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);