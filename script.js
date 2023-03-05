const QuoteText = document.querySelector(".quote");
quoteBtn = document.querySelector("button");
authorName = document.querySelector(".author .name");
soundBtn = document.querySelector(".sound");
copyBtn = document.querySelector(".copy");
shareBtn = document.querySelector(".share");

function randomQuote() {
    quoteBtn.classList.add("loading");
    quoteBtn.innerHTML = "Loading..."
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result =>{
        console.log(result);
        QuoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.innerText = "New Quote"
        quoteBtn.classList.remove("loading");
    });
}

quoteBtn.addEventListener("click", randomQuote)

// share button
shareBtn.addEventListener("click", event =>{
    // To check if browser support native share api
    if (navigator.share) {
        navigator.share({
            title: 'Quote of the Day',
            text: QuoteText.innerText + '--' + authorName.innerText,
        }).then(()=>console.log("successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
    // fallback
    else{
        alert("The current Browser does not support the share function. please, share link manually")
    }
});

// audio reading
soundBtn.addEventListener("click", () =>{
    let utterance = new SpeechSynthesisUtterance(QuoteText.innerText + 'by' + authorName.innerText);
    speechSynthesis.speak(utterance);
});

// copy btn
copyBtn.addEventListener("click", () =>{
    navigator.clipboard.writeText(QuoteText.innerText + ' __ ' + authorName.innerText)

    alert("Quote copied to clipboard.")
});