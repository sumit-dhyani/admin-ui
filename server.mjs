import fetch from 'node-fetch';
const getapi=()=>{
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
    .then(response=>response.json())
    .then(data=>console.log(data))
}
getapi();