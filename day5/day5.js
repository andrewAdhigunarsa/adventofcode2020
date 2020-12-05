function day5(data){
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

    const rawList = processedString(data, /\n/);
    const list = rawList.map(a=>a.split(""))



    const seatIds = list.map(item=>{

        let rows = [];
        let columns = [];

        for(let j=0; j<128; j++){
            rows.push(j);
        }

        for(let h=0; h<8; h++){
            columns.push(h);
        }
    
       for(let i=0; i<7; i++){
            const half = Math.ceil(rows.length / 2); 
           if(item[i]==='F'){
                rows = rows.splice(0, half)
           }
           rows = rows.splice(-half);
       }
     
       for(let x=7;x<10; x++){
             const half = Math.ceil(columns.length / 2); 
           if(item[x]==='L'){
                columns = columns.splice(0, half)
           }
              columns = columns.splice(-half);
       } 
       
       return ((rows[0])*8)+(columns[0]);

    })

    const largetsId = Math.max.apply(null,seatIds);

    console.log(largetsId);

}