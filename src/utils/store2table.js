
function getStringList(){
  let tableData = []

  this.$store.state.lab2Result.forEach(function(value,key){
    tableData.push(key)
  });

  console.log(tableData)
  return tableData
}

export {getStringList}
