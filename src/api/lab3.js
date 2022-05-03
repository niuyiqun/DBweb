function getStudent() {
  console.log("调用getStudent方法")
  return this.$axios({
    method: 'post',
    url: 'http://localhost:8080/lab3/getStudent',
  }).then((response) => {
    console.log(response);
    this.$store.commit("changeLab3Student", response.data.data.list);
    console.log("vuex内student");
    console.log(this.$store.state.lab3Student)
  }).catch((error) => {
    console.log(error)
  })
}


function getTeacher() {
  console.log("调用getTeacher方法")
  return this.$axios({
    method: 'post',
    url: 'http://localhost:8080/lab3/getTeacher',
  }).then((response) => {
    console.log(response);
    this.$store.commit("changeLab3Teacher", response.data.data.list);
    console.log("vuex内teacher");
    console.log(this.$store.state.lab3Teacher)
  }).catch((error) => {
    console.log(error)
  })
}

function getCourse() {
  console.log("调用getCourse方法")
  return this.$axios({
    method: 'post',
    url: 'http://localhost:8080/lab3/getCourse',
  }).then((response) => {
    console.log(response);
    this.$store.commit("changeLab3Course", response.data.data.list)
  }).catch((error) => {
    console.log(error)
  })
}


export {getStudent, getCourse, getTeacher}
