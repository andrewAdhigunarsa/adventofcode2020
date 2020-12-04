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

    
    function searchForTrees(right,down){
        const processedData =listArray.map(item=>item.split(''));
        const rowLength = processedData[0].length;
        const totalRowWithTobogan = processedData.length/down;
        const totalTobogan = totalRowWithTobogan-down;
        const toboganLength = ((totalTobogan)*right)+1;
        const totalRowLength = Math.ceil(toboganLength/rowLength)
        const fullRowArrays = processedData.map(row=>{
            let fullRow =[];
            for(let i =0; i<totalRowLength; i++){
                fullRow = [...fullRow, ...row]
            }
            return fullRow
        })

        const rowWithTobogan = fullRowArrays.filter((row, index)=>{
            return index%down === 0
        })

        let treeEncounteredArray =  rowWithTobogan.map((row, index)=>{
            const toboganPosition = (index*right);
            return row[toboganPosition] === '#'   
        })

        const boolTreeEncounteredArray = treeEncounteredArray.filter((value)=>{
            return value === true;
        })

        return boolTreeEncounteredArray.length
    
    }

    console.log(searchForTrees(1,1));
    console.log(searchForTrees(3,1));
    console.log(searchForTrees(5,1));
    console.log(searchForTrees(7,1));
    console.log(searchForTrees(1,2));
    console.log(searchForTrees(1,1)*searchForTrees(3,1)*searchForTrees(5,1)*searchForTrees(7,1)*searchForTrees(1,2));
    
}
