var fs = require('fs');

function day12(data){
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
    const processedData = rawData.map(e=>{
        return{act: e.slice(0,1),
        n: parseInt(e.slice(1))}
    })

    let w=0;
    let e=0;
    let s=0;
    let n=0;
    let direction = 90;

    function caculateDirection(previous,next){
        console.log('prev'+previous+ ' next:'+next)
        if((previous+next)>360){
            return (previous+next)-360
        }else if((previous+next)<0){
            return 360+(previous+next)
        }else{
            return previous+next
        }
    }

    function goNorth(step){
        n+=step
        s-=step
    }

    function goSouth(step){
        s+=step
        n-=step 
    }


    function goEast(step){
       e+=step
       w-=step
    }

    function goWest(step){
        w+=step
        e-=step
    }


    for(let a=0; a<processedData.length; a++){
        console.log(`s:${s}, n:${n}, e:${e}, w:${w}, dir:${direction}, act:${processedData[a].act}, n:${processedData[a].n}`);

        switch(processedData[a].act){
            case 'N':
                goNorth(processedData[a].n)
                break;
            case 'E':
                goEast(processedData[a].n)
            case 'S':
                goSouth(processedData[a].n)
                break;
            case 'W':
                goWest(processedData[a].n)
                break;

            case 'L':
                direction= caculateDirection(direction, -processedData[a].n)
                break;

            case 'R':
                direction=  caculateDirection(direction, processedData[a].n)
                break;

            case 'F':
                    if(direction === 360 || direction === 0){
                        goNorth(processedData[a].n)
                    }else if(direction === 90){
                        goEast(processedData[a].n)
                    }else if(direction === 180){
                        goSouth(processedData[a].n)
                    }else if(direction === 270){
                        goWest(processedData[a].n)
                    }
                break;
            default:
                break;
        }
    }

    console.log('w:'+w+', e:'+e+', s:'+s+', n:'+n+', direction:'+direction)
}


fs.readFile('./data1.js','utf8', function (err, data) {
  if (err) throw err;
  
  console.log(day12(data));
});
