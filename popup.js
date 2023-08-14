document.addEventListener("DOMContentLoaded", function () {
  const convertButton = document.getElementById("convertButton");
  const brailleInput = document.getElementById("brailleInput");
  const resultDiv = document.getElementById("result");

  convertButton.addEventListener("click", function () {
    const input = brailleInput.value.trim();
    const inputLines = input.split("\n"); // Split input into lines
  
    let unicodeBraille = "";
    for (const line of inputLines) {
      const cellPatterns = convertNumericToBraille(line);
      const unicodeLine = cellPatterns.split(" ").map(generate_braille_unicode).join(" ");
      unicodeBraille += unicodeLine + "<br>"; // Use <br> for line breaks
    }
  
    resultDiv.innerHTML = unicodeBraille; // Use innerHTML to interpret <br> elements
  });

  function generate_braille_unicode(braille_pattern) {
    // Braille Unicode starts from U+2800
    const base_codepoint = 0x2800;
  
    const patternArray = braille_pattern.split('');
  
    let braille_unicode = base_codepoint;
    for (let i = 0; i < 6; i++) {
      if (patternArray[i] === '1') {
        braille_unicode += Math.pow(2, i);
      }
    }
  
    return String.fromCodePoint(braille_unicode);
  }

  function convertNumericToBraille(numericPattern) {
    const numericArr = numericPattern.split(" ");
    let braillePattern = "";
  
    for (const pattern of numericArr) {
      const digits = pattern.split("");
      let cellPattern = "";
  
      for (let i = 0; i < 6; i++) {
        cellPattern += (digits.includes((i + 1).toString()) ? "1" : "0");
      }
  
      braillePattern += cellPattern + " ";
    }
  
    return braillePattern.trim(); // Remove trailing space
  }
});
