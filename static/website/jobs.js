const sortbtn = document.querySelectorAll(".job-filter > .type-job");
const joblocation =  document.querySelectorAll(".job-filter > .location");
const sortitem =document.querySelectorAll(".jobs-container > *");
console.log(sortbtn)
function filter(typeoffilter, typeofvalue , typefodata){
 typeoffilter.forEach((btn)=>{
    btn.addEventListener("change",(e)=>{
      const value = e.target.value;
      sortitem.forEach((item)=>{
        item.classList.add("delete")
        if(item.getAttribute(`${typefodata}`) === value || value === `${typeofvalue}`){
          item.classList.remove("delete");
        }
      })
    })
  });
}
filter(sortbtn, "Recent job", "data-type")
filter(joblocation, "Your location" , "data-job")
filter(salarybtn, "Salary","data-salary")
filter(stationbtn, "Near Bus/Metro","data-station")