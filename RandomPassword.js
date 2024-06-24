class Password {
  // Static properties for different character sets, shuffled using fisherYatesShuffle method
  static UpperCase = Password.fisherYatesShuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  static LowerCase = Password.fisherYatesShuffle("abcdefghijklmnopqrstuvwxyz");
  static Numbers = Password.fisherYatesShuffle("0123456789");
  static Special = Password.fisherYatesShuffle("!@#$%^&*()_+[]{},./:;'`~<>?");

  // Constructor to initialize password properties
  constructor(digitsAllowed) {
    this.digits = digitsAllowed; // Total number of characters in the password
    this.UpperAllowed = false; // Flag to allow uppercase letters
    this.LowerAllowed = false; // Flag to allow lowercase letters
    this.NumbersAllowed = false; // Flag to allow numbers
    this.SpecialAllowed = false; // Flag to allow special characters
    this.unique = false; // Flag to ensure all characters are unique
    this.password = ""; // Generated password
  }

  // Methods to enable different types of characters, returning 'this' for method chaining
  addUppercaseLetters() {
    this.UpperAllowed = true;
    return this; // Enable chaining
  }

  addNumbers() {
    this.NumbersAllowed = true;
    return this; // Enable chaining
  }

  addLowerCaseLetters() {
    this.LowerAllowed = true;
    return this; // Enable chaining
  }

  addSpecialCharacters() {
    this.SpecialAllowed = true;
    return this; // Enable chaining
  }

  allUniqueCharacters() {
    this.unique = true;
    return this; // Enable chaining
  }

  // Method to generate the password
  generate() {
    // Calculate the total number of character types allowed
    let totalAllowed =
      this.UpperAllowed +
      this.LowerAllowed +
      this.NumbersAllowed +
      this.SpecialAllowed;

    // Ensure at least one character type is allowed
    if (totalAllowed === 0) {
      throw new Error("At least one type of character should be allowed.");
    }

    // Calculate the number of characters of each type
    let x = Math.floor(this.digits / totalAllowed);
    let buffer = this.digits % totalAllowed;

    // Distribute the remaining characters
    let numU = this.UpperAllowed ? x + (buffer-- > 0 ? 1 : 0) : 0;
    let numL = this.LowerAllowed ? x + (buffer-- > 0 ? 1 : 0) : 0;
    let numN = this.NumbersAllowed ? x + (buffer-- > 0 ? 1 : 0) : 0;
    let numS = this.SpecialAllowed ? x + (buffer-- > 0 ? 1 : 0) : 0;

    // Generate the password with random unique items from each character set
    this.password =
      Password.getRandomUniqueItems(Password.UpperCase, numU) +
      Password.getRandomUniqueItems(Password.LowerCase, numL) +
      Password.getRandomUniqueItems(Password.Numbers, numN) +
      Password.getRandomUniqueItems(Password.Special, numS);

    // Shuffle the final password and return it
    this.password = Password.fisherYatesShuffle(this.password);
    return this.password;
  }

  // Static method to shuffle a string using the Fisher-Yates algorithm
  static fisherYatesShuffle(str) {
    let arr = str.split("");
    let n = arr.length;
    for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join("");
  }

  // Static method to get random unique items from a string
  static getRandomUniqueItems(str, n) {
    if (n > str.length) {
      throw new Error(
        "n should be less than or equal to the length of the string"
      );
    }
    if (this.unique) {
      const items = new Set(); // Use a Set to ensure uniqueness
      while (items.size < n) {
        const randomIndex = Math.floor(Math.random() * str.length);
        items.add(str[randomIndex]);
      }
      return Array.from(items).join("");
    } else {
      const items = [];
      while (items.length < n) {
        const randomIndex = Math.floor(Math.random() * str.length);
        items.push(str[randomIndex]);
      }
      return Array.from(items).join("");
    }
  }
}

// Example usage of the Password class
const obj = new Password(16);
let password = obj
  .addLowerCaseLetters()
  .addUppercaseLetters()
  .addNumbers()
  .addSpecialCharacters()
  .generate();

// Log the generated password and its length
console.log(password, `length of code is ${password.length}`);
