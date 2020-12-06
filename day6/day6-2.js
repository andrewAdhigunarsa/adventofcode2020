function day6(data){
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

    const rawData = processedString(data, /\n\n/)
    const processedData = rawData.map(e=>{
        const h = processedString(e, /\n/);
        const numberOfPeople = h.length;
        const a = e.replace(/\n/g, "");
        const b = processedString(a, /\n/);
        const x = b[0].split("");
        return {
            numberOfPeople,
            data:x
        }
    })

    const uniqueData = processedData.map(e=>{
        let o = [];
        let multi =[];
        for(let c=0; c<e.data.length; c++){
            if(o.indexOf(e.data[c]) === -1){
                o.push(e.data[c]);
            }else{
                multi.push(e.data[c]);
            }
        }

        const n = o.map(s=> {
            let value = 1;
            for(let k=0; k<multi.length; k++){
                if(s === multi[k]){
                  value+=1      
                }
            }
            return {
            numberOfPeople:e.numberOfPeople,    
            key:s,
            value:value}
        })

        const m = n.filter(g=>g.numberOfPeople === g.value);


        return m
    })


    const totalsData = uniqueData.map(e=>e.length);

    const totalLength = totalsData.reduce((a, b) => a + b, 0);

    console.log(totalLength);
}