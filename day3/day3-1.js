function day3(data){
    if(!data){
        return;
    }

    const lines = data.split(/\n/);
    let listArray = [];
    let outputText = [];
    for (let i = 0; i < lines.length; i++) {
        // only push this line if it contains a non whitespace character.
        if (/\S/.test(lines[i])) {
        outputText.push('"' + lines[i].trim() + '"');
        listArray.push(lines[i].trim());
        }
    }

    const processedData =listArray.map(item=>item.split(''));

    const rowLenght = processedData[0].length;
    const totalRow = processedData.length;
    const totalTobogan = totalRow-1;
    const toboganLenght = ((totalTobogan)*3)+1;
    const totalRowLenght = Math.ceil(toboganLenght/rowLenght)
    
    const fullRowArrays = processedData.map(row=>{
        let fullRow =[];
        for(let i =0; i<totalRowLenght; i++){
            fullRow = [...fullRow, ...row]
        }
        return fullRow
    })

    let treeEncounteredArray =  fullRowArrays.map((row, index)=>{
        const toboganPosition = (index*3);
        return row[toboganPosition] === '#'   
    })

    console.log(treeEncounteredArray);

     treeEncounteredArray.shift()

    const boolTreeEncounteredArray = treeEncounteredArray.filter((value)=>{
        return value === true;
    })

    console.log(boolTreeEncounteredArray.length);
}