const screens=[...document.querySelectorAll(".screen")];
function show(id){screens.forEach(s=>s.classList.toggle("active",s.id===id));window.scrollTo({top:0,behavior:"smooth"});}
document.querySelectorAll(".next").forEach(b=>b.addEventListener("click",()=>show(b.dataset.next)));
const noBtn=document.getElementById("noBtn");
function dodge(){const area=document.querySelector(".actions");const maxX=Math.max(0,area.clientWidth-noBtn.offsetWidth);const maxY=90;noBtn.style.position="absolute";noBtn.style.left=Math.random()*maxX+"px";noBtn.style.top=(Math.random()*maxY-35)+"px";}
noBtn.addEventListener("pointerenter",dodge);noBtn.addEventListener("touchstart",e=>{e.preventDefault();dodge();},{passive:false});noBtn.addEventListener("click",e=>{e.preventDefault();dodge();});
let audioCtx=null,oscillators=[],soundOn=true, melodyTimer=null;
function startMusic(){
  if(!soundOn)return;
  const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
  if(!audioCtx)audioCtx=new AC(); if(audioCtx.state==="suspended")audioCtx.resume();
  if(melodyTimer)return;
  const notes=[523.25,659.25,783.99,659.25,587.33,698.46,880,698.46];
  let i=0;
  const play=()=>{if(!soundOn||!audioCtx)return;const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type="sine";o.frequency.value=notes[i++%notes.length];g.gain.setValueAtTime(.0001,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.045,audioCtx.currentTime+.08);g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.65);o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+.7);};
  play();melodyTimer=setInterval(play,520);
}
function stopMusic(){if(melodyTimer){clearInterval(melodyTimer);melodyTimer=null;}}
document.getElementById("yesBtn").addEventListener("click",()=>{startMusic();show("welcome");});
const soundToggle=document.getElementById("soundToggle");
soundToggle.addEventListener("click",()=>{soundOn=!soundOn;soundToggle.textContent=soundOn?"♫ Sound: On":"♫ Sound: Off";if(soundOn)startMusic();else stopMusic();});
// Requested order: the original second video plays first, then the original first video.
const videoFiles=["videos/video2.mp4","videos/video1.mp4"];
let videoIndex=0;
const video=document.getElementById("memoryVideo"), videoNote=document.getElementById("videoNote"), videoNext=document.getElementById("videoNext");
function loadVideos(){videoIndex=0;video.style.display="block";playVideo();}
function playVideo(){
  video.src=videoFiles[videoIndex];video.load();
  video.play().catch(()=>{videoNote.textContent="ভিডিও চালাতে Play চাপো। / Tap Play if the video does not start.";});
  videoNote.textContent=`Video ${videoIndex+1} of ${videoFiles.length} · পরের ভিডিও নিজে থেকেই চলবে ❤️`;
  videoNext.textContent=videoIndex===videoFiles.length-1?"See photos ➜":"Next video ➜";
}
video.addEventListener("ended",()=>{if(videoIndex<videoFiles.length-1){videoIndex++;playVideo();}else{show("photos");}});
videoNext.addEventListener("click",()=>{if(videoIndex<videoFiles.length-1){videoIndex++;playVideo();}else show("photos");});
document.querySelector('[data-next="videos"]').addEventListener("click",loadVideos);
const photos=[
 ["assets/photo-01-eyes.png","My favourite eyes 💗","তোমার চোখের মায়াতেই যেন আমার পুরো পৃথিবী।"],
 ["assets/photo-02-red-bow.png","So beautiful, Saniya 🎀","তোমার হাসি আমার সবচেয়ে প্রিয়।"],
 ["assets/photo-03-black-dress.png","My forever favourite 🌷","তোমাকে প্রতিদিন নতুন করে ভালো লাগে।"],
 ["assets/photo-04-extra.png","A precious moment ❤️","তোমার প্রতিটি মুহূর্ত আমার কাছে অমূল্য।"],
 ["assets/photo-05-cat.png","A little extra cuteness 🐱","তোমার সঙ্গে এমন মিষ্টি মুহূর্ত আরও চাই।"]
];
let photoIndex=0;const photoImg=document.getElementById("memoryPhoto"),photoCounter=document.getElementById("photoCounter"),photoNote=document.getElementById("photoNote"),photoNext=document.getElementById("photoNext");
function showPhoto(){const p=photos[photoIndex];photoImg.src=p[0];photoCounter.textContent=`${photoIndex+1} / ${photos.length} · ${p[1]}`;photoNote.textContent=p[2];photoNext.textContent=photoIndex===photos.length-1?"Final question 💍":"Next photo ➜";}
photoNext.addEventListener("click",()=>{if(photoIndex<photos.length-1){photoIndex++;showPhoto();}else show("letter");});
document.getElementById("replay").addEventListener("click",()=>{photoIndex=0;showPhoto();show("question");});
document.getElementById("proposalYes").addEventListener("click",()=>{startMusic();show("answer");for(let i=0;i<24;i++)makePetal();});
document.getElementById("replayFromAnswer").addEventListener("click",()=>{photoIndex=0;showPhoto();show("question");});
function makePetal(){const p=document.createElement("span");p.className="rose-petal";p.textContent=["🌹","🌸","💗"][Math.floor(Math.random()*3)];p.style.left=Math.random()*100+"%";p.style.animationDuration=(4+Math.random()*4)+"s";document.body.appendChild(p);setTimeout(()=>p.remove(),8500);}
const heartBox=document.querySelector(".floating-hearts");setInterval(()=>{const h=document.createElement("span");h.className="float-heart";h.textContent=["♥","♡","💕"][Math.floor(Math.random()*3)];h.style.left=Math.random()*100+"%";h.style.fontSize=(14+Math.random()*22)+"px";h.style.animationDuration=(5+Math.random()*5)+"s";heartBox.appendChild(h);setTimeout(()=>h.remove(),10000);},900);
