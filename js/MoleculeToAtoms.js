//https://www.codewars.com/kata/52f831fa9d332c6591000511/train/javascript
function parseMolecule(formula) {
  let par = ['(', '{', '[',]
  let cl_par = [ ']', '}', ')']
  let groups = [{val:1, child_of:'[]'}]
  let open_par = [0];
  let active_group_id = 0
  let groups_serial = 0;
  //subdivide in groups, each group keeps track of the value of parent groups and value to be multiplicated by
  //groups will look like this:
  //groups = [  { val: 1, child_of: '[]', K: 4 },
  //            { child_of: '[0]', O: '1', N: '1', val: 2 },
  //            { child_of: '[0,1]', S: '1', O: 3, val: 2 }
  //         ]
  for(let i = 0; i < formula.length; i++){
      if(parseInt(formula[i])){
      }else if(par.indexOf(formula[i]) > -1){
          groups_serial += 1
          groups[groups_serial] = {child_of: JSON.stringify(open_par)}
          open_par.push(groups_serial)
          active_group_id = groups_serial
      }else if(cl_par.indexOf(formula[i]) > -1){
          //find integers
           let n = 1;
           let value = '';
           while(parseInt(formula[i+n])){
               value += formula[i+n];
               n += 1
           }
           active_group_id = open_par.pop();
           groups[active_group_id]['val'] = parseInt(value) ? parseInt(value) : '1';
           active_group_id = open_par[open_par.length-1]
      }else{
          let element = formula[i];
          if(i + 2 < formula.length){//find elements with two letters ther first Uppercase second lowercase
              if(formula[i+1] === formula[i+1].toLowerCase()
                && formula[i+1] !== formula[i+1].toUpperCase()){
                    element = formula[i] + formula[i+1];
                    i += 1;
                }else{
                    element = formula[i];
                }
          }
          //find integers
          let n = 1;
          let value = '';
          while(parseInt(formula[i+n])){
              value += formula[i+n];
              n += 1
          }
          groups[active_group_id][element] = parseInt(value) ? parseInt(value) : '1';
      }
  }
  // create solution multiplying elements count by group value and parent groups values
  let solution = {}
  for(let i = 0; i < groups.length; i++){
     let group = groups[i]
     for(var key in group){
         if(key != 'val' && key != 'child_of'){
             let value = group[key] * group.val;
             let child_of = JSON.parse(group.child_of)
             if(group.child_of.length>1){//if it has a parent multiply for parent value (excluding group 0)
                 for(let g = 1; g < child_of.length; g++){
                     value *= groups[child_of[g]].val
                 }
             }
             if(key in solution){
                 solution[key] += value
             }else{
                 solution[key] = value
             }
         }
     }
  }
  return solution
}
////////////////////////////////////////////////////////////////////////////////
                                   // TEST //
////////////////////////////////////////////////////////////////////////////////
function test(res, exp){
    if (JSON.stringify(res) == JSON.stringify(exp)){
        return true
    }else{
        console.log(JSON.stringify(res), JSON.stringify(exp))
        return false
    }
}

var water = 'H2O';
var magnesiumHydroxide = 'Mg(OH)2';
var fremySalt = 'K4[ON(SO3)2]2';
var weird_molecule = 'As2{Be4C5[BCo3(CO2)3]2}4Cu5';
var glucose = 'C6H12O6';
var dimer = '(C5H5)Fe(CO)2CH3';
var sulphate = '{[Co(NH3)4(OH)2]3Co}(SO4)3'

console.log( test(
        parseMolecule(sulphate),
        {Co: 4, N: 12, H: 42, O: 18, S: 3}
    )
)

console.log( test(
        parseMolecule(dimer),
        {Fe: 1, C: 8, H: 8, O: 2}
    )
)

console.log( test(
        parseMolecule(fremySalt),
        {K: 4, O: 14, N: 2, S: 4}
    )
)
console.log( test(
        parseMolecule(glucose),
        {C: 6, H: 12, O: 6}
    )
)
console.log( test(
        parseMolecule(weird_molecule),
        {As: 2, Cu:5, Be: 16, C: 44, B: 8, Co:24, O:48}
    )
)

console.log( test(
        parseMolecule(magnesiumHydroxide),
        {Mg: 1, O: 2, H: 2}
    )
)
console.log( test(
        parseMolecule(water),
        {H: 2, O: 1}
    )
)
