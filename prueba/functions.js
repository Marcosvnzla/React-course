const lastThreeChars = (userString) => {
  if (userString.length < 3) {
    alert('Error');
    return;
  }

  const startingIndex = userString.length - 3;

  const lastChars = userString.substr(startingIndex);

  return lastChars;
};

function calculateFactorial (num) {
  let factorial = Math.trunc(num);
  let multiplier = null;

  if (num === 0) {
    return factorial = 1;
  }

  if (Math.sign(num) === -1) {
    alert('Por favor inserte un número positivo!');
    return;
  }

  for (i = 1; i < num; i++) {
    multiplier = num - i;
    factorial = factorial * multiplier;
  };

  return factorial;
}

console.log(calculateFactorial(4));