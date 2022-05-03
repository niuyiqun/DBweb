function getCourseSelection() {

  console.log("调用updateCourse方法")
  this.$axios({
    method: 'post',
    url: 'http://localhost:8080/lab5/getInfo',
  }).then((response) => {
    console.log(response);
    this.$store.commit("changeLab5CourseSelection", response.data.data.list);
    console.log("vuex内teacher");
    console.log(this.$store.state.lab5CourseSelection)
  }).catch((error) => {
    console.log(error)
  })
}

export {getCourseSelection}
