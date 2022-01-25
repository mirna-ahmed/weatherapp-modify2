/* Global Variables */
 const ApiKey = '71f108e555a1e8ab325fee4bebeade4b';
const  Url = `https://api.openweathermap.org/data/2.5/weather?zip= &appid=${ApiKey}&units=metric`;


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();




const BttnGenerate = document.getElementById('generate');

// click event to enter zip code , if the user doesn't enter a zipcode , a error message is shown
BttnGenerate.addEventListener('click', testcode);


function testcode(evt) {
  const ZipCode = document.getElementById('zip');
  const ZipValue = ZipCode.value;//get the value of the zipcode
  const FeelingsValue = document.getElementById('feelings').value;

  if(ZipValue){
    getData(Url, ZipValue, ApiKey).then( function (data){
      //console.log(data);
      postData('/addData', {temp: data.main.temp, date: newDate,content: FeelingsValue});
    }).then(updateUI())

  }
  else {
    alert('please enter zip code');
  }

}




// get data function that has 3 parameters url, zip, key
  const getData = async ( Url, zip, key)=>{

   const res = await fetch(Url+zip+key);
    try {

      const data = await res.json();
      //console.log(data);
      return data;

    }  catch(error) {
      // appropriately handle the error
      console.log("error", error);
    }
  }
// postData function
  const postData = async ( url = '', data = {})=>{
    console.log(data);
      const res = await fetch(Url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    try {
        const NewData = await res.json();
        console.log(NewData);
        return NewData;
      }catch(error) {
      console.log("error", error);
      }
}
// UI update function

const updateUI = async() => {
  const request = await fetch('/getData');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData[0].date;
    document.getElementById('temp').innerHTML = allData[0].temp;
    document.getElementById('content').innerHTML = allData[0].content;

  }catch(error){
    console.log("error", error);
  }
}
