var fs = require('fs');

function day10(data){
    if(!data){
        return;
    }

    function processedString(value, regex){
        const lines = value.split(regex);
        let listArray = [];
        let outputText = [];
        for (let i = 0; i < lines.length; i++) {
            // only push this line if it contains a non whitespace character.
            if (/\S/.test(lines[i])) {
            outputText.push('"' + lines[i].trim() + '"');
            listArray.push(lines[i].trim());
            }
        }

        return listArray;
    }

    const rawData = processedString(data, /\n/);
    const xdata= rawData.map(e=>parseInt(e));
    let processedData = xdata.sort((a, b) => a - b);

    processedData.sort((a, b) => a - b);
    processedData.push((processedData[processedData.length-1]+3))
    processedData.push(0);
    processedData.sort((a, b) => a - b);

    let processedData1 = processedData.map(a=>a);


    let memo = {}

    const combination = ( start, list )=>{
        
        if(list.length===1){
            return 1
        }

        if(memo[start]){
            return memo[start]
        }

        let result = 0;

        for(let i = 0; i<list.length; i++){
            let current = list[i];
            let diff = current-start;

            // console.log('diff'+diff);
            // console.log(list)
        
            if(diff>0 && diff <4 ){
                result += combination(current, list.slice(i+1)) 
            }
        }
        memo[start]=result;
        return result;
    }

    console.log(combination(0,processedData1))


}

fs.readFile('./data.js','utf8', function (err, data) {
  if (err) throw err;
  
  console.log(day10(data));
});
