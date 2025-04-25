document.getElementById("recommendationForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const query = document.getElementById("query").value;
    const count = document.getElementById("count").value || 6;
    const resultsDiv = document.getElementById("results");
    const errorDiv = document.getElementById("error");
    resultsDiv.innerHTML = "Loading...";
    errorDiv.textContent = "";

    try {
        const response = await fetch(`https://koralal-book-recommender.hf.space/recommend_books/${query}?length=${count}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const books = await response.json();
        if (books.error) throw new Error(books.error);

        resultsDiv.innerHTML = books.map(book => `
                    <div class="card">
                        <div class="title">${book.Book}</div>
                        <div class="author">By ${book.Author}</div>
                    </div>
                `).join("");
    } catch (error) {
        errorDiv.textContent = error.message;
        resultsDiv.innerHTML = "";
    }
});