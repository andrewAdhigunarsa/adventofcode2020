function day4(data){
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

    const rawPassportsData =  processedString(data, /\n\n/)
    const cleanedPassportsStrings = rawPassportsData.map(line=>line.replace(/\n/g, " "))
    const passportData = cleanedPassportsStrings.map(line=>{
        const detailsStrings = line.split(" ");
        let x ={};
        for(let i = 0; i<detailsStrings.length; i++){
           const v = detailsStrings[i].split(":");
            const key = v[0];
            const value = v[1];
            x[key] = value
        }    

        return x;
    })

    function validateByr(v){
        return Number.isInteger(v) && v >= 1920 && v <= 2002;
    }

    function validateIyr(v){
        return Number.isInteger(v) && v >= 2010 && v <= 2020;
    }

    function validateEyr(v){
        return Number.isInteger(v) && v >= 2020 && v <= 2030;
    }

    function validateHgt(v){
        if(v.indexOf('cm')>0){
           const h = parseInt(v.replace('cm',''));     
            return Number.isInteger(h) && h >= 150 && h <= 193;
        }else if(v.indexOf('in')>0){
            const i = parseInt(v.replace('in',''));
             return Number.isInteger(i) && i >= 59 && i <= 76;  
        }
        return false;
    }

    function validateHcl(v){
        const r = new RegExp(/#(?:[0-9a-fA-F]{6})/);
        return r.test(v)
    }
    
    function validateEcl(v){
       return v === 'amb' ||  v === 'blu' ||  v === 'brn' ||  v === 'gry' ||  v === 'grn' ||  v === 'hzl' ||  v === 'oth';     
    }

    
    function checkValidInputs(o){
        if(o.byr && o.iyr && o.eyr && o.hcl && o.hgt && o.ecl && o.pid){
            const byr = parseInt(o.byr);
            const iyr = parseInt(o.iyr);
            const eyr = parseInt(o.eyr);
            const hcl = o.hcl.trim();
            const ecl = o.ecl.trim();
            const pid = o.pid.trim();

            return validateByr(byr) && 
            validateIyr(iyr) && 
            validateEyr(eyr) && 
            validateHgt(o.hgt) && 
            validateHcl(hcl) && 
            validateEcl(ecl) && 
            (pid.length === 9)  
        }else{
            return false;
        }

  
    }

    let numberOfValid =0;

    for(let g =0; g <passportData.length; g++){
        if(checkValidInputs(passportData[g])){
           numberOfValid++;     
        }
    }

    console.log(numberOfValid);

}