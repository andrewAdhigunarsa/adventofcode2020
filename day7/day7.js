function day7(data){
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
    const processData = rawData.map((e)=>{
        const x = e.split('contain');
        const container = (x[0].trim()).replace(' bags','');
        const content = x[1].split(',');
        const typeOfBags = content.map(z=>{
            const a = (z.trim()).replace('.','');
            const b = (((a.slice(2,z.length)).replace(' bags','')).replace('bag','')).trim();
            return b;
        })
        return{
            container,
            content,
            typeOfBags
        }
    })

    let totalBagsCanDirectlyContainShinyGold =0;
    let withShinyGoldBags = [];
    let withShinyGoldBagsObject = [];
    let noShinyGoldBags =[];


    for(let x =0; x<processData.length; x++){
        if(processData[x].typeOfBags.indexOf('shiny gold') !== -1){
            totalBagsCanDirectlyContainShinyGold += 1;
            withShinyGoldBags.push(processData[x].container);
            withShinyGoldBagsObject.push(processData[x]);
        }else{
           noShinyGoldBags.push(processData[x])     
        }
    }

     function recursiveFunc(allWith, allWithout){

        const filtered = allWithout.filter(e=>{
            let n = 0;

            for(let h=0; h<e.typeOfBags.length; h++){
                for(let x =0; x<allWith.length;x++){
                    if(e.typeOfBags.indexOf(allWith[x].container)!==-1){
                        n += 1
                    }
                }
            }

            return n !== 0
        })

        const merged = filtered.concat(allWith);

        const filteredOut = allWithout.filter(e=>{
            let n = 0;

            for(let h=0; h<e.typeOfBags.length; h++){
                for(let x =0; x<allWith.length;x++){
                    if(e.typeOfBags.indexOf(allWith[x].container)!==-1){
                        n += 1
                    }
                }
            }

            return n === 0
        })

        console.log(merged);

        if (merged.length <= processData.length){
             recursiveFunc(merged,filteredOut);   
        }

    }

    recursiveFunc(withShinyGoldBagsObject,noShinyGoldBags);


    
}