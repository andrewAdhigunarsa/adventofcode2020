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
        const a = e.replace(/\n/g, "");
        const b = processedString(a, /\n/);
        const x = b[0].split("");
        return x;
    })


    const uniqueData = processedData.map(e=>{
        let o = [];
        for(let c=0; c<e.length; c++){
            if(o.indexOf(e[c]) === -1){
                o.push(e[c]);
            }
        }
        return o
    })

    const totalsData = uniqueData.map(e=>e.length);

    const totalLength = totalsData.reduce((a, b) => a + b, 0);

    console.log(totalLength);
}