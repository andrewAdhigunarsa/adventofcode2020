function day9(data){
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
    const processedData = rawData.map(e=>parseInt(e))

    function checkNumber(number, preambleNumbers){
        let used = [];
        let valid = false;

        for(let b =0; b<preambleNumbers.length; b++){
          for(let c =0; c<preambleNumbers.length; c++){
            if((preambleNumbers[b]+preambleNumbers[c])===number){
                valid=true
            }
          }
        }
        return valid;
    }

    function find(total){
        console.log(total);
        for(let b=0; b<processedData.length; b++){
            let x=processedData[b];
            let a=[];

            for(let c=b+1; c<processedData.length;c++){
                if(a.reduce((a, b) => a + b, 0)===total){
                    const min = Math.min(...a);
                    const max = Math.max(...a);
                    const xtotal = min+max;
                    console.log(a);
                    console.log(a.reduce((a, b) => a + b, 0));
                    console.log(total);
                    console.log('min:'+min+',max:'+max+',total:'+xtotal) 
                    return;
                }else if(a.reduce((a, b) => a + b, 0)<total){
                    x += processedData[c];
                    a.push(processedData[c]);
                }else if(a.reduce((a, b) => a + b, 0)>total){
                    x = processedData[b];
                    a = [processedData[b]]
                }
            }

            if(x!==total){
                x=processedData[b];
                a=[processedData[b]];
            }

        }
        return;
    }


    for(let a=0; a<processedData.length;a++){
        if(a>24){
            let min = a-25;
            let max = a;
            let range = processedData.slice(min,max);

            if(checkNumber(processedData[a],range) === false){
                console.log(processedData[a])
                find(processedData[a]);
            }
        }
    }

}