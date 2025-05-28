const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdown = document.querySelectorAll(".dropdown select");// selecting dropdown class select which is two
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg= document.querySelector(".msg")


for(let select of dropdown){
    for (code in countryList){
        let newoption = document.createElement("option");
        newoption.innerText= code
        newoption.value = code
        if (select.name === "from" && code === "USD"){
            newoption.selected="selected";
        }else if (select.name === "to" && code === "INR"){
            newoption.selected="selected";
        }
        select.append(newoption)
    }
    select.addEventListener("change", (evt) => {    // here evt is object
        updateFlag(evt.target);   // target is basically we are passing the changes to event object
    })
}
const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newScr = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newScr;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault(); //refreshing page and if we want nothing to change while refreshing use preventdefault
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if(amtVal ==="" || amtVal < 1){
        amtVal = 1;
        amount.value = "1"
    }
//   console.log(fromCurr.value,toCurr.value);
    const URL = `${url}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json()
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;

})
