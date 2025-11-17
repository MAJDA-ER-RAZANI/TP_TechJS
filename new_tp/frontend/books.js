export default class Book {
    constructor(data) {
        Object.assign(this, data);
    }

    currentlyAt() {
        return (this.pagesRead / this.pages * 100).toFixed(1);
    }

    deleteBook(id) {
        return fetch(`http://localhost:5000/api/books/${id}`, { method: "DELETE" });
    }
}
