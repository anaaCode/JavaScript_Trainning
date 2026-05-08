// Task 1: Safe JSON Parse

function safeParse(str) {

  try {

    return JSON.parse(str);

  } catch (error) {

    console.log("Invalid JSON:", error.message);

    return null;

  }

}


console.log(
  safeParse('{"name":"Priya"}')
);

console.log(
  safeParse('{"name":"Priya"')
);




// Task 2: Throw on Bad Age

function setAge(age) {

  if (typeof age !== "number") {
    throw new Error("Age must be a number");
  }

  if (age < 0 || age > 120) {
    throw new Error("Age must be 0–120");
  }

  return age;

}


try {

  console.log(setAge(25));

} catch (err) {

  console.log(err.message);

}


try {

  console.log(setAge("twenty"));

} catch (err) {

  console.log(err.message);

}


try {

  console.log(setAge(200));

} catch (err) {

  console.log(err.message);

}




// Task 3: Custom ValidationError on Email

class ValidationError extends Error {

  constructor(message) {

    super(message);

    this.name = "ValidationError";

  }

}


function validateEmail(email) {

  if (!email.includes("@")) {

    throw new ValidationError(
      "Email must contain @"
    );

  }

  return "Valid email";

}


try {

  console.log(
    validateEmail("priya@example.com")
  );

} catch (err) {

  if (err instanceof ValidationError) {

    console.log(
      "Validation Error:",
      err.message
    );

  } else {

    console.log(
      "Other Error:",
      err.message
    );

  }

}


try {

  console.log(
    validateEmail("priya-no-at")
  );

} catch (err) {

  if (err instanceof ValidationError) {

    console.log(
      "Validation Error:",
      err.message
    );

  } else {

    console.log(
      "Other Error:",
      err.message
    );

  }

}