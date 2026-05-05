//-----------Question-1-----------------
const book = {
  title: "Wings of fire",
  author: "A P J Abdul Kalam",
  year: 2018,
  pages: 320
};

const key = "title";
console.log(book[key]); 

//-----------Question-2-----------------
book.summary = function () {
  return `${this.title} by ${this.author} (${this.year})`;
};

console.log(book.summary());

//-----------Question-3-----------------
Object.entries(book).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

//-----------Question-4-----------------
const bookCopy = { ...book };

bookCopy.year = 2020;
bookCopy.title = "Modified Book";

console.log(book);
console.log(bookCopy);