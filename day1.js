function day1(list){
    const lines = list.split(/\n/);
  let output = [];
  let outputText = [];
  for (let i = 0; i < lines.length; i++) {
    // only push this line if it contains a non whitespace character.
    if (/\S/.test(lines[i])) {
      outputText.push('"' + $.trim(lines[i]) + '"');
      output.push($.trim(lines[i]));
    }
  }
  console.log(output);
}