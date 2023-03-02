const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote-text')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

function showLoadingSpinner() {
  loader.hidden = false
  quoteContainer.hidden = true
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true
    quoteContainer.hidden = false
  }
}

// Show new Quote
function newQuote() {
  showLoadingSpinner()

  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

  // Check if author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown'
  } else {
    authorText.textContent = quote.author
  }

  // Check the quote lenght to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }

  // Set quote, hide loader
  quoteText.textContent = quote.text
  removeLoadingSpinner()
}

// Get Quotes from API
async function getQuotes() {
  showLoadingSpinner()
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'

  try {
    const response = await fetch(apiUrl)

    apiQuotes = await response.json()

    newQuote()
  } catch (error) {
    console.log(error)
  }
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.authorContent}`
  window.open(twitterUrl, '_blanck')
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes()
