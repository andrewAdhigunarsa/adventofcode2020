var fs = require('fs');

function day11(data){
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
    const processedData = rawData.map(e=>e.split(''))



      function checkHorizontal(n,array){
        let f =0;
        let b =0;
        let fRecord = [];
        let bRecord = [];
        // console.log('frecord:'+fRecord+', bRecord:'+bRecord)

        for(let a=n; a<array.length; a++){ 
            if(array[a] === 'L'){
                if(a!==n){
                    fRecord.push('L')
                }

            }else if(array[a] === '#'){
                if(fRecord[0] !== 'L'){
                    if(a!==n){
                        fRecord.push('#')
                        f=1;
                    }
                }
            }
        }
        for(let a=n; 0<(a+1); a--){ 
             if(array[a] === 'L'){
                 if(a!==n){
                    bRecord.push('L')
                 }
            }else if(array[a] === '#'){
                if(bRecord[0] !== 'L'){
                    if(a!==n){
                        bRecord.push('#')
                        b=1;
                    }
                }
            }
        }
        return f+b;
    }

    function checkVertical(lineIndex, arrayIndex,  fullArray){
        let t=0;
        let b=0;
        let tRecord = [];
        let bRecord = [];

        for(let a=arrayIndex; a<fullArray.length; a++){ 
            if(fullArray[a][lineIndex] === 'L'){
                if(a!== arrayIndex){
                    tRecord.push('L')
                }
            }else if(fullArray[a][lineIndex] === '#'){
                if(tRecord[0] !== 'L'){
                    if(a!== arrayIndex){
                        tRecord.push('#')
                        t=1
                    }

                }
            }
        }
        for(let a=arrayIndex; 0<(a+1); a--){ 
            if(fullArray[a][lineIndex] === 'L'){
                if(a!== arrayIndex){
                    bRecord.push('L');
                }
            }else    
            if(fullArray[a][lineIndex] === '#'){
                if(bRecord[0] !== 'L'){
                    if(a!== arrayIndex){
                        bRecord.push('#');
                        b=1
                    }
                }
            }
        }
        return t+b;
    }

    function checkDiagonalForward(lineIndex, arrayIndex,  fullArray){
        let u=0;
        let d=0;
        let uRecord=[];
        let dRecord=[];

        for(let a=arrayIndex,i=0; a<fullArray.length; a++, i++){ 
            if(fullArray[a][lineIndex-i] === 'L'){
                if(a!== arrayIndex){
                    dRecord.push('L');
                }
            }else
            if(fullArray[a][lineIndex-i] === '#'){
                
                if(dRecord[0] !== 'L'){
                    if(a!== arrayIndex){
                        dRecord.push('#');
                        d=1
                    }   
                }
            }
        }
        for(let a=arrayIndex, i=0; 0<(a+1); a--, i++){ 
            if(fullArray[a][lineIndex+i] === 'L'){
                if(a!== arrayIndex){
                    uRecord.push('L');
                }
            }else
            if(fullArray[a][lineIndex+i] === '#'){
                
                if(uRecord[0] !== 'L'){
                    if(a!== arrayIndex){
                        uRecord.push('#');
                         u=1
                    }
                }
            }
        }
        return u+d;
    }

    function checkDiagonalBackward(lineIndex, arrayIndex,  fullArray){
        let u=0;
        let d=0;
        let uRecord=[];
        let dRecord=[];

        for(let a=arrayIndex,i=0; a<fullArray.length; a++, i++){ 
     
            if(fullArray[a][lineIndex+i] === 'L'){
                if(a!== arrayIndex){
                    dRecord.push('L');
                }
            }else
            if(fullArray[a][lineIndex+i] === '#'){
                if(a!== arrayIndex){
                    if(dRecord[0] !== 'L'){
                            dRecord.push('#');
                            d=1
                    }
                }
            }
        }
        for(let a=arrayIndex, i=0; 0<(a+1); a--, i++){ 
            if(fullArray[a][lineIndex-i] === 'L'){
                if(a!== arrayIndex){
                    uRecord.push('L');
                }
            }else
            if(fullArray[a][lineIndex-i] === '#'){
                if(uRecord[0] !== 'L'){
                    if(a!== arrayIndex){
                        uRecord.push('#');
                        u=1
                    }
                }
            }
        }
        return u+d;
    }
   


    function shouldSwitch(lineIndex, arrayIndex, line, fullArray){

        let adjecent=
        checkHorizontal(lineIndex,line)+
        checkVertical(lineIndex,arrayIndex,fullArray)+
        checkDiagonalForward(lineIndex,arrayIndex,fullArray)+
        checkDiagonalBackward(lineIndex,arrayIndex,fullArray);

        // console.log(adjecent);

        if(line[lineIndex]==='.'){
            return false;
        }else if(line[lineIndex]==='L'){
            return adjecent===0;
        }else if(line[lineIndex]==='#'){
            return adjecent>=5;
        }
    }


    function shouldSwitchNumber(arrayIndex,current,fullArray){

        let switched = [];
        for(let b=0; b<current.length; b++){            

            if(shouldSwitch(b,arrayIndex,current,fullArray)){
                switched.push(b)

            } 
        }

        // console.log('switched number '+switched);

        return switched;

    }

    let processedData1 = [...processedData];

    let memo =[];
    
    
    function convertSeats(array){
        let list = array;
        let switching = [];

        if(memo[list]){
            return array;
        }

        memo[list] = 1;

        for(let d=0; d<list.length; d++){
            switching.push(shouldSwitchNumber(d,list[d],list));
        }

        let occupied =0;

        for(let b=0; b<switching.length; b++){
            let numberToSwitch = switching[b];
            for(let c=0; c< numberToSwitch.length; c++){
                if(list[b][numberToSwitch[c]] === 'L'){
                    list[b][numberToSwitch[c]] = '#';
                }else if(list[b][numberToSwitch[c]] ==='#'){
                    list[b][numberToSwitch[c]] ='L'
                }
            }
        }
        
        for(let a=0; a<list.length; a++){
            for(let d=0; d <list[a].length; d++){
                if(list[a][d] === '#'){
                    occupied++
                }    
            }
        }


        console.log('occupied:'+ occupied);
        
        return  convertSeats(list);

    }

    convertSeats(processedData1);
    


}





fs.readFile('./data.js','utf8', function (err, data) {
  if (err) throw err;
  
  console.log(day11(data));
});
