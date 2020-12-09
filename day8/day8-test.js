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
    
    function checkStatus(swappedIndex,accumulator){
        let visited={};
        let i = swappedIndex;

        while(i < processedData.length){

            let {type,arg}=processedData[i];

            if(i === swappedIndex){
                if(type === 'nop'){
                    type = 'jmp';
                }else if(type === 'jmp'){
                    type= 'nop';
                }
            }

            if(visited[i]){
                return {
                    canTerminate:false
                }
            }

            visited[i] = true;

            if(type === 'jmp'){
                i+= arg;  
            }else if(type === 'acc'){
                accumulator+=arg;
                i++  
            }else if(type === 'nop'){
                i++    
            } 

        }
        console.log({ canTerminate: true, accumulator});
        return { canTerminate: true, accumulator}

    }


    let fAccumulator = 0;
    let index = 0;


    while(index<processedData.length){

        let {type,arg}=processedData[index];

        if(type === 'jmp' || type === 'nop'){
            const {canTerminate, accumulator} = checkStatus(index,fAccumulator);
            if(canTerminate){
                console.log(processedData);
                console.log(accumulator);
                return;
            }
        }

        if(type === 'jmp'){
            index+=arg;  
        }else if(type === 'acc'){
            fAccumulator+=arg;
            index++  
        }else if(type === 'nop'){
            index++    
        } 
    }
    return;

}