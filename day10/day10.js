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
    const xdata= rawData.sort((a, b) => a - b);
    const processedData = xdata.map(e=>parseInt(e));

    console.log(processedData);

    let n1=0;
    let n3=0;

    for(let o=0; o<processedData.length ; o++){
        if(processedData[o]+1 ===processedData[o+1]){
            n1++
        }else if((processedData[o]+3 ===processedData[o+1])){
            n3++    
        }
    }

    console.log(n1);
    console.log(n3);
    console.log((n1+1)*(n3+1))

}