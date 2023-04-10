const gpt4 = require('./gpt4');

async function TryFnHeal4Ever(fn, args) {
  try {
    return fn(...args);
  } catch (e) {
    let newFn = await GPT4Heal({
      source: fn.toString(),
      errStack: e.stack.toString(),
    });
    fn = new Function(...newFn.args, newFn.body);
    return TryFnHeal4Ever(fn, args);
  }
}

async function GPT4Heal(options) {
  const prompt = `
This is a function source and the error. Fix the function:

## Source:
${options.source}

## Error:
${options.errStack}

## Updated source:
`;
  const source = await gpt4(prompt);
  return {
    args: getArguments(source),
    body: getFunctionBody(source),
  };
}

function getArguments(funcString) {
  const argsStart = funcString.indexOf('(') + 1;
  const argsEnd = funcString.indexOf(')');
  const argsString = funcString.slice(argsStart, argsEnd);
  const argsArray = argsString.split(',').map(arg => arg.trim());
  return argsArray;
}

function getFunctionBody(funcString) {
  const bodyStart = funcString.indexOf('{') + 1;
  const bodyEnd = funcString.lastIndexOf('}');
  const bodyString = funcString.slice(bodyStart, bodyEnd).trim();
  return bodyString;
}

function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        ar[j + 1] = temp;
      }
    }
  }
  return arr;
}

// unsorted array
const arr = [52, 4, 21 ,2, 222];
TryFnHeal4Ever(bubbleSort, [arr]).then(console.log)
