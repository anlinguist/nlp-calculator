document.getElementById('calculator-input').addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        processQuery()
    }
}, false)

document.getElementById('calculator-input').addEventListener('focusout', async function(event) {
processQuery()
})

function operateOnEntry(userEntry) {
    let indexOfOperand;
    let operation;
    Object.keys(calculatorOperations).forEach(function(functionName) {
      while (userEntry.includes(functionName)) {
        indexOfOperand = userEntry.indexOf(functionName);
        userEntry = calculationSequence(functionName, indexOfOperand, userEntry);
      }
    });
    return userEntry;
  }
  const returnIndexOfEntry = (index, userEntry) => {
    const arg1 = Number(userEntry[index - 1]);
    const arg2 = Number(userEntry[index + 1]);
    return [arg1, arg2];
  };
  const returnSpliced = (index, newTotal, userEntry) => {
    userEntry.splice((index - 1), 3, newTotal);
    return userEntry;
  };
  const calculationSequence = (operation, indexOfOperand, userEntry) => {
    const getArgs = returnIndexOfEntry(indexOfOperand, userEntry);
    const newTotalForEntry = calculatorOperations[operation](getArgs[0], getArgs[1]);
    const newUserEntry = returnSpliced(indexOfOperand, newTotalForEntry, userEntry);
    return newUserEntry;
  }
  const calculatorOperations = {
    '^': (arg1, arg2) => arg1 ** arg2,
    '*': (arg1, arg2) => arg1 * arg2,
    '/': (arg1, arg2) => arg1 / arg2,
    '+': (arg1, arg2) => arg1 + arg2,
    '-': (arg1, arg2) => arg1 - arg2
  };

function processQuery() {
    query = document.getElementById("calculator-input").value
    removeAllChildNodes(document.getElementById("queryresult"))
    if (query == "") {
        return
    }
    else {

        query = query.replace("added to", "+")
        .replace("divided by", "/")
        .replace("times", "*")
        .replace("minus", "-")
        .replace("plus", "+")
        .replace("added to", "+")
        .replace("multiplied by", "*")
        .replace(/([0-9])(\+|\*|\-|\/|x)([0-9])/, "$1 $2 $3")
        .replace(/([^ ])-([^ ])/g, "$1 $2")
        .replace("raised to the power of", "^")
        .replace("raised to", "^")
        .replace(" x ", "*")
        .replace(/[tT]he sum of (.*?) and/, "$1 +")
        .replace(/[tT]he product of (.*?) and/, "$1 *")
        .replace(/[wW]hat (is|does)/, "")
        .replace(/[hH]ow much (does|is)/, "")
        .replace(/equal( to)?/, "")
        .replace("?", "")


        parse = compendium.analyse(query);
        if (parse.length > 1) {
            alert("NLP Calculator can only accept one sentence as input.")
            return
        }
        tokens = parse[0]['tokens']
        next = false
        queryArray = []
        for (token in tokens) {
            if (next > 1) {
                next -= 1
                continue
            }
            if (!next || next === 1) {
                actualNumber = false
                if (tokens[token]['pos'] === "CD") {
                    try {
                        actualNumber = parseInt(tokens[token]['raw'])
                    }
                    catch { }
                    if (actualNumber) {
                        queryArray.push(actualNumber)
                    }
                    else {
                        next = 1
                        wholeNumber = tokens[token]['raw']
                        try {
                            while (tokens[parseInt(token) + next]['pos'] === "CD") {
                                wholeNumber = wholeNumber + " " + tokens[parseInt(token) + next]['raw']
                                next += 1
                            }
                        }
                        catch {

                        }
                        resNum = word2num(wholeNumber)
                        queryArray.push(resNum)
                    }
                }
                else {
                    nonNumber = tokens[token]['raw']
                    queryArray.push(nonNumber)
                }
            }
        }
    } 
    if (typeof(queryArray[0]) !== "number") {
        queryArray.unshift(0)
    }
    resolvedQuery = queryArray.join(" ")
    document.getElementById("queryresult").append(resolvedQuery)
    queryresult = operateOnEntry(queryArray)
    document.getElementById("queryresult").append(" = " + queryresult)
    
}


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const Small = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
    Zero: 0,
    One: 1,
    Two: 2,
    Three: 3,
    Four: 4,
    Five: 5,
    Six: 6,
    Seven: 7,
    Eight: 8,
    Nine: 9,
    Ten: 10,
    Eleven: 11,
    Twelve: 12,
    Thirteen: 13,
    Fourteen: 14,
    Fifteen: 15,
    Sixteen: 16,
    Seventeen: 17,
    Eighteen: 18,
    Nineteen: 19,
    Twenty: 20,
    Thirty: 30,
    Forty: 40,
    Fifty: 50,
    Sixty: 60,
    Seventy: 70,
    Eighty: 80,
    Ninety: 90,
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    ELEVEN: 11,
    TWELVE: 12,
    THIRTEEN: 13,
    FOURTEEN: 14,
    FIFTEEN: 15,
    SIXTEEN: 16,
    SEVENTEEN: 17,
    EIGHTEEN: 18,
    NINETEEN: 19,
    TWENTY: 20,
    THIRTY: 30,
    FORTY: 40,
    FIFTY: 50,
    SIXTY: 60,
    SEVENTY: 70,
    EIGHTY: 80,
    NINETY: 90
}

const Magnitude = {
    thousand: 1000,
    million: 1000000,
    billion: 1000000000,
    trillion: 1000000000000,
    quadrillion: 1000000000000000,
    quintillion: 1000000000000000000,
    sextillion: 1000000000000000000000,
    septillion: 1000000000000000000000000,
    octillion: 1000000000000000000000000000,
    nonillion: 1000000000000000000000000000000,
    decillion: 1000000000000000000000000000000000,
    Thousand: 1000,
    Million: 1000000,
    Billion: 1000000000,
    Trillion: 1000000000000,
    Quadrillion: 1000000000000000,
    Quintillion: 1000000000000000000,
    Sextillion: 1000000000000000000000,
    Septillion: 1000000000000000000000000,
    Octillion: 1000000000000000000000000000,
    Nonillion: 1000000000000000000000000000000,
    Decillion: 1000000000000000000000000000000000,
    THOUSAND: 1000,
    MILLION: 1000000,
    BILLION: 1000000000,
    TRILLION: 1000000000000,
    QUADRILLION: 1000000000000000,
    QUINTILLION: 1000000000000000000,
    SEXTILLION: 1000000000000000000000,
    SEPTILLION: 1000000000000000000000000,
    OCTILLION: 1000000000000000000000000000,
    NONILLION: 1000000000000000000000000000000,
    DECILLION: 1000000000000000000000000000000000
}

function word2num(wordnum) {
    const wordnumArray = wordnum.split(/[\s-]+/)
    let n = 0
    let g = 0

    for (const numPart of wordnumArray) {
        let small = Small[numPart]

        if (small) {
            g += small
        } else if ((numPart === 'hundred' || numPart === 'Hundred' || numPart === 'HUNDRED') && g !== 0) {
            g *= 100
        } else {
            small = Magnitude[numPart]

            if (small) {
                n += g * small
                g = 0
            } else {
                throw new Error(`${numPart} is not a number.`)
            }
        }
    }

    return n + g
}