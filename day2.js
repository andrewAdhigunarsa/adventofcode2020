function day2(list){
    if(!list){
        return;
    }

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
           const policy = itemArray[0].split('-');
           const minOccurrence = policy[0];
           const maxOccurrence = policy[1];
           const keyLetter = itemArray[1];
           const password = itemArray[2];
           return{
            minOccurrence,
            maxOccurrence,
            keyLetter,
            password
           }   
        }
    )

    const validPasswords = processedList.filter(
        (item)=>{
            // const password = item.password;
            const keyLetter = item.keyLetter.split(':');
            // const keyLetterReg = `/${keyLetter[0]}/`;
            // const keyLettersInPassword = password.match(keyLetterReg);
            // const numberOfOccurence = keyLettersInPassword.length;
            const letterArray = item.password.split('');
            const numberOfOccurence = letterArray.filter(e=>e===keyLetter[0]).length;
            return (numberOfOccurence <= item.maxOccurrence) && (numberOfOccurence >= item.minOccurrence);
        }
    )
    console.log(processedList.length);    
    console.log(validPasswords.length);
}