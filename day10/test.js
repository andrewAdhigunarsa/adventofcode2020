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

    let optionalNumbers=[];

    for(let a = 0; a<processedData1.length; a++){
        // if((processedData1[a]+2) === processedData1[a+2]){
        //     optionalNumbers.push(processedData1[a+1])
        // }else if((processedData1[a]+3) === processedData1[a+3]){
        //     optionalNumbers.push(processedData1[a+1])
        // }

        if((processedData1[a+1]-processedData1[a-1])>0 && (processedData1[a+1]-processedData1[a-1])<4){
            if((processedData1[a+2] - processedData1[a]<4)){
                optionalNumbers.push(processedData1[a])
            }
        }
    
    }

    console.log(optionalNumbers);

    
    const combination = (list,memo =[])=>{
        if(memo[list]){
            return memo[list];
        }

        if(list.length === 0){
            return [[]];
        }

        const a = list[0];
        const rest = list.slice(1);
        const combsWithoutFirst = combination(rest,memo);
        const combsWithFirst = [];
        combsWithoutFirst.forEach(comb =>{
            const combWithFirst = [...comb, a];
            if(list.indexOf(combWithFirst) === -1){
                combsWithFirst.push(combWithFirst);
            }    
        })

        let result = [...combsWithFirst, ...combsWithoutFirst];

        memo[list] = result;
        return result;
    }

    console.log(combination(optionalNumbers))


}

fs.readFile('./data2.js','utf8', function (err, data) {
  if (err) throw err;
  
  console.log(day10(data));
});
