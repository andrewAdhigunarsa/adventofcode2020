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
        const bag = (x[0].trim()).replace(' bags','');
        const content = x[1].split(',');
        const children = content.map(z=>{
            const a = (z.trim()).replace('.','');
            const b = ((a.replace(' bags','')).replace('bag','')).trim();
            let c = (((a.slice(2,z.length)).replace(' bags','')).replace('bag','')).trim();
            let numberInBag;
            if(a.indexOf('no other') !== -1){
                numberInBag = 0;
            }else{
                numberInBag = a.slice(0,2);
            }
            
            return {
                bag:c,
                total:parseInt(numberInBag),
            }
        })
        const n = children.map(e=>e.total)

        const total = n.reduce((a,b)=>a+ b)

        return{
            bag,
            total,
            children
        }
    })

    console.log(processData);

    function findRule(bag, rules){
        for(let x=0; x<rules.length; x++){
            if(bag === rules[x].bag){
                return rules[x]
            }
        }
    }


    function rec(color){

        console.log(color)
        
        let x = findRule(color, processData);
  
        if(color ==='other'){
           return 1;
        }

        let children = x.children;

        console.log(children)

        let n =0;

        if(children){
           for(let a=0; a<children.length; a++){
                n+= children[a].total + (children[a].total * rec(children[a].bag))
            }
        }
        
       console.log(n) 
       return n;

    }

    rec('shiny gold');
    
}