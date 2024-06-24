let digits = 16;

let UpperAllowed = true;
const LowerAllowed = true;
let NumbersAllowed = true;
let SpecialAllowed = true;

const Totalyes = UpperAllowed + LowerAllowed + NumbersAllowed + SpecialAllowed;

let UpperCase = fisherYatesShuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
let LowerCase = fisherYatesShuffle("abcdefghijklmnopqrstuvwxyz");
let Numbers = fisherYatesShuffle("0123456789");
let Special = fisherYatesShuffle("!@#$%^&*()_+[]{},./\\:;'`~<>?");

let x = Math.floor(digits / Totalyes);
let y = digits / Totalyes;
let buffer = Math.ceil((y.toFixed(2) - x) * Totalyes);

let numU = UpperAllowed * x + buffer;
let numL = LowerAllowed * x;
let numN = NumbersAllowed * x;
let numS = SpecialAllowed * x;

function randomGenerate(n, letters) {
  let password = "";
  for (i = 0; i < n; i++) {
    let random = Math.floor(Math.random() * letters.length);
    password += letters[random];
  }
  return password;
}

function fisherYatesShuffle(str) {
  let arr = str.split("");
  let n = arr.length;
  for (let i = n - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

let code =
  randomGenerate(numU, UpperCase) +
  randomGenerate(numL, LowerCase) +
  randomGenerate(numN, Numbers) +
  randomGenerate(numS, Special);

code = fisherYatesShuffle(fisherYatesShuffle(code));

console.log(code, `length of code is ${code.length}`);
