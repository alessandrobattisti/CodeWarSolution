//https://www.codewars.com/kata/58dea43ff98a7e2124000169/train/javascript
function sumStrings(a,b) {
  //remove zeros
  while(a[0] == '0' && a[0].length > 1){
    a = a.substr(1)
  }
  while(b[0] == '0' && b[0].length > 1){
    b = b.substr(1)
  }
  // find the longer string
  let a_l = a.length
  let b_l = b.length
  let first, sec, n1, n2, sum;
  if (a_l > b_l){
    first = a
    sec = b
  }else{
    first = b
    sec = a
  }
  // loop through the loger string
  let string = "";
  let riporto = 0;
  for (var i = 0; i < first.length ; i++){
    n1 = parseInt(first.split("").reverse().join("")[i])
    try{
      n2 = parseInt(sec.split("").reverse().join("")[i])
      }catch(err){
      n2=0;
      }
    if(Number.isInteger(n2)){
      sum = n1+n2+riporto
    }else{
      sum = n1+riporto
    }
    if(sum > 9){
      riporto = 1
      string += sum - 10
    }else{
      string += sum
      riporto = 0
      }
    if(i + 1 == first.length && riporto > 0){
      string += riporto
    }
  }
  return string.split("").reverse().join("");
}

function subtractString(a,b){
    let n_a = a.length
    let n_b = b.length
    let new_a, new_b;
    let less_than_zero = false;
    //add zeros before number to be subtracted
    if(n_a-n_b >= 0){
        b = String(Math.pow(10, n_a-n_b)).substring(1) + b
        new_a = a;
        new_b = b;
    }else{
        a = String(Math.pow(10, n_b-n_a)).substring(1) + a
        new_b = a;
        new_a = b;
        less_than_zero = true;
    }
    let res = '';
    let riporto = 0;
    for( let i = new_a.length-1; i >= 0; i--){
        let sub_res = +new_a[i] - riporto - +new_b[i];
        if(sub_res < 0){
            sub_res = 10 + sub_res
            riporto = 1
        }else{
            riporto = 0;
        }
        res = String(sub_res) + res
    }
    while(res[0] == '0' && res.length > 1){
        res = res.substring(1)
    }

    if(less_than_zero==true){
        return '-'+res
    }
    return res
}

function StringBase(n_a, n_b){
    let base = ''
    for(let i = 0; i < (n_a - n_b); i++){
        base += '0'
    };
    return base
}

function divideByTen(a, b, res) {
    let n_a = a.length
    let n_b = b.length
    let base = Math.pow(10, n_a-n_b)
    let base_str = StringBase(n_a, n_b)
    if(+a - +b*base < 0){
        base /= 10
        base_str = base_str.substr(1)
        if(base <= 1){
            return [res,a]
        }
    }
    a = subtractString(a, b + base_str)
    res = sumStrings(res, "1"+base_str)
    return [res, a]
}
function divideStrings(a,b) {
    if(+b > +a){
        return ['0', a]
    }if(+b == '0'){
        return undefined
    }if(+a == '0'){
        return ['0', '0']
    }
    let res = [0, a];
    while (res[1] > +b*10 ){
        res = divideByTen(res[1], b, res[0])
    }
    a = res[1]
    res = res[0]
    let resto = a
    while(+a >= +b){
        res = sumStrings(res, '1')
        a = subtractString(a,b)
        resto = a
    }
    return [String(res), resto]
}


////////////////////////////////////////////////////////////////////////////////

function test(a, b, c, d){
    let res = divideStrings(a, b)
    console.log(res)
    return res[0] == c && res[1] == d
}
let a = '218325651466676242679413193641986997375295142300957689209117538429391871882915143553700753569300735070434937809229000'
let b = '202656734153273859298902423697324623837170120453153510751761263253378087350092669510931486255362496159430350'
let c = '1077317526'
let d = '1431543779047540028981460804154401293244350107815694158627879676301412965448414841170606474772931577914900'

console.log( test(a,b,c,d) );

a = '173664464761591697109258419042366430111337358903006710361332088054460708015384352133630710438378892173958249516924803799014982848203488993000'
b = '71962886976973876703529099555569925888254884242350311676663892093079029146267825852267145563809408'
c = '2413250385815670486348136892689263036828468'
d = '35522529116234676215855094297472667211780186635137429167563807423637093167434993785013802748366056'

console.log( test(a,b,c,d) );

a = '10';
b = '2';
c = '5';
d = '0';

console.log( test(a,b,c,d) );

a = '20';
b = '3';
c = '6';
d = '2';

console.log( test(a,b,c,d) );

a = '600000';
b = '100';
c = '6000';
d = '0';
console.log( test(a,b,c,d) );

////console.log(subtractString('11111', '1114441'))
