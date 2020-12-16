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

    function checkPrevNext(m,l,mid=false){
        let ar=[];

        if(!mid){
            ar.push(l[m]);
        }

        if(m===0){
            ar.push(l[m+1]);
        }else if(m === (l.length-1)){
            ar.push(l[m-1]);
        }else {
            ar.push(l[m-1]);
            ar.push(l[m+1]);
        }

        return ar;
    }


    function shouldSwitch(n, previousLine, line, nextLine){

        let a=[], b=[], c=[];        
        if(previousLine){
            a= checkPrevNext(n, previousLine);
        }
        if(line && line !== undefined){
            b= checkPrevNext(n,line,true)
        }
        if(nextLine && nextLine !== undefined){
            c= checkPrevNext(n, nextLine)
        }
  
        let adjecent;

        if(a && b && c){
           adjecent= [...a,...b,...c];  
        }

        adjecent = adjecent.filter(e=>e!== undefined);
        // console.log(adjecent);

        if(line[n]==='.'){
            return false;
        }else if(line[n]==='L'){
            return adjecent.indexOf('#') === -1;
        }else if(line[n]==='#'){
            const x =adjecent.filter(e=>e=='#');
            return x.length>=4;
        }


    }


    function shouldSwitchNumber(previous,current,next){

        let switched = [];
        for(let b=0; b<current.length; b++){            

            if(shouldSwitch(b, previous, current, next)){

                switched.push(b)

            } 
        }

        // console.log('switched number '+switched);

        return switched;

    }

    let processedData1 = [...processedData];

    let memo ={};
    
    
    function convertSeats(array){
        let list = array;
        let switching = [];

        if(memo[list]){
            return list;
        }

        memo[list] = 1;

        for(let d=0; d<list.length; d++){
            switching.push(shouldSwitchNumber(list[d-1],list[d],list[d+1]));
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

    convertSeats([...processedData1]);

}





fs.readFile('./data.js','utf8', function (err, data) {
  if (err) throw err;
  
  console.log(day11(data));
});
