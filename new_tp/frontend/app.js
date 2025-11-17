import Book from "./books.js";

const API = "http://localhost:5000/api/books";

// Fetch books on load
document.addEventListener("DOMContentLoaded", loadBooks);

async function loadBooks() {
    const res = await fetch(API);
    const books = await res.json();
    displayBooks(books);
}

function displayBooks(books) {
    const list = document.getElementById("booksList");
    list.innerHTML = "";

    books.forEach(book => {
        const b = new Book(book);
        list.innerHTML += `
            <div class="bg-white p-4 my-2 shadow rounded">
                <h2 class="text-xl font-bold">${b.title}</h2>
                <p>Author: ${b.author}</p>
                <p>Progress: ${b.currentlyAt()}%</p>
                <button onclick="deleteBook('${b._id}')" class="bg-red-500 text-white px-2 py-1 mt-2 rounded">
                    Delete
                </button>
            </div>
        `;
    });
}

window.deleteBook = async function(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadBooks();
};

// Form submit
document.getElementById("bookForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const data = {
        title: title.value,
        author: author.value,
        pages: Number(pages.value),
        pagesRead: Number(pagesRead.value),
        status: status.value,
        format: format.value,
        suggestedBy: suggestedBy.value
    };

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    loadBooks();
});
