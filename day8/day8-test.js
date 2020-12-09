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

    let processedData = rawData.map((e)=>{
        const a = e.split(' ');
        const b = a[0];
        const c = parseInt(a[1]);
        return{
            type:b,
            arg:c
        }
    })
    
    const t = rawData.map((e)=>{
        const a = e.split(' ');
        const b = a[0];
        const c = parseInt(a[1]);
        return{
            type:b,
            arg:c
        }
    })


    console.log(processedData);

    function checkStatus(swappedIndex,accumulator){
        let visited={};
        let i = swappedIndex;

        while(i < processedData.length){

            if(i === swappedIndex){
                if(processedData[i].type === 'nop'){
                    processedData[i].type = 'jmp';
                }else if(processedData[i].type === 'jmp'){
                    processedData[i].type = 'nop';
                }
            }

            if(visited[i]){
                return {
                    canTerminate:false
                }
            }

            visited[i] = true;

            if(processedData[i].type === 'jmp'){
                i+= processedData[i].arg;  
            }else if(processedData[i].type === 'acc'){
                accumulator+=processedData[i].arg;
                i++  
            }else if(processedData[i].type === 'nop'){
                i++    
            } 

        }
        console.log({ canTerminate: true, accumulator});
        return { canTerminate: true, accumulator}

    }


    let fAccumulator = 0;
    let index = 0;


    while(index<processedData.length){
    

        if(processedData[index].type === 'jmp' || processedData[index].type === 'nop'){
            const {canTerminate, accumulator} = checkStatus(index,fAccumulator);
            if(canTerminate){
                console.log(processedData);
                console.log(accumulator);
                return;
            }
        }

        if(processedData[index].type === 'jmp'){
            index+=processedData[index].arg;  
        }else if(processedData[index].type === 'acc'){
            fAccumulator+=processedData[index].arg;
            index++  
        }else if(processedData[index].type === 'nop'){
            index++    
        } 
    }
    return;

}