/* IEM College Event Management — vanilla JavaScript */
"use strict";
const EVENTS = [
{id:"Cultural Event",name:"Sharod Sandhya",category:"Cultural",date:"2026-10-16T17:00:00+05:30",displayDate:"16 Oct 2026",time:"5:00 PM",venue:"Main Auditorium",icon:"♫",image:"images/cultural-night.jpg",accent:"#d6a0ff",description:"Sharod Sandhya — a cultural evening celebrating music, dance and festive spirit."},
{id:"Tech-Athon",name:"Line-follower robotics challenge",category:"Technical",date:"2026-11-07T10:00:00+05:30",displayDate:"07 Nov 2026",time:"10:00 AM",venue:"IoT Lab",icon:"▣",image:"images/robotics.jpg",accent:"#6ee7c8",description:"Put your robotics skills to the test in the line-follower robotics challenge."},
{id:"Cultural Fest",name:"Innovacion 2026",category:"Technical",date:"2026-11-20T09:00:00+05:30",displayDate:"20 Nov 2026",time:"9:00 AM",venue:"Gurukul Campus, all blocks",icon:"⌘",image:"images/hackathon.jpg",accent:"#67b7ff",description:"Innovacion 2026 — the annual tech fest bringing ideas, technology and innovation together."},
{id:"Tech Event",name:"Robotics 2026",category:"Technical",date:"2026-11-28T09:00:00+05:30",displayDate:"28 Nov 2026",time:"9:00 AM",venue:"College Ground",icon:"⚙",image:"images/robotics1.jpg",accent:"#ffc65e",description:"Explore robotics, engineering and hands-on technology at Robotics 2026."},
{id:"datascience",name:"Data Science Workshop",category:"Workshop",date:"2026-12-05T14:00:00+05:30",displayDate:"05 Dec 2026",time:"2:00 PM",venue:"Computer Lab 1",icon:"▥",image:"images/dat.jpg",accent:"#72a6ff",description:"Learn data analysis and visualisation with real-world datasets."},
{id:"bloodcamp",name:"Blood Donation Camp",category:"Social",date:"2026-12-12T10:00:00+05:30",displayDate:"12 Dec 2026",time:"10:00 AM",venue:"Main Block",icon:"♥",image:"images/bl.jpg",accent:"#ff91b6",description:"Be a hero. Donate blood. Save lives. Join this student-led initiative."}
];
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
let toastTimer;
function toast(message,error=false){const el=$("#toast");el.textContent=message;el.classList.toggle("error",error);el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),3500)}
function renderEvents(filter="All"){
 const visible=EVENTS.filter(e=>filter==="All"||e.category===filter);
 $("#eventCount").textContent=`${String(visible.length).padStart(2,"0")} EVENTS`;
 $("#eventsGrid").innerHTML=visible.map(e=>`<article class="event-card" style="--event-accent:${e.accent}"><div class="event-card-image"><img src="${e.image||'images/hackathon.jpg'}" alt="${e.name} event artwork" loading="lazy"><span class="event-tag">${e.category}</span></div><div class="event-card-top"><span class="event-symbol">${e.icon}</span><span class="event-date">EVENT / ${e.id.toUpperCase()}</span></div><h3>${e.name}</h3><div class="event-meta"><span>▦ ${e.displayDate}</span><span>◷ ${e.time}</span><span>⌖ ${e.venue}</span></div><p class="event-description">${e.description}</p><div class="event-bottom"><span class="event-date">JOIN THE EXPERIENCE</span><button class="event-register" data-register="${e.id}" type="button">Register ↗</button></div></article>`).join("");
 $$("#eventFilters button").forEach(b=>{const active=b.dataset.filter===filter;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active))});
}
function populateEvents(){const select=$("#eventSelect");EVENTS.forEach(e=>{const o=document.createElement("option");o.value=e.id;o.textContent=`${e.name} — ${e.displayDate}`;select.append(o)})}
function countdown(){const now=Date.now(),next=EVENTS.map(e=>({...e,stamp:Date.parse(e.date)})).filter(e=>e.stamp>now).sort((a,b)=>a.stamp-b.stamp)[0];if(!next){$("#nextEventName").textContent="More events coming soon";$("#nextEventDate").textContent="Check back for updates";return}$("#nextEventName").textContent=next.name;$("#nextEventDate").textContent=`${next.displayDate} · ${next.time} · ${next.venue}`;let s=Math.max(0,Math.floor((next.stamp-now)/1000));const d=Math.floor(s/86400);s%=86400;const h=Math.floor(s/3600);s%=3600;const m=Math.floor(s/60);s%=60;[d,h,m,s].forEach((v,i)=>$("#"+["countDays","countHours","countMinutes","countSeconds"][i]).textContent=String(v).padStart(2,"0"))}
function clock(){$("#digitalClock").textContent=new Intl.DateTimeFormat("en-IN",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:true}).format(new Date());$("#clockDate").textContent=new Intl.DateTimeFormat("en-IN",{timeZone:"Asia/Kolkata",weekday:"short",day:"2-digit",month:"short",year:"numeric"}).format(new Date())+" · Kolkata, IST"}
function setTheme(t){document.body.classList.toggle("light-theme",t==="light");$("#themeIcon").textContent=t==="light"?"☾":"☼";try{localStorage.setItem("iem-event-theme",t)}catch(e){}}
function initTheme(){let saved;try{saved=localStorage.getItem("iem-event-theme")}catch(e){}setTheme(saved||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"));$("#themeToggle").addEventListener("click",()=>setTheme(document.body.classList.contains("light-theme")?"dark":"light"))}
function setError(field,msg){const el=$("#"+field.id+"Error"),wrap=field.closest(".field");if(el)el.textContent=msg||"";if(wrap)wrap.classList.toggle("invalid",!!msg);field.setAttribute("aria-invalid",String(!!msg))}
function validate(field){const v=field.value.trim();let m="";if(field.required&&!v)m="This field is required.";else if(["studentName","feedbackName"].includes(field.id)&&v&&!/^[A-Za-z][A-Za-z .'-]{1,59}$/.test(v))m="Enter a valid name (at least 2 characters).";else if(field.id==="rollNumber"&&v&&!/^[0-9]{10}$/.test(v))m="Roll number must contain exactly 10 digits.";else if(["studentEmail","feedbackEmail"].includes(field.id)&&v&&!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(v))m="Enter a valid email address.";else if(field.id==="studentPhone"&&v&&!/^[6-9][0-9]{9}$/.test(v))m="Enter a valid 10-digit Indian mobile number.";else if(field.id==="feedbackText"&&v&&v.length<8)m="Please write at least 8 characters.";setError(field,m);return !m}
function validateGender(){const ok=$('input[name="gender"]:checked');$("#genderError").textContent=ok?"":"Please select an option.";$(".gender-field").classList.toggle("invalid",!ok);return !!ok}
function attachValidation(form){$$("input:not([type=radio]),select,textarea",form).forEach(f=>{f.addEventListener("blur",()=>validate(f));f.addEventListener("input",()=>{if(f.value.trim()||f.getAttribute("aria-invalid")==="true")validate(f)});f.addEventListener("change",()=>validate(f))});$$('input[name="gender"]',form).forEach(r=>r.addEventListener("change",validateGender))}
function initRegistration(){const form=$("#registrationForm");attachValidation(form);form.addEventListener("submit",ev=>{ev.preventDefault();const fields=$$("input:not([type=radio]),select",form),ok=fields.map(validate).every(Boolean)&&validateGender();if(!ok){$("#registrationMessage").textContent="Please correct the highlighted fields and try again.";$("#registrationMessage").className="form-message error";$(".field.invalid input,.field.invalid select",form)?.focus();return}const event=EVENTS.find(e=>e.id===$("#eventSelect").value);$("#registrationMessage").textContent=`Registration preview ready for ${event.name}. No data was sent or stored.`;$("#registrationMessage").className="form-message";toast(`Thanks, ${$("#studentName").value.trim()}! Your demo registration is complete.`);form.reset();fields.forEach(f=>setError(f,""));validateGender()})}
function initFeedback(){const form=$("#feedbackForm");attachValidation(form);form.addEventListener("submit",ev=>{ev.preventDefault();const fields=[$("#feedbackName"),$("#feedbackEmail"),$("#feedbackText")];if(!fields.map(validate).every(Boolean)){$("#feedbackMessage").textContent="Please review the highlighted fields.";$("#feedbackMessage").className="form-message error";fields.find(f=>f.getAttribute("aria-invalid")==="true")?.focus();return}$("#feedbackMessage").textContent="Thank you for your feedback! This demo does not send it to a server." ;$("#feedbackMessage").className="form-message";toast("Feedback validated. Thanks for helping us improve!");form.reset();fields.forEach(f=>setError(f,""))})}
function initNavigation(){const toggle=$("#menuToggle"),nav=$("#mainNav");toggle.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")==="true";toggle.setAttribute("aria-expanded",String(!open));toggle.setAttribute("aria-label",open?"Open navigation":"Close navigation");nav.classList.toggle("open",!open)});$$("#mainNav a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false")}));const sections=$$("main section[id]"),links=$$(".nav-link");if("IntersectionObserver"in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)links.forEach(link=>link.classList.toggle("active",link.hash==="#"+entry.target.id))}),{rootMargin:"-30% 0px -60% 0px"});sections.forEach(s=>observer.observe(s))}}
document.addEventListener("click",ev=>{const button=ev.target.closest("[data-register]");if(button){$("#eventSelect").value=button.dataset.register;$("#registration").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});$("#studentName").focus({preventScroll:true})}});
$("#eventFilters").addEventListener("click",ev=>{const button=ev.target.closest("[data-filter]");if(button)renderEvents(button.dataset.filter)});
$("#currentYear").textContent=new Date().getFullYear();
renderEvents();populateEvents();initTheme();initNavigation();initRegistration();initFeedback();countdown();clock();setInterval(countdown,1000);setInterval(clock,1000);

/* ==========================================
   INTERACTIVE 3D CARD TILT
   ========================================== */

(() => {
  const cards = document.querySelectorAll(
    '.event-card, .glass-card, .coordinator-card'
  );

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (reduceMotion) return;

  cards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;

      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 8;
      const rotateX = (0.5 - y) * 8;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
})();
