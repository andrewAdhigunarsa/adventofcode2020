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
        num: parseInt(e.slice(1))}
    })

    let waypoint={
        nth:1,
        sth:-1,
        eas:10,
        wes:-10
    }

    let shipLocation ={
        nth:0,
        sth:0,
        eas:0,
        wes:0
    }

    function rotateLeft(direction, west, east, north ,south){
        if(direction === 0 || direction ===360){
            return {
                nth:north,
                eas:east,
                sth:south,
                wes:west
            }
        }else if(direction === 90){
            return {
                nth:east,
                eas:south,
                sth:west,
                wes:north
            }
        }else if(direction === 180){    
            return {
                nth:south,
                eas:west,
                sth:north,
                wes:east
            }
        }else if(direction === 270){    
            return {
                nth:west,
                eas:north,
                sth:east,
                wes:south
            }
        }
    }


    function rotateRight(direction, west, east, north ,south){
        if(direction === 0 || direction ===360){
            return {
                nth:north,
                eas:east,
                sth:south,
                wes:west
            }
        }else if(direction === 90){
            return {
                nth:west,
                eas:north,
                sth:east,
                wes:south
            }
        }else if(direction === 180){    
            return {
                nth:south,
                eas:west,
                sth:north,
                wes:east
            }
        }else if(direction === 270){   
            return {
                nth:east,
                eas:south,
                sth:west,
                wes:north
            }
        }
    }

    function moveForward(number){
        if(waypoint.nth>0){
            shipLocation.nth +=(waypoint.nth*number)
            if(waypoint.sth>0){
              shipLocation.sth = shipLocation.sth - (waypoint.sth*number)   
            }else{
              shipLocation.sth = shipLocation.sth + (waypoint.sth*number)       
            } 
            
        }
        if(waypoint.sth>0){
            shipLocation.sth += (waypoint.sth*number) 
            if(waypoint.nth>0){
              shipLocation.nth = shipLocation.nth - (waypoint.nth*number)   
            }else{
              shipLocation.nth = shipLocation.nth + (waypoint.nth*number)       
            }
        }
        if(waypoint.eas>0){
            shipLocation.eas += (waypoint.eas*number) 
            if(waypoint.wes>0){
              shipLocation.wes = shipLocation.wes - (waypoint.wes*number)   
            }else{
              shipLocation.wes = shipLocation.wes + (waypoint.wes*number)       
            }
        }
        if(waypoint.wes>0){
            shipLocation.wes += (waypoint.wes*number) 
            if(waypoint.eas>0){
              shipLocation.eas = shipLocation.eas - (waypoint.eas*number)   
            }else{
              shipLocation.eas = shipLocation.eas + (waypoint.eas*number)       
            }
        }


    }


    for(let a=0; a<processedData.length; a++){
        
        switch(processedData[a].act){
            case 'N':
                waypoint.nth += processedData[a].num
                waypoint.sth -= processedData[a].num  
                break;
            case 'E':
                waypoint.eas += processedData[a].num
                waypoint.wes -= processedData[a].num  
                break;
            case 'S':
                waypoint.sth += processedData[a].num
                waypoint.nth -= processedData[a].num  
                break;
            case 'W':
                waypoint.wes += processedData[a].num
                waypoint.eas -= processedData[a].num  
                break;

            case 'L':
                console.log(`Turn left From waypoinst s:${waypoint.sth}, n:${waypoint.nth}, e:${waypoint.eas}, w:${waypoint.wes}`)
                waypoint = rotateLeft(
                    processedData[a].num,
                    waypoint.wes,
                    waypoint.eas,
                    waypoint.nth,
                    waypoint.sth)
                console.log(`To waypoinst s:${waypoint.sth}, n:${waypoint.nth}, e:${waypoint.eas}, w:${waypoint.wes}`)         
                break;
                   
            case 'R':
                console.log(`Turn right From waypoinst s:${waypoint.sth}, n:${waypoint.nth}, e:${waypoint.eas}, w:${waypoint.wes}`)
                waypoint = rotateRight(
                    processedData[a].num,
                    waypoint.wes,
                    waypoint.eas,
                    waypoint.nth,
                    waypoint.sth)

                console.log(`To waypoinst s:${waypoint.sth}, n:${waypoint.nth}, e:${waypoint.eas}, w:${waypoint.wes}`)    
                break;

            case 'F':
                   moveForward(processedData[a].num)
                break;
            default:
                break;
        }

        console.log(
        `waypoinst s:${waypoint.sth}, n:${waypoint.nth}, e:${waypoint.eas}, w:${waypoint.wes},  
        shiplocation s:${shipLocation.sth}, n:${shipLocation.nth}, e:${shipLocation.eas}, w:${shipLocation.wes},
        act:${processedData[a].act}, step:${processedData[a].num}`);
    }

         console.log(
        `waypoinst s:${waypoint.sth}, n:${waypoint.nth}, e:${waypoint.eas}, w:${waypoint.wes},  
        shiplocation s:${shipLocation.sth}, n:${shipLocation.nth}, e:${shipLocation.eas}, w:${shipLocation.wes}`);

        console.log(shipLocation.nth+shipLocation.wes)
}


fs.readFile('./data.js','utf8', function (err, data) {
  if (err) throw err;
  
  console.log(day12(data));
});
