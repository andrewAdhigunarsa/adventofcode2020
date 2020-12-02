function day2(list){
    const lines = list.split(/\n/);
    let listArray = [];
    let outputText = [];
    for (let i = 0; i < lines.length; i++) {
        // only push this line if it contains a non whitespace character.
        if (/\S/.test(lines[i])) {
        outputText.push('"' + lines[i].trim() + '"');
        listArray.push(lines[i].trim());
        }
    }
    
    const processedList = listArray.map(
        (item)=>{
           const itemArray = item.split(' ');
           const policy = itemArray[0];
           const keyLetter = itemArray[1];
           const password = itemArray[2];
           return{
            policy,
            keyLetter,
            password
           }   
        }
    )

    console.log(processedList);
}