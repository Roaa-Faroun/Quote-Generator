let apiQuotes = [];
const loader = document.querySelector("#loader");
let quoteContainer = document.querySelector("#quote-container");

function getRandomQuote(len) {
  loadingSpinner();
  let newQuote = Math.floor(Math.random() * len);
  return newQuote;
}
// Show Loading
function loadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Hide Loading
function HideLoading() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Get Quotes From API
async function getQuotes() {
  loadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    const newQuote = apiQuotes[getRandomQuote(apiQuotes.length)];
    let text = newQuote.text;
    let author = newQuote.author;
    if (!author) {
      author = "unknown";
    }
    if (text.length > 120) {
      document.querySelector("#quote").classList.add("long-quote");
    } else {
      document.querySelector("#quote").classList.remove("long-quote");
    }
    document.querySelector("#quote").innerHTML = text;
    document.querySelector("#author").innerHTML = author;
    HideLoading();
  } catch (error) {
    //Catch Handle The Error
    // Try another quote
    getQuotes();
  }
}

// On Load
getQuotes();

const newQuoteBtn = document.getElementById("new-quote");
newQuoteBtn.onclick = () => {
  getQuotes();
};
const newtweetBtn = document.getElementById("twitter");
newtweetBtn.onclick = () => {
  let tweetContent = document.querySelector("#quote").textContent;
  let tweetAuthor = document.querySelector("#author").textContent;
  const twitterURL = `https://twitter.com/intent/tweet?text=${tweetContent} 
  - ${tweetAuthor}`;
  window.open(twitterURL, "_black");
};
