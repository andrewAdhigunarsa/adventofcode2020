function day8(data){
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

    const processedData = rawData.map((e)=>{
        const a = e.split(' ');
        const b = a[0];
        const c = parseInt(a[1]);
        return{
            type:b,
            arg:c
        }
    })

    console.log(processedData)

    let visitedIndex = []

    function rec(index,accumulator){
        let ac = 0;
        let i;

        if(processedData[index].type === 'nop'){
            i=index+1;
            ac=accumulator;
            if(visitedIndex.indexOf(i) !== -1){
                console.log(ac)
                return;
            }

            visitedIndex.push(i)
        }else if(processedData[index].type === 'acc'){
            i=index+1;
            ac=accumulator+processedData[index].arg;
            if(visitedIndex.indexOf(i) !== -1){
                console.log(ac)
                return;
            }
            visitedIndex.push(i)
        }else if(processedData[index].type === 'jmp'){
            i=index+processedData[index].arg;
            ac=accumulator;
            if(visitedIndex.indexOf(i) !== -1){
                console.log(ac)
                return;
            }
            visitedIndex.push(i)
        }

        console.log(ac)
        return ac + rec(i,ac);  
    }

    rec(0,0)
}