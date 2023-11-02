function pigIt(str) {
  //Code here
  const array = str.split(' ');
  const regex = /^[A-Za-z]+$/;

  const strArray = array.map((str) => {
    const strSlice = str.slice(1);

    if (!regex.test(str)) {
      return str;
    }

    return `${strSlice}${str[0]}ay`;
  });

  return strArray.join(" ");
}

console.log(pigIt('Pig latin is cool'))
console.log(pigIt('Hello world !'))
console.log(pigIt('This is my string'))