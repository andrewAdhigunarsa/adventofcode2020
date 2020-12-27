var fs = require('fs');

function day13(data){
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

    let x = rawData[1].split(',');
    let busesData  = x.map((e,index)=>{
        return{
            index,
            id:e
        }
    }); 

    const busesA = busesData.filter(e=>e.id!=='x')
    const buses = busesA.map(e=> {return {
        index:e.index,
        id: parseInt(e.id)
    }})


    const busesIds = busesA.map(e=> parseInt(e.id))

    let busesCopy = buses.map(e=>e);

    let timeStamp = 0;

    let allEqual = false;


    while(allEqual === false){
    

        let numbersThatsIsTrue = [];
        

        for(let i=0; i<busesCopy.length; i++){

            if((busesCopy[i].id-busesCopy[i].index)<timeStamp){
            //   console.log('buscopyId: '+busesCopy[i].id+ ' busesID :'+busesIds[i] )  
              busesCopy[i].id += busesIds[i] 
            }

            if((busesCopy[i].id-busesCopy[i].index)=== timeStamp){
                numbersThatsIsTrue.push(busesCopy[i].id);
            } 
        }

        // console.log(numbersThatsIsTrue);

        if(numbersThatsIsTrue.length === busesCopy.length){
             allEqual = true;
        }else{
             timeStamp++  
        }


    }

    console.log(busesCopy)    
 
}





fs.readFile('./data.js','utf8', function (err, data) {
  if (err) throw err;
  
  console.log(day13(data));
});
