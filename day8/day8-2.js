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

     let processedData2 = rawData.map((e)=>{
        const a = e.split(' ');
        const b = a[0];
        const c = parseInt(a[1]);
        return{
            type:b,
            arg:c
        }
    })

     let processedData3 = rawData.map((e)=>{
        const a = e.split(' ');
        const b = a[0];
        const c = parseInt(a[1]);
        return{
            type:b,
            arg:c
        }
    })

    console.log(processedData)
    console.log(processedData2)

    let noptojmp = 0;
    let noptojmp2 = 0;
    let i1=0;
    let i2=0;
    let jmptonop = 0;
    let jmptonop2 = 0;
    let e1=0;
    let e2=0;

    function rec(index,accumulator,numberOfinstruction){
        let ac = 0;
        let i;
        let n=0;

        if(processedData2[index].type === 'nop'){
            i=index+1;
            ac=accumulator;
            n=numberOfinstruction+1;
        }else if(processedData2[index].type === 'acc'){
            i=index+1;
            ac=accumulator+processedData2[index].arg;
            n=numberOfinstruction+1;
        }else if(processedData2[index].type === 'jmp'){
            i=index+processedData2[index].arg;
            ac=accumulator;
            n=numberOfinstruction+1;
        }

        if(n>=800){
            noptojmp = ac;
            i1=n;
            return;
        }

        noptojmp2 = ac;
        i2=n;
        xIndex= i;

        return ac + rec(i,ac,n);  
    };

    function rec2(x,accumulator,numberOfinstruction){
        let ac = 0;
        let i;
        let n=0;

        if(processedData3[x].type === 'jmp'){
            i=x+processedData3[x].arg;
            ac=accumulator;
            n=numberOfinstruction+1;
        }else if(processedData3[x].type === 'acc'){
            i=x+1;
            ac=accumulator+processedData3[x].arg;
            n=numberOfinstruction+1;
        }else if(processedData3[x].type === 'nop'){
            i=x+1;
            ac=accumulator;
            n=numberOfinstruction+1;
        } 
        if(n>=800){
            jmptonop = ac;
            e1=n;
            return;
        }

        jmptonop2 = ac;
        e2=n;

        return ac + rec2(i,ac,n);  
    };
    
    for(let b =0; b<processedData2.length; b++){
        if(processedData2[b].type === 'nop'){
            processedData2[b].type = 'jmp';
            rec(0,0,0);
            processedData2[b].type = 'nop';
        }
    };

    for(let b =0; b<processedData3.length; b++){    
        if(processedData3[b].type === 'jmp'){
            console.log(processedData3[b]);
            processedData3[b].type = 'nop';
            rec2(0,0,0);
            processedData3[b].type = 'jmp';
        }
    };

    console.log('nopToJmp:'+ noptojmp)
    console.log('nopToJmp2:'+  noptojmp2 )
    console.log('i1:'+ i1)
    console.log('i2:'+ i2)
    console.log('jmpToNop:'+ jmptonop )
    console.log('jmpToNop2:'+ jmptonop2)
    console.log('e1:'+ e1)
    console.log('e12:'+  e2)
}