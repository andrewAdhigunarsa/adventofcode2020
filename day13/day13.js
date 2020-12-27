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

    let timestamp = rawData[0];
    let x = rawData[1].split(',');
    let buses  = x.filter(e=>e!=='x'); 
    buses = buses.map(e=>parseInt(e))   
    
    console.log(buses)
    function findClosestTime(timestamp,multiplier){
        let i=0;
        let number =[]

        while(i<timestamp){
           i+=multiplier 
           number.push(i)
        }

        return{
            id:multiplier,
            closest:i,
            number
        }
    }

    let busesDetails = []

    for(let a=0; a<buses.length; a++){
       busesDetails.push(findClosestTime(timestamp,buses[a]))
    }

    let sorted = busesDetails.sort(function (a, b) {
    return a.closest - b.closest
    })
    let earliset = sorted[0];

    console.log(earliset)

    console.log(earliset.id*(earliset.closest - timestamp))

}





fs.readFile('./data.js','utf8', function (err, data) {
  if (err) throw err;
  
  console.log(day13(data));
});
