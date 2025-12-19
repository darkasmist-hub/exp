const bar = document.querySelector('#bar');
const menu = document.querySelector('#menu');

if( bar ){
bar.addEventListener('click',()=>{
  menu.classList.toggle('active');
});
}
