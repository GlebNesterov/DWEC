const reviews = [
  {
    id: 1,
    name: "Vincent Law",
    job: "Romdeau AutoReiv disposal technician",
    img: "vincent-law.jpg",
    text: "Vincent's first memories are of the journey to Romdeau after the (partial) destruction of the Mosk dome."
  },
  {
    id: 2,
    name: "Pino",
    job: "Companion AutoReiv",
    img: "pino.jpg",
    text: "Pino (short for Pinocchio) was purchased by Raul Creed and his wife as a replacement for a real child they did not have enough social privileges to be awarded (children in Romdeau are created in a lab and only a few of the upper echelon citizens can get one)."
  },
  {
    id: 3,
    name: "Daedalus Yumeno",
    job: "Chief physician of the Division of Health and Wellfare",
    img: "daedalus.jpg",
    text: "Daedalus Yumeno has the appearance of a young boy no older than the age of 13 or 14, or even a young woman, but later, in a conversation with Raul Creed, it is revealed that he may in fact be much older."
  },
  {
    id: 4,
    name: "Re-L Mayer",
    job: "Citizen Intelligence Bureau Inspector",
    img: "f58123194e69e5ea39657e43e45a08f2.jpg",
    text: "At the start of the show, Re-L Mayer is shown as not quite a rebel but more so an oddball of Romdeau society; she has less of a regard for rules and regulations than the ideal fellow citizen who always [obeys] and believes that questioning the system is bad."
  }

];

const img = document.getElementById('person-img');
const author = document.getElementById('author');
const job = document.getElementById('job');
const info = document.getElementById('info');

const prevBtn = $('.prev-btn');
const nextBtn= $('.next-btn');
const randomBtn = $('.random-btn');

let itemNum = 0;

window.addEventListener('DOMContentLoaded', function(){
    showPerson();
});

function showPerson(){
    const item = reviews[itemNum];
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
}

prevBtn.addEventListener('click', () =>{
    itemNum--;

    if(itemNum < reviews.length - 1){
        itemNum = 0;
    }
    showPerson();        
});

nextBtn.addEventListener('click', () =>{
    itemNum++;
    if(itemNum > reviews.length - 1){
        itemNum = 0;
    }
    showPerson();        
});

randomBtn.addEventListener('click', () =>{
    itemNum = Math.floor(Math.random() * reviews.length);
    showPerson();
});
