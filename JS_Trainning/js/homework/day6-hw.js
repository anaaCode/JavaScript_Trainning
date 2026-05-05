//-----------Question-1-----------------
function kmToMiles(km) {
  return km * 0.621;
}

console.log(kmToMiles(10)); 

//-----------Question-2-----------------
function gstAmount(price, rate = 18) {
  return (price * rate) / 100;
}

console.log(gstAmount(1000));    

//-----------Question-3-----------------
function fullName(first, last) {
  return `${first} ${last}`;
}

console.log(fullName("Gokul", "Krishna"));

//-----------Question-4-----------------
function isAdult(age) {
  return age >= 18;
}

console.log(isAdult(20)); 
