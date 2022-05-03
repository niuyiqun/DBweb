import axios from "axios";

const baseUrl = 'http://loccalhost:8080'

function getFirst() {
  console.log("调用getFirst方法")
  // this.$axios()
  this.$axios({
    method: 'post',
    url: 'http://localhost:8080/lab2/first',
  }).then((response) => {
    console.log(response);
    this.$store.commit("changeLab2Result", response.data.data.list);
    console.log(this.$store.state.lab2Result)
  }).catch((error) => {
    console.log(error)
  })

}

function getSecond() {
  console.log("调用getSecond方法")
  return this.$axios({
    method: 'post',
    url: 'http://localhost:8080/lab2/second',
  }).then((response) => {
    console.log(response);
    this.$store.commit("changeLab2Result", response.data.data.list)
  }).catch((error) => {
    console.log(error)
  })
  // console.log("调用getFirst方法")
}

function getThird() {
  console.log("调用getThird方法")
  return this.$axios({
    method: 'post',
    url: 'http://localhost:8080/lab2/third',
  }).then((response) => {
    console.log(response);
    this.$store.commit("changeLab2Result", response.data.data.list)
  }).catch((error) => {
    console.log(error)
  })
}

function getForth() {
  console.log("调用getForth方法")
  return this.$axios({
    method: 'post',
    url: 'http://localhost:8080/lab2/forth',
  }).then((response) => {
    console.log(response);
    this.$store.commit("changeLab2Result", response.data.data.list)
  }).catch((error) => {
    console.log(error)
  })
}

function getFifth() {
  console.log("调用getFifth方法")
  return this.$axios({
    method: 'post',
    url: 'http://localhost:8080/lab2/fifth',
  }).then((response) => {
    console.log(response);
    this.$store.commit("changeLab2Result", response.data.data.list)
  }).catch((error) => {
    console.log(error)
  })
}


function getSixth() {
  console.log("调用getSixth方法")
  return this.$axios({
    method: 'post',
    url: 'http://localhost:8080/lab2/sixth',
  }).then((response) => {
    console.log(response);
    this.$store.commit("changeLab2Result", response.data.data.list)
  }).catch((error) => {
    console.log(error)
  })
}

function getSeventh() {
  console.log("调用getSeventh方法")
  return this.$axios({
    method: 'post',
    url: 'http://localhost:8080/lab2/seventh',
  }).then((response) => {
    console.log(response);
    this.$store.commit("changeLab2Result", response.data.data.list)
  }).catch((error) => {
    console.log(error)
  })
}

function getNinth() {
  console.log("调用getEighth方法")
  return this.$axios({
    method: 'post',
    url: 'http://localhost:8080/lab2/ninth',
  }).then((response) => {
    console.log(response);
    this.$store.commit("changeLab2Result", response.data.data.list)
  }).catch((error) => {
    console.log(error)
  })
}


export {getFirst, getSecond, getThird, getForth, getNinth, getFifth, getSeventh, getSixth}



