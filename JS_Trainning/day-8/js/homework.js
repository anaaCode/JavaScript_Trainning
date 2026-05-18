document.addEventListener("DOMContentLoaded", function () {

const topic1Snippet = `const book = {
  title: "Wings of fire",
  author: "A P J Abdul Kalam",
  year: 2018,
  pages: 320
};

const key = "title";
console.log(book[key]);  // Wings of fire

book.summary = function () {
  return \`\${this.title} by \${this.author} (\${this.year})\`;
};

console.log(book.summary());  // Wings of fire by A P J Abdul Kalam (2018)`;

const topic2Snippet = `const book = {
  title: "Wings of fire",
  author: "A P J Abdul Kalam",
  year: 2018,
  pages: 320
};

Object.entries(book).forEach(([key, value]) => {
  console.log(\`\${key}: \${value}\`);
});

// Output:
// title: Wings of fire
// author: A P J Abdul Kalam
// year: 2018
// pages: 320`;

const topic3Snippet = `const book = {
  title: "Wings of fire",
  author: "A P J Abdul Kalam",
  year: 2018,
  pages: 320
};

const bookCopy = { ...book };

bookCopy.year = 2020;
bookCopy.title = "Modified Book";

console.log(book);      // Original unchanged
console.log(bookCopy);  // Copy is modified`;

document.querySelector("#topic1Code code").textContent = topic1Snippet;
document.querySelector("#topic2Code code").textContent = topic2Snippet;
document.querySelector("#topic3Code code").textContent = topic3Snippet;

console.log("=== Day 8: Objects - Homework ===");

const book = {
  title: "Wings of fire",
  author: "A P J Abdul Kalam",
  year: 2018,
  pages: 320
};

const key = "title";
console.log(book[key]);

book.summary = function () {
  return `${this.title} by ${this.author} (${this.year})`;
};
console.log(book.summary());

Object.entries(book).forEach(([k, v]) => console.log(`${k}: ${v}`));

const bookCopy = { ...book };
bookCopy.year = 2020;
bookCopy.title = "Modified Book";
console.log(book);
console.log(bookCopy);

});