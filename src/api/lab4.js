


function updateStudent(update){

  console.log("调用updateStudent方法")
  this.$axios.post('http://localhost:8080/lab4/updateStudent',update)
    .then((response)=>{console.log(response)})
    .catch((error)=>{console.log(error)})
}


function updateTeacher(update){

  console.log("调用updateCourse方法")
  this.$axios({
    method:'post',
    url:'http://localhost:8080/lab4/updateTeacher',
  }).then((response)=>{console.log(response)}).catch((error)=>{console.log(error)})
}

function updateCourse(update){

  console.log("调用updateCourse方法")
  this.$axios({
    method:'post',
    url:'http://localhost:8080/lab4/updateCourse',
  }).then((response)=>{console.log(response)}).catch((error)=>{console.log(error)})
}


export {updateCourse,updateStudent,updateTeacher}
