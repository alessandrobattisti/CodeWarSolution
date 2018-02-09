//https://www.codewars.com/kata/decode-the-morse-code/train/javascript
let MORSE_CODE = {
    '....': 'H',
    '.': 'E',
    '-.--': 'Y',
    '.---': 'J',
    '..-': 'U',
    '-..': 'D',
    '.': 'E',
    '...': "S",
    '---': 'O',
    '...': 'S',
    '.-': 'X'
}

function decodeMorse(morseCode){
  console.log(morseCode)
  //your code here
  morseCode = morseCode.replace(/^\s+|\s+$/g, '')
  let first_i = 0;
  let last_i = 0;
  let empty_count = 0;
  let message = '';
  for(let i = 0; i < morseCode.length; i++){
      if(morseCode.length == i+1){
          if(first_i+1 == i && first_i != 0){
              message += MORSE_CODE[morseCode.substring(first_i+1, i+1)]
          }else if(first_i+1 == i && first_i == 0){
              message += MORSE_CODE[morseCode.substring(first_i, i+1)]
          }else{
              console.log('ee',first_i, i, )
              message += MORSE_CODE[morseCode.substring(first_i, i+1)]
          }
      }else if (morseCode[i]==' ' && empty_count == 0){
        message += MORSE_CODE[morseCode.substring(first_i, i)]
        first_i = i;
        empty_count += 1;
    }else if(morseCode[i]!=' ' && empty_count > 0){
        empty_count = 0;
        first_i = i;
    }else if(morseCode[i]==' ' && empty_count > 0){
        if(message[message.length-1]!=' '){
            message += ' '
        }
        first_i = i;
        continue
    }
  }
  return message;
}

console.log(
    decodeMorse('.... . -.--   .--- ..- -.. .')
)
console.log(
    decodeMorse('...   ---   ...')
)
console.log(
    decodeMorse('. .')
)
console.log(
    decodeMorse('.-')
)
console.log(
    decodeMorse('.')
)
console.log(
    decodeMorse('.   .')
)
console.log(
    decodeMorse('   .   . ')
)
