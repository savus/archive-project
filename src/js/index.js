const loadPercent = document.querySelector('.load-percent');
let percentNum = 0;

const timer = setInterval(function(){
   if (percentNum < 100) {
      percentNum += 1;
      loadPercent.innerHTML = `${percentNum}%`;
   } else {
      return clearTimeout(timer);
   }
}, 30);