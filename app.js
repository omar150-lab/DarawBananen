
document.documentElement.classList.add("js");
const hd=document.getElementById("hd");
const upd=()=>hd.classList.toggle("on",document.body.classList.contains("inner")||scrollY>60);
addEventListener("scroll",upd,{passive:true});upd();
const root=document.documentElement,$=q=>document.querySelector(q);
const loc=()=>root.lang==="en"?"en-US":"ar-EG";
const fmt=n=>n.toLocaleString(loc(),{useGrouping:false}),y=new Date().getFullYear(),age=y-1904;
document.getElementById("yr").textContent=" "+fmt(y);
const yrs=document.getElementById("yrs");if(yrs)yrs.textContent=fmt(age);
const still=matchMedia("(prefers-reduced-motion: reduce)").matches;
function count(){if(still||!yrs)return;const t0=performance.now();(function k(t){const p=Math.min((t-t0)/1400,1);yrs.textContent=fmt(Math.round(age*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(k)})(t0)}

/* محتوى الموقع: أضف المعلمين والصور هنا */
/* ضع هنا وسيلة استلام الاقتراحات (واحدة تكفي): رابط Formspree أو رقم واتساب بالصيغة الدولية بدون + أو إيميل */
const SITE={contact:{endpoint:"/api/suggest",whatsapp:"",email:""},teachers:[],gallery:[{src:"images/gallery-01.webp",caption:"من لحظات المدرسة وأنشطتها"},{src:"images/gallery-02.webp",caption:"داخل الفصل"},{src:"images/gallery-03.webp",caption:"تسليم شهادة في ساحة المدرسة"},{src:"images/gallery-04.webp",caption:"في ساحة المدرسة"},{src:"images/gallery-05.webp",caption:"الطلاب في ساحة المدرسة"},{src:"images/gallery-06.webp",caption:"داخل الفصل"},{src:"images/gallery-07.webp",caption:"داخل الفصل"}]};
const mk=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!==undefined)e.textContent=h;return e};

if(SITE.gallery.length&&$(".gal")){const g=$(".gal");g.className="gg";g.removeAttribute("role");g.removeAttribute("aria-label");g.innerHTML="";
 const f0=mk("figure","pop"),d0=mk("div","t0");d0.setAttribute("role","img");d0.setAttribute("aria-label","لقطة جماعية من داخل المدرسة");f0.append(d0);g.append(f0);
 SITE.gallery.forEach(p=>{const f=mk("figure","pop"),i=mk("img");i.src=p.src;i.alt=p.caption||"";i.decoding="async";f.append(i);if(p.caption)f.append(mk("figcaption","",p.caption));g.append(f)})}
/* الأخبار: أضف خبر جديد في SITE.news = [{date:"2026-10-31",title:"...",who:"...",text:"...",images:["data:..."],en:{title:"...",who:"...",text:"..."}}]
   وهيظهر تلقائيًا ويترتب من الأحدث للأقدم. الأخبار القديمة تقدر تدّيها تاريخ بإضافة data-date="2026-10-31" على وسم article. */
const nsec=$("#nlist");var NW=null,LD={},LK={nlist:"news",hnews:"news",tgrid:"sf"};
function mkNews(n){const a=mk("article","news pop"),b=mk("div","nb");a.dataset.date=n.date||"";
 b.append(mk("small","","خبر"),mk("h3","",n.title));if(n.who)b.append(mk("b","who",n.who));if(n.text)b.append(mk("p","",n.text));a.append(b);
 if(n.images&&n.images.length){const h=mk("div","hon");n.images.forEach(s=>{const i=mk("img");i.src=s;i.alt=n.title;i.loading="lazy";i.decoding="async";h.append(i)});a.append(h)}return a}
function renderDates(){document.querySelectorAll("[data-news] article.news").forEach(a=>{const s=a.querySelector("small");if(!s)return;let tm=s.querySelector("time");if(!tm){tm=mk("time");s.append(tm)}
 const d=a.dataset.date;if(!d){tm.textContent="";tm.removeAttribute("datetime");return}
 const dt=new Date(d+"T00:00:00");tm.setAttribute("datetime",d);tm.textContent=isNaN(dt)?"":"· "+dt.toLocaleDateString(loc(),{year:"numeric",month:"long",day:"numeric"})})}
function sortNews(){document.querySelectorAll("[data-news]").forEach(nsec=>{[...nsec.querySelectorAll("article.news")].sort((a,b)=>{const x=a.dataset.date||"",y=b.dataset.date||"";return x===y?0:!x?1:!y?-1:y<x?-1:1}).forEach(a=>nsec.append(a))})}
if(nsec)(SITE.news||[]).forEach(n=>nsec.append(mkNews(n)));sortNews();renderDates();
/* الأخبار تُقرأ من قاعدة البيانات (API). لو تعذّر الاتصال تبقى الأخبار المكتوبة في الصفحة كنسخة احتياطية. */
async function loadNews(){try{const r=await fetch("/api/news",{headers:{Accept:"application/json"}});if(!r.ok)throw 0;const d=await r.json();if(!Array.isArray(d.news))throw 0;
 NW=d.news;document.querySelectorAll("[data-news] article.news").forEach(a=>a.remove());
 d.news.forEach(n=>{const e=n.en||{};if(e.title)EN[n.title]=e.title;if(e.who&&n.who)EN[n.who]=e.who;if(e.text&&n.text)EN[n.text]=e.text;});document.querySelectorAll("[data-news]").forEach(c=>[...d.news].sort((a,b)=>(b.date||"").localeCompare(a.date||"")).slice(0,+c.dataset.max||999).forEach(n=>c.append(mkNews(n))));
 sortNews();renderDates();document.querySelectorAll("[data-news] .pop").forEach(e=>io.observe(e));LD.news=1;newsEmpty();if(root.lang==="en")walk(true)}catch(e){LD.news=2;newsEmpty()}}
/* ===== الوضع الليلي + مساعد المدرسة + الاقتراحات ===== */
const L=(a,e)=>root.lang==="en"?e:a;
const th=mk("button","","🌙");th.id="theme";th.type="button";th.setAttribute("aria-label","تبديل الوضع الليلي");
function setTheme(d,save){root.dataset.theme=d?"dark":"light";th.textContent=d?"☀️":"🌙";if(save)try{localStorage.setItem("th",d?"d":"l")}catch(e){}}
th.onclick=()=>setTheme(root.dataset.theme!=="dark",true);
let sv=null;try{sv=localStorage.getItem("th")}catch(e){}
setTheme(sv?sv==="d":matchMedia("(prefers-color-scheme: dark)").matches,false);
const bt=mk("button","","💬");bt.id="bot";bt.type="button";bt.setAttribute("aria-label","اسأل مساعد المدرسة");bt.setAttribute("aria-expanded","false");bt.setAttribute("aria-controls","bp");
const bp=mk("div");bp.id="bp";bp.hidden=true;bp.setAttribute("role","dialog");bp.setAttribute("aria-label","مساعد المدرسة");
bp.innerHTML='<div class="bh"><b>مساعد دراو</b><small>ردود جاهزة عن المدرسة والموقع</small><button type="button" id="bx" aria-label="إغلاق">✕</button></div><div class="bm" id="bm" aria-live="polite"></div><div class="bc" id="bc"></div><div class="bi"><input id="bq" aria-label="اكتب سؤالك" placeholder="اكتب سؤالك هنا" maxlength="120" autocomplete="off"><button type="button" id="bs" aria-label="إرسال">➤</button></div>';
document.body.append(th,bt,bp);
const nz=s=>String(s).toLowerCase().replace(/[\u064B-\u0652\u0640]/g,"").replace(/[أإآٱ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[^\u0621-\u064Aa-z0-9 ]/g," ").replace(/\s+/g," ").trim();
const KB=[
{k:["مرحبا","اهلا","السلام","هاي","صباح الخير","مساء الخير","hello","hi","hey"],a:()=>L("أهلًا بيك! تحب تعرف إيه عن المدرسة؟","Hello! What would you like to know about the school?")},
{k:["شكرا","تسلم","thanks","thank you"],a:()=>L("العفو! لو عندك سؤال تاني أنا موجود.","You're welcome! Ask me anything else.")},
{k:["انت مين","مين انت","اسمك","who are you","your name"],a:()=>L("أنا مساعد دراو: برنامج صغير جوه الموقع بيرد بردود جاهزة عن المدرسة والموقع، وليس ذكاءً اصطناعيًا توليديًا.","I'm the Daraw assistant: a small program inside the site that gives ready-made answers about the school and the site. I'm not a generative AI.")},
{k:["تاسس","تاسيس","1904","عمر المدرسه","قديمه","تاريخ","founded","history","how old","established"],go:"about",a:()=>L("المدرسة تأسست عام ١٩٠٤، يعني عمرها "+fmt(age)+" عامًا من التعليم.","The school was founded in 1904, so it has been educating for "+fmt(age)+" years.")},
{k:["فين","مكان","عنوان","خريطه","where","location","address","map"],go:"contact",a:()=>L("المدرسة في دراو بمحافظة أسوان. تقدر تفتح موقعها على الخريطة من قسم تواصل معنا.","The school is in Daraw, Aswan. You can open its location on the map from the Contact section.")},
{k:["مدير","المدير","مصطفي","اسماعيل","principal","headmaster"],go:"people",a:()=>L("مدير المدرسة هو الأستاذ مصطفى إسماعيل.","The school principal is Mr. Mostafa Ismail.")},
{k:["نائب المدير","نائب","عمر فاروق","deputy","vice principal"],go:"people",a:()=>L("نائب المدير هو الأستاذ عمر فاروق.","The deputy principal is Mr. Omar Farouk.")},
{k:["رؤي","vision"],go:"mission",a:()=>L("رؤيتنا: الريادة في بناء جيل من الشباب المبدع، المتميز علميًا وأخلاقيًا، والقادر على مواكبة التحول الرقمي والمنافسة العالمية بما يخدم مجتمعه ووطنه.","Our vision: leadership in building a generation of creative young people, distinguished in knowledge and ethics, able to keep pace with digital transformation and global competition, in service of their community and nation.")},
{k:["رساله","التزام","التزامات","اهداف","mission","commitments"],go:"mission",a:()=>L("التزاماتنا الخمسة: تطوير التعليم، رعاية الموهوبين، القيم والأخلاق، التنمية المهنية، والمشاركة المجتمعية.","Our five commitments: developing education, nurturing the gifted, values and ethics, professional development, and community partnership.")},
{k:["شعار","قيم","slogan","values","motto"],go:"people",a:()=>L("شعارنا: تخريج شباب مبدع ونافع لوطنه. وقيمنا: الإبداع، التميز العلمي، الأخلاق، الانتماء، الريادة، التحول الرقمي.","Our slogan: graduating creative youth who serve their nation. Our values: creativity, academic excellence, ethics, belonging, leadership, digital transformation.")},
{k:["خبر","اخبار","news"],go:"news",a:async()=>{if(!NW)await loadNews();const h=[...(NW||[])].sort((a,b)=>(b.date||"").localeCompare(a.date||"")).map(x=>"• "+x.title).join("\n");return L("أخبار المدرسة:\n"+h,"School news:\n"+h)}},
{k:["احمد اسامه","كيكي","امين المدارس","العلمين","مدبولي","وزير","minister","ahmed","alamein"],go:"news",a:()=>L("الطالب أحمد أسامة كيكي، أمين المدارس بمحافظة أسوان، التقى وزير التربية والتعليم ورئيس مجلس الوزراء في العلمين الجديدة. التفاصيل في ركن الأخبار.","Student Ahmed Osama Keki, Aswan's schools secretary, met the Minister of Education and the Prime Minister in New Alamein. Details are in the news section.")},
{k:["دبوس","سحر","اتحاد","pin","union"],go:"news",a:()=>L("تسلّمت الأستاذة سحر، الأخصائية الاجتماعية، دبوس الاتحاد تقديرًا لكون أمين اتحاد الطلاب ممثلًا للطلاب على مستوى المديرية.","Ms. Sahar, the social specialist, received the Union pin in recognition of the student union secretary representing students at the directorate level.")},
{k:["تكريم","مكرم","كرم","honor","honored","honour"],go:"news",a:()=>L("تم تكريم الطالب عمر الحسين صلاح الدين دياب تقديرًا لتصميم وتطوير هذا الموقع. التفاصيل في ركن الأخبار.","Student Omar Al-Hussein Salah El-Din Diab was honored for designing and developing this site. Details are in the news section.")},
{k:["عمل الموقع","صاحب الموقع","من صنع","صمم","مصمم","تصميم","مطور","تطوير","عمر الحسين","developer","designer","who made","who built","created"],a:()=>L("الموقع من تصميم وتطوير الطالب عمر الحسين صلاح الدين دياب.","The site was designed and developed by student Omar Al-Hussein Salah El-Din Diab.")},
{k:["ذكاء اصطناعي","ذكاء","كلود","claude","chatgpt","ai","artificial intelligence","برمجه","كود","code","built with","تقنيات"],a:()=>L("الموقع مكتوب بـ HTML وCSS وJavaScript في ملف واحد. الفكرة والمحتوى والقرارات من عمر، واستعان بأدوات ذكاء اصطناعي في كتابة الكود.","The site is written in HTML, CSS and JavaScript in a single file. The idea, content and decisions are Omar's, and he used AI tools to help write the code.")},
{k:["حاسبه","نسبه","مئويه","درجات","مجموع","calculator","percent","percentage","grades"],go:"tools",a:()=>L("في قسم الخدمات حاسبة نسبة مئوية: اكتب اسم المادة ودرجتك والدرجة النهائية، وهيطلع المجموع والنسبة تلقائيًا.","The Services section has a percentage calculator: enter the subject, your score and the maximum, and it shows the total and percentage automatically.")},
{k:["صور","معرض","gallery","photos","pictures"],go:"gallery",a:()=>L("معرض المدرسة فيه صور من الفصول والساحة والشهادات. اضغط على أي صورة لتكبيرها.","The gallery has photos of classrooms, the schoolyard and certificates. Tap any photo to enlarge it.")},
{k:["معلم","معلمين","مدرسين","teacher","teachers","staff"],go:"teachers",a:()=>L("دليل المعلمين والمواد في صفحة «المعلمون».","The teachers directory is on the Teachers page.")},
{k:["اقتراح","اقترح","شكوي","ملاحظه","suggest","suggestion","complaint","feedback"],go:"suggest",a:()=>L("يسعدنا نسمع رأيك! اكتب اقتراحك في النموذج.","We'd love to hear from you! Write your suggestion in the form.")},
{k:["تواصل","فيسبوك","فيس","رقم","تليفون","موبايل","واتساب","contact","facebook","phone","whatsapp","call"],go:"contact",a:()=>L("تقدر تتابع المدرسة على فيسبوك من قسم تواصل معنا، أو تسيب اقتراحك في نموذج الاقتراحات. رقم التليفون لسه مش مضاف.","You can follow the school on Facebook from the Contact section, or leave a suggestion in the form. The phone number hasn't been added yet.")},
{k:["انجليزي","english","لغه","language","عربي","ترجمه","translate"],a:()=>L("الموقع بالعربي والإنجليزي. اضغط زرار EN أعلى الصفحة للتبديل.","The site is available in Arabic and English. Use the button at the top of the page to switch.")},
{k:["ليلي","dark","night","مظلم","theme"],act:()=>setTheme(root.dataset.theme!=="dark",true),a:()=>L("اتبدّل الوضع. تقدر ترجع بزرار القمر/الشمس جنب المساعد.","Theme switched. You can switch back with the moon/sun button next to the assistant.")},
{k:["جدول","حصص","حصه","الجدول","schedule","timetable"],go:"sched",a:()=>L("جدول الحصص في قسم «جدول الحصص»: اختر فصلك وهتشوف حصص الأسبوع.","The class timetable is in the “Class schedule” section: pick your class to see the week.")},
{k:["اختبار","اختبارات","مواد","ملخص","مذاكره","مراجعه","quiz","quizzes","materials","study"],go:"learn",a:()=>L("في قسم «المواد التعليمية والاختبارات» هتلاقي ملخصات وروابط مراجعة من المعلمين، واختبارات قصيرة تحلها وتعرف نتيجتك فورًا.","In the “Study materials & quizzes” section you’ll find summaries and revision links from teachers, plus short quizzes with instant results.")},
{k:["تطبيق","تثبيت","ثبت","install","app","شاشه رئيسيه"],a:()=>L("تقدر تثبّت الموقع كتطبيق: من قائمة المتصفح (⋮ أو زر المشاركة) اختار «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».","You can install the site as an app: from the browser menu (⋮ or the share button) choose “Install app” or “Add to Home Screen”.")},
{k:["شارك","مشاركه","share","رابط الموقع"],act:()=>{const u=location.href.split("?")[0];if(navigator.share)navigator.share({title:document.title,url:u}).catch(()=>{});else if(navigator.clipboard)navigator.clipboard.writeText(u).catch(()=>{})},a:()=>L("جهّزت لك رابط الموقع للمشاركة.","I've prepared the site link for sharing.")}
];
KB.forEach(e=>e.k=e.k.map(nz));
const hit=(q,k)=>(k.length<=3||/^[a-z0-9 ]+$/.test(k))?q.includes(" "+k+" "):q.includes(k);
function find(s){const q=" "+nz(s)+" ";let b=null,m=0;KB.forEach(e=>{let sc=0;e.k.forEach(k=>{if(hit(q,k))sc+=k.length});if(sc>m){m=sc;b=e}});return b}
const bm=$("#bm"),bc=$("#bc"),bq=$("#bq");
function addMsg(txt,cls,go){const m=mk("div","m"+(cls?" "+cls:""),txt);if(go){const g=mk("button","",L("اذهب للقسم","Go to section"));g.type="button";g.onclick=()=>{bp.hidden=true;bt.setAttribute("aria-expanded","false");goTo(go)};m.append(g)}bm.append(m);bm.scrollTop=bm.scrollHeight;return m}
function chips(){bc.innerHTML="";(root.lang==="en"?["Who is the principal?","What's the latest news?","When was the school founded?","Who built the site?","How can I contact you?"]:["مين مدير المدرسة؟","إيه أخبار المدرسة؟","المدرسة اتأسست إمتى؟","مين عمل الموقع؟","إزاي أتواصل؟"]).forEach(s=>{const c=mk("button","",s);c.type="button";c.onclick=()=>ask(s);bc.append(c)})}
function ask(s){s=(s||"").trim();if(!s)return;bq.value="";addMsg(s,"u");const e=find(s),w=addMsg("…","");hitBot(e);
 setTimeout(async()=>{w.remove();if(e){if(e.act)e.act();addMsg(await e.a(),"",e.go)}else addMsg(L("ما فهمتش سؤالك كويس. جرّب تسأل عن: المدير، الأخبار، تاريخ المدرسة، المعرض، أو التواصل.","I didn't quite get that. Try asking about: the principal, the news, school history, the gallery, or contact."),"");bm.scrollTop=bm.scrollHeight},still?0:450)}
function openBot(o){bp.hidden=!o;bt.setAttribute("aria-expanded",o);if(o){if(!bm.children.length){addMsg(L("أهلًا! أنا مساعد دراو، بجاوب بردود جاهزة عن المدرسة والموقع. اسألني أو اختار سؤال:","Hi! I'm the Daraw assistant. I answer with ready-made replies about the school and the site. Ask me or pick a question:"),"")}chips();bq.focus()}}
bt.onclick=()=>openBot(bp.hidden);$("#bx").onclick=()=>{openBot(false);bt.focus()};
$("#bs").onclick=()=>ask(bq.value);bq.addEventListener("keydown",e=>{if(e.key==="Enter")ask(bq.value)});
addEventListener("keydown",e=>{if(e.key==="Escape"&&!bp.hidden){openBot(false);bt.focus()}});
const sgs=$("#sgs");
($("#sgb")||{}).onclick=async()=>{const n=$("#sgn").value.trim(),m=$("#sgm").value.trim(),c=SITE.contact||{};
 if(m.length<5){sgs.textContent=L("اكتب اقتراحك الأول (٥ حروف على الأقل).","Please write your suggestion first (at least 5 characters).");return}
 const txt=(n?n+": ":"")+m;
 try{
  if(c.endpoint){const r=await fetch(c.endpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({name:n,message:m})});if(!r.ok)throw 0;sgs.textContent=L("شكرًا! وصلنا اقتراحك.","Thank you! Your suggestion was sent.");$("#sgm").value=""}
  else if(c.whatsapp){open("https://wa.me/"+c.whatsapp+"?text="+encodeURIComponent(txt),"_blank","noopener");sgs.textContent=L("اتفتحت الرسالة، اضغط إرسال علشان تكمل.","The message is ready, tap send to finish.")}
  else if(c.email){location.href="mailto:"+c.email+"?subject="+encodeURIComponent("اقتراح من موقع المدرسة")+"&body="+encodeURIComponent(txt);sgs.textContent=L("اتفتحت الرسالة، اضغط إرسال علشان تكمل.","The message is ready, tap send to finish.")}
  else{await navigator.clipboard.writeText(txt);sgs.textContent=L("الإرسال المباشر لسه مش مفعّل. اتنسخ اقتراحك، ابعته لصفحة المدرسة على فيسبوك.","Direct sending isn't enabled yet. Your text was copied; please send it to the school's Facebook page.")}
 }catch(e){sgs.textContent=L("حصلت مشكلة، حاول تاني.","Something went wrong, please try again.")}};
const hero=$(".hero");
if(hero)for(let i=0;i<11;i++){const b=mk("i","bub"),z=14+(i*37%48);b.style.cssText="width:"+z+"px;height:"+z+"px;left:"+(i*9+3)%96+"%;animation-duration:"+(11+i*5%9)+"s;animation-delay:-"+(i*3%11)+"s";hero.append(b)}
const RW={ar:["مبدعًا","متميزًا علميًا","متميزًا أخلاقيًا","قادرًا على مواكبة التحول الرقمي"],en:["creative","distinguished in knowledge","distinguished in ethics","able to keep pace with digital change"]};
let wi=0;const rw=$("#rw"),setW=()=>{if(rw)rw.textContent=RW[root.lang==="en"?"en":"ar"][wi]};setW();
if(!still&&rw)setInterval(()=>{rw.classList.add("o");setTimeout(()=>{wi=(wi+1)%4;setW();rw.classList.remove("o")},350)},2600);
const trk=$("#trk");if(trk)trk.innerHTML+=trk.innerHTML;
const prog=$("#prog"),up=$("#up");let st=false;
addEventListener("scroll",()=>{if(st)return;st=true;requestAnimationFrame(()=>{const h=root.scrollHeight-innerHeight;prog.style.transform="scaleX("+(h>0?scrollY/h:0)+")";up.classList.toggle("on",scrollY>700);st=false})},{passive:true});
const f1=n=>n.toLocaleString(loc(),{maximumFractionDigits:1});
const num=v=>{const n=parseFloat(String(v).replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace("٫","."));return isNaN(n)?0:n};
const rows=$("#rows");
function addRow(){if(rows.children.length>=12)return;const r=mk("div","cr");r.innerHTML='<input aria-label="اسم المادة" placeholder="مثال: لغة عربية"><input class="s" inputmode="decimal" aria-label="الدرجة" placeholder="٠"><input class="x" inputmode="decimal" aria-label="الدرجة النهائية" value="١٠٠">';rows.append(r);if(root.lang==="en")walk(true)}
function calc(){let s=0,x=0;rows.querySelectorAll(".cr").forEach(r=>{const v=r.querySelector(".s").value.trim(),m=num(r.querySelector(".x").value);if(v!==""&&m>0){s+=Math.min(num(v),m);x+=m}});const p=x?s/x*100:0;$("#sum").textContent=f1(s)+" / "+f1(x);$("#pct").textContent=f1(p)+(root.lang==="en"?"%":"٪");$("#fill").style.width=p+"%";$(".pbar").setAttribute("aria-valuenow",Math.round(p))}
const init=()=>{rows.innerHTML="";for(let i=0;i<4;i++)addRow();calc()};
if(rows){rows.addEventListener("input",calc);$("#add").onclick=addRow;$("#reset").onclick=init;init()}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add("in");if(yrs&&e.target.contains(yrs))count();io.unobserve(e.target)}),{threshold:.25});
document.querySelectorAll(".pop,.slide").forEach(el=>io.observe(el));
const menu=$("#menu"),bg1=$("#burger"),bg2=$("#burger2");
function setMenu(o){
  if(o){const L=menu.querySelector(".ml");L.innerHTML="";let mi=0;document.querySelectorAll("#mainnav>a,#mainnav .dt,#mainnav .dm a").forEach(a=>{if(a.classList.contains("dt")){const g=mk("span","mg",a.textContent.trim());g.style.transitionDelay=(.03+mi++*.035)+"s";L.append(g);return}const l=mk("a",a.closest(".dm")?"sub":"",a.textContent.trim());l.href=a.getAttribute("href");if(a.getAttribute("aria-current"))l.setAttribute("aria-current","page");l.style.transitionDelay=(.03+mi++*.035)+"s";l.onclick=()=>setMenu(false);L.append(l)});
    menu.hidden=false;requestAnimationFrame(()=>requestAnimationFrame(()=>menu.classList.add("open")));hd.classList.add("force");document.body.style.overflow="hidden"}
  else{menu.classList.remove("open");hd.classList.remove("force");document.body.style.overflow="";setTimeout(()=>{if(!menu.classList.contains("open"))menu.hidden=true},320)}
  bg1.setAttribute("aria-expanded",o);if(bg2)bg2.setAttribute("aria-expanded",o)}
[bg1,bg2].filter(Boolean).forEach(b=>b.onclick=()=>setMenu(menu.hidden||!menu.classList.contains("open")));
addEventListener("keydown",e=>{if(e.key==="Escape"&&!menu.hidden)setMenu(false)});
addEventListener("resize",()=>{if(innerWidth>1100&&!menu.hidden)setMenu(false)});
const lb=$("#lb"),lbi=lb.querySelector("img"),lbc=lb.querySelector("figcaption"),IMG=".news img,.gg img,.who img";let lbs=[],lbk=0;
function showLb(k){lbk=(k+lbs.length)%lbs.length;const i=lbs[lbk];lbi.src=i.src;lbi.alt=i.alt;lbc.textContent=i.alt;lb.classList.remove("zoom");lb.querySelector("figure").scrollTo(0,0)}
document.addEventListener("click",e=>{const i=e.target.closest(IMG);if(!i)return;lbs=[...document.querySelectorAll(IMG)];showLb(lbs.indexOf(i));if(!lb.open)lb.showModal()});
lbi.onclick=()=>lb.classList.toggle("zoom");
$("#lbx").onclick=()=>lb.close();
const rtl=()=>root.dir==="rtl";
$("#lbL").onclick=()=>showLb(lbk+(rtl()?1:-1));$("#lbR").onclick=()=>showLb(lbk+(rtl()?-1:1));
lb.addEventListener("click",e=>{if(e.target===lb)lb.close()});
lb.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")showLb(lbk+(rtl()?1:-1));if(e.key==="ArrowRight")showLb(lbk+(rtl()?-1:1))});
const EN={"عرض الصورة":"Image viewer","إغلاق":"Close","السابق":"Previous","التالي":"Next","من تعلُّم البرمجة إلى صناعة أثر حقيقي":"From learning programming to making a real impact","الطالب عمر الحسين صلاح الدين دياب":"Student Omar Al-Hussein Salah El-Din Diab","تفخر مدرسة دراو الثانوية بنين بإنجازات ابنها المتميز عمر، الذي استطاع توظيف ما تعلّمه في البرمجة في تنفيذ مشروع رقمي يعكس إبداعه ومهاراته التقنية، ليكون نموذجًا مشرفًا للطلاب الموهوبين والمبدعين.":"Daraw Boys' Secondary School is proud of the achievements of its outstanding student Omar, who was able to apply what he learned in programming to carry out a digital project that reflects his creativity and technical skills, setting a proud example for talented and creative students.","لقطات من التكريم والتقدير":"Moments from the honoring and appreciation","لقطة من تكريم الطالب عمر الحسين":"A moment from the honoring of student Omar Al-Hussein","من تعلُّم البرمجة إلى صناعة أثر حقيقي":"From learning programming to making a real impact","الطالب عمر الحسين صلاح الدين دياب":"Student Omar Al-Hussein Salah El-Din Diab","تفخر مدرسة دراو الثانوية بنين بإنجازات ابنها المتميز عمر، الذي استطاع توظيف ما تعلّمه في البرمجة في تنفيذ مشروع رقمي يعكس إبداعه ومهاراته التقنية، ليكون نموذجًا مشرفًا للطلاب الموهوبين والمبدعين.":"Daraw Boys' Secondary School is proud of the achievements of its outstanding student Omar, who was able to apply what he learned in programming to build a digital project that reflects his creativity and technical skills, setting an honorable example for gifted and creative students.","لقطات من التكريم والتقدير":"Moments from the honoring and appreciation","لقطة من تكريم الطالب":"A moment from the student's honoring","تسليم دبوس الاتحاد":"Presenting the Union pin","تسليم دبوس الاتحاد للأستاذة سحر، الأخصائية الاجتماعية بالمدرسة، تقديرًا لكون أمين اتحاد الطلاب بمدرستنا ممثلًا للطلاب على مستوى المديرية.":"Presenting the Union pin to Ms. Sahar, the school's social specialist, in appreciation of our school's Student Union Secretary representing students at the directorate level.","لقطة من تسليم دبوس الاتحاد للأستاذة سحر":"A moment from presenting the Union pin to Ms. Sahar","القائمة":"Menu","الأخبار":"News","أخبار المدرسة":"School News","آخر ما يخص مدرستنا وطلابنا.":"The latest about our school and students.","خبر":"News","إنجاز طلابي مشرّف بمدرسة دراو الثانوية بنين":"A proud student achievement at Daraw Boys' Secondary School","في حضورٍ يعكس تميّز أبناء المدرسة، التقى الطالب أحمد أسامة كيكي، أمين المدارس بمحافظة أسوان، بالدكتور محمد عبد اللطيف، وزير التربية والتعليم والتعليم الفني، والدكتور مصطفى مدبولي، رئيس مجلس الوزراء، وذلك خلال فعالية بمدينة العلمين الجديدة. تفخر المدرسة بأبنائها المتميزين، وتتمنى لهم دوام النجاح والتوفيق.":"In a presence that reflects the excellence of the school's students, student Ahmed Osama Keki, Schools Secretary of Aswan Governorate, met Dr. Mohamed Abdel Latif, Minister of Education and Technical Education, and Dr. Mostafa Madbouly, Prime Minister, during an event in New Alamein City. The school is proud of its outstanding students and wishes them continued success and prosperity.","{alt}":"A moment from the student's meeting with several officials in New Alamein","داخل الفصل":"Inside the classroom","تسليم شهادة في ساحة المدرسة":"A certificate presentation in the schoolyard","في ساحة المدرسة":"In the schoolyard","الطلاب في ساحة المدرسة":"Students in the schoolyard","نائب المدير":"Deputy Principal","الأستاذ عمر فاروق":"Mr. Omar Farouk","من لحظات المدرسة وأنشطتها":"Moments from school life and activities","دراو بنين الثانوية":"Daraw Boys' Secondary School","المدرسة":"School","رسالتنا":"Our Mission","الإدارة":"Leadership","المعلمون":"Teachers","الخدمات":"Services","المعرض":"Gallery","تواصل معنا":"Contact Us","انزل للأسفل":"Scroll down","العودة للأعلى":"Back to top",
"تأسست عام ١٩٠٤":"Founded in 1904","نبني جيلًا":"We build a generation that is",
"الإبداع":"Creativity","التميز العلمي":"Academic excellence","الأخلاق":"Ethics","الانتماء":"Belonging","الريادة":"Leadership","التحول الرقمي":"Digital transformation",
"عن المدرسة":"About the School","مدرسة دراو بنين الثانوية في دراو بأسوان، تأسست عام ١٩٠٤. نعمل على بناء جيل من الشباب المبدع، والمتميز علميًا وأخلاقيًا، والقادر على مواكبة التحول الرقمي.":"Daraw Boys' Secondary School is in Daraw, Aswan, founded in 1904. We build a generation of creative young people, distinguished in knowledge and character, able to keep pace with digital transformation.",
"عامًا من التعليم":"years of education","١٩٠٤":"1904","سنة التأسيس":"Founded","دراو":"Daraw","أسوان":"Aswan",
"خمسة التزامات لتحقيق رؤيتنا.":"Five commitments to achieve our vision.",
"تطوير التعليم":"Developing Education","تقديم بيئة تعليمية جاذبة ومتطورة تعتمد على الرقمنة والأساليب الحديثة لتنمية مهارات التفكير والابتكار.":"Providing an attractive, advanced learning environment built on digitization and modern methods to develop thinking and innovation skills.",
"رعاية الموهوبين":"Nurturing the Gifted","دعم وتكريم الطلاب المتميزين في شتى المجالات العلمية، والرياضية، ومنصات الثقافة المالية والاستثمار.":"Supporting and honoring outstanding students across science, sports, and platforms for financial literacy and investment.",
"القيم والأخلاق":"Values and Ethics","غرس القيم الأخلاقية، والروح الوطنية، والانتماء لدى الطلاب ليكونوا مواطنين صالحين وقادة في المستقبل.":"Instilling ethical values, patriotism, and belonging so that students become good citizens and future leaders.",
"التنمية المهنية":"Professional Development","الرفع المستمر لكفاءة المعلمين والإداريين لمواكبة أحدث الاستراتيجيات التربوية تحت إشراف الإدارة المدرسية.":"Continuously raising the competence of teachers and administrators to keep up with the latest educational strategies, under school management supervision.",
"المشاركة المجتمعية":"Community Partnership","تفعيل الشراكة الحقيقية بين المدرسة وأولياء الأمور ومجلس الأمناء والمجتمع المحلي لضمان جودة العملية التعليمية.":"Activating a real partnership between the school, parents, the board of trustees, and the local community to ensure educational quality.",
"رؤيتنا":"Our Vision","الريادة في بناء جيل من الشباب المبدع، والمتميز علمياً وأخلاقياً، والقادر على مواكبة التحول الرقمي والمنافسة العالمية بما يخدم مجتمعه ووطنه.":"Leadership in building a generation of creative young people, distinguished in knowledge and ethics, able to keep pace with digital transformation and global competition, in service of their community and nation.",
"إدارة المدرسة":"School Leadership","مدير المدرسة":"School Principal","الأستاذ مصطفى إسماعيل":"Mr. Mostafa Ismail","لافتة مدرسة دراو الثانوية بنين":"Daraw Boys' Secondary School sign","شعارنا":"Our slogan","تخريج شباب مبدع ونافع لوطنه":"Graduating creative youth who serve their nation",
"معلمو المدرسة.":"Our teachers.","الخدمات الرقمية":"Digital Services","أداة صغيرة للطلاب، لأن رؤيتنا مواكبة التحول الرقمي.":"A small tool for students, because our vision is keeping pace with digital transformation.","حاسبة النسبة المئوية":"Percentage Calculator","المادة":"Subject","الدرجة":"Score","من":"Out of","إضافة مادة":"Add subject","مسح":"Clear","المجموع":"Total","النسبة المئوية":"Percentage","مثال: لغة عربية":"e.g. Arabic","اسم المادة":"Subject name","الدرجة النهائية":"Maximum score","٠":"0",
"معرض المدرسة":"School Gallery","المزيد من الصور والفعاليات على صفحة المدرسة في فيسبوك.":"More photos and events on the school's Facebook page.","لقطة جماعية من داخل المدرسة":"Group photo inside the school",
"دراو، أسوان.":"Daraw, Aswan.","صفحة المدرسة على فيسبوك":"School Facebook page","افتح الموقع على الخريطة":"Open on map","دراو، أسوان · ©":"Daraw, Aswan · ©","تصميم وتطوير: عمر الحسين صلاح الدين دياب":"Designed & developed by Omar Al-Hussein Salah El-Din Diab","أقسام الموقع":"Site sections"};
(SITE.news||[]).forEach(n=>{if(!n.en)return;[["title"],["who"],["text"]].forEach(([k])=>{if(n[k]&&n.en[k])EN[n[k]]=n.en[k]})});
Object.assign(EN,{"جدول الحصص":"Class schedule","اختر فصلك لعرض جدول الأسبوع. يوم النهارده متظلّل.":"Choose your class to see the weekly schedule. Today is highlighted.","المواد التعليمية والاختبارات":"Study materials & quizzes","ملخصات وروابط مراجعة واختبارات قصيرة من معلمي المدرسة.":"Summaries, revision links and short quizzes from our teachers.","اختبارات قصيرة":"Short quizzes","التقويم والإعلانات":"Calendar & announcements","أحداث وإعلانات المدرسة القادمة.":"Upcoming school events and announcements.","لوحة الشرف":"Honor board","نفخر بطلابنا المتميزين.":"We are proud of our outstanding students.","رأيك يهمنا":"Your opinion matters","شارك برأيك في استطلاعات المدرسة.":"Share your opinion in school polls.","اقتراحاتك تهمنا":"Your suggestions matter","اكتب اقتراحك أو ملاحظتك عن المدرسة أو الموقع.":"Write your suggestion or feedback about the school or the site.","اسمك (اختياري)":"Your name (optional)","اكتب اقتراحك هنا":"Write your suggestion here","اقتراحك":"Your suggestion","إرسال الاقتراح":"Send suggestion","مساعد دراو":"Daraw Assistant","ردود جاهزة عن المدرسة والموقع":"Ready answers about the school and the site","اكتب سؤالك هنا":"Type your question here","اكتب سؤالك":"Your question","إرسال":"Send","اسأل مساعد المدرسة":"Ask the school assistant","مساعد المدرسة":"School assistant","تبديل الوضع الليلي":"Toggle dark mode"});
Object.assign(EN,{"الرئيسية": "Home", "عن المدرسة": "About the School", "الأخبار": "News", "الدراسة": "Study", "الجداول الدراسية": "Class schedules", "المعلمون": "Teachers", "المكتبة التعليمية": "Learning library", "الحياة المدرسية": "School life", "الأنشطة والفعاليات": "Activities and events", "لوحة الشرف": "Honor board", "المشاركة": "Get involved", "الاقتراحات والاستطلاعات": "Suggestions and polls", "الخدمات الرقمية": "Digital services", "تواصل معنا": "Contact us", "جدول حصص كل فصل على مدار الأسبوع.": "Each class's weekly timetable.", "دليل المعلمين والمواد الدراسية.": "Teachers and their subjects.", "ملخصات وروابط واختبارات قصيرة.": "Summaries, links and short quizzes.", "آخر أخبار المدرسة وطلابها.": "Latest school and student news.", "التقويم والإعلانات ومعرض الصور.": "Calendar, notices and photo gallery.", "تكريم الطلاب المتميزين.": "Recognizing outstanding students.", "شارك برأيك واقتراحك.": "Share your opinion and ideas.", "حاسبة النسبة المئوية للطلاب.": "A percentage calculator for students.", "صفحة المدرسة والموقع على الخريطة.": "School page and map location.", "اعرف المزيد عن المدرسة": "Learn more about the school", "وصول سريع": "Quick access", "كل ما تحتاجه في مكان واحد.": "Everything you need in one place.", "آخر الأخبار": "Latest news", "جارٍ التحميل…": "Loading…", "كل الأخبار": "All news", "الإعلانات والفعاليات القادمة": "Upcoming events and notices", "التقويم والإعلانات": "Calendar and notices", "القائمة الرئيسية": "Main menu", "تخطَّ إلى المحتوى": "Skip to content", "خريطة الموقع": "Site map", "مسار التنقل": "Breadcrumb", "تاريخ المدرسة ورسالتها ورؤيتها وإدارتها.": "History, mission, vision and leadership.", "روابط ذات صلة": "Related pages", "آخر ما يخص مدرستنا وطلابنا.": "The latest about our school and students.", "اختر فصلك لعرض جدول الأسبوع. يوم النهارده متظلّل.": "Choose your class to see the weekly schedule. Today is highlighted.", "القائمة مبنية على الجداول الدراسية المنشورة.": "This list is based on the published class schedules.", "معلمو المدرسة والمواد التي يدرّسونها.": "Our teachers and the subjects they teach.", "ملخصات وروابط مراجعة واختبارات قصيرة من معلمي المدرسة.": "Summaries, revision links and short quizzes from our teachers.", "أحداث وإعلانات المدرسة القادمة.": "Upcoming school events and notices.", "معرض المدرسة": "School Gallery", "المزيد من الصور والفعاليات على صفحة المدرسة في فيسبوك.": "More photos and events on the school’s Facebook page.", "نفخر بطلابنا المتميزين.": "We are proud of our outstanding students.", "رأيك يهمنا": "Your opinion matters", "شارك برأيك في استطلاعات المدرسة.": "Take part in the school polls.", "اقتراحاتك تهمنا": "Your suggestions matter", "اكتب اقتراحك أو ملاحظتك عن المدرسة أو الموقع.": "Write your suggestion or feedback about the school or the site.", "المشاركة المجتمعية: استطلاعات واقتراحات.": "Community participation: polls and suggestions.", "أداة صغيرة للطلاب، لأن رؤيتنا مواكبة التحول الرقمي.": "A small tool for students, because our vision is keeping pace with digital change.", "العنوان:": "Address:", "لإرسال اقتراح أو ملاحظة استخدم صفحة": "To send a suggestion or feedback use the page", "دراو، أسوان.": "Daraw, Aswan."});
const orig=new WeakMap(),AT=["alt","aria-label","placeholder"];
function walk(en){
  const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
  while(n=w.nextNode()){
    if(n.parentElement.closest("script,style"))continue;
    if(!orig.has(n)){const t=n.nodeValue.trim();if(!(t in EN))continue;orig.set(n,n.nodeValue)}
    const o=orig.get(n),t=o.trim();n.nodeValue=en?o.replace(t,EN[t]):o}
  document.querySelectorAll("[alt],[aria-label],[placeholder]").forEach(el=>AT.forEach(a=>{
    const v=el.getAttribute(a);if(v===null)return;const o=orig.get(el)||{},k=a in o?o[a]:v;if(!(k in EN))return;
    o[a]=k;orig.set(el,o);el.setAttribute(a,en?EN[k]:k)}))}
const dig=s=>root.lang==="en"?s.replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d)):s.replace(/[0-9]/g,d=>"٠١٢٣٤٥٦٧٨٩"[d]);
function setLang(en){
  root.lang=en?"en":"ar";root.dir=en?"ltr":"rtl";
  {const bd=document.body.dataset;document.title=en?(bd.te?bd.te+" | ":"")+"Daraw Boys' Secondary School":(bd.ta?bd.ta+" | ":"")+"دراو بنين الثانوية"}
  drawAll();walk(en);renderDates();if(yrs)yrs.textContent=fmt(age);$("#yr").textContent=" "+fmt(y);setW();
  if(rows){rows.querySelectorAll(".s,.x").forEach(i=>i.value=dig(i.value));calc()}
  document.querySelectorAll("#lang,#lang2").forEach(b=>{b.textContent=en?"عربي":"EN";b.setAttribute("aria-label",en?"التبديل إلى العربية":"Switch to English")})}
document.querySelectorAll("#lang,#lang2").forEach(b=>b.onclick=()=>setLang(root.lang!=="en"));
if(new URLSearchParams(location.search).get("lang")==="en")setLang(true);
/* ===== التقويم + لوحة الشرف + الاستطلاعات (من قاعدة البيانات) ===== */
var AG=[],HN=[],PL=[],MT="",VM={};
const dayN=d=>Math.round((new Date(d+"T00:00:00")-new Date(new Date().toDateString()))/864e5);
const rEN=(e,o,ks)=>{if(e)ks.forEach(k=>{if(o[k]&&e[k])EN[o[k]]=e[k]})};
async function getJ(u){const r=await fetch(u,{headers:{Accept:"application/json"}});if(!r.ok)throw 0;return (await r.json()).items}
function drawAgenda(){const box=$("#agc");if(!box)return;box.replaceChildren();const ev=AG.filter(x=>x.kind==="event"&&dayN(x.date)>=0),no=AG.filter(x=>x.kind==="notice");setEmpty("agc",!(ev.length||no.length));
 if(ev.length){const n=dayN(ev[0].date),c=mk("div","cd");c.append(mk("small","",L("أقرب حدث","Next event")),mk("b","",ev[0].title),mk("span","",n===0?L("النهارده","Today"):n===1?L("بكرة","Tomorrow"):L("بعد "+fmt(n)+" يوم","In "+n+" days")));box.append(c)}
 const row=(x,nt)=>{const r=mk("div","ai"+(nt?" nt":"")),d=mk("time","ad"),t=mk("div");d.textContent=nt?"📢":new Date(x.date+"T00:00:00").toLocaleDateString(loc(),{day:"numeric",month:"short"});t.append(mk("b","",x.title));if(x.body)t.append(mk("p","",x.body));r.append(d,t);box.append(r)};
 const mx=+box.dataset.max||99;ev.slice(0,mx).forEach(x=>row(x,0));no.slice(0,mx).forEach(x=>row(x,1))}
function drawHonor(){const g=$("#hgrid");if(!g)return;g.replaceChildren();setEmpty("hgrid",!HN.length);HN.forEach(x=>{const c=mk("div","hc");if(x.image){const i=mk("img");i.src=x.image;i.alt=x.name;i.loading="lazy";c.append(i)}else c.append(mk("div","hi",[...x.name][0]||"★"));c.append(mk("b","",x.name));if(x.achievement)c.append(mk("p","",x.achievement));g.append(c)})}
const tok=()=>{try{let t=localStorage.getItem("vt");if(!t){t=[...crypto.getRandomValues(new Uint8Array(16))].map(b=>b.toString(36).padStart(2,"0")).join("").slice(0,24).padEnd(16,"a");localStorage.setItem("vt",t)}return t}catch(e){return MT||(MT=Math.random().toString(36).slice(2).padEnd(16,"x"))}};
const voted=id=>{try{return localStorage.getItem("v"+id)==="1"}catch(e){return!!VM[id]}};
function drawPolls(){const g=$("#pgrid");if(!g)return;g.replaceChildren();setEmpty("pgrid",!PL.length);PL.forEach(p=>{const c=mk("div","pc"),done=voted(p.id),tot=p.counts.reduce((a,b)=>a+b,0);c.append(mk("h3","",p.question));
 p.options.forEach((o,i)=>{if(done){const r=mk("div","pr"),pc=tot?Math.round(p.counts[i]*100/tot):0,bar=mk("i");bar.style.width=pc+"%";r.append(bar,mk("span","",o),mk("b","",fmt(pc)+"%"));c.append(r)}else{const b=mk("button","po",o);b.type="button";b.onclick=()=>vote(p.id,i);c.append(b)}});
 c.append(mk("small","",done?L("إجمالي الأصوات: ","Total votes: ")+fmt(tot):L("اختر إجابة واحدة","Choose one answer")));g.append(c)})}
function drawAll(){try{drawAgenda();drawHonor();drawPolls();drawLearn();drawSched();drawTeachers()}catch(e){}}
async function vote(id,i){try{const r=await fetch("/api/vote",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({poll:id,opt:i,token:tok()})});if(r.ok){try{localStorage.setItem("v"+id,"1")}catch(e){VM[id]=1}}await loadPolls()}catch(e){}}
const gl=()=>{if(root.lang==="en")walk(true)};
async function loadAgenda(){try{AG=await getJ("/api/agenda");AG.forEach(x=>rEN(x.en,x,["title","body"]));LD.agc=1;drawAgenda();gl()}catch(e){LD.agc=2;setEmpty("agc",1)}}
async function loadHonor(){try{HN=await getJ("/api/honor");HN.forEach(x=>rEN(x.en,x,["name","achievement"]));LD.hgrid=1;drawHonor();gl()}catch(e){LD.hgrid=2;setEmpty("hgrid",1)}}
async function loadPolls(){try{PL=await getJ("/api/polls");PL.forEach(p=>{rEN(p.en,p,["question"]);((p.en||{}).options||[]).forEach((e,i)=>{if(e&&p.options[i])EN[p.options[i]]=e})});LD.pgrid=1;drawPolls();gl()}catch(e){if(!PL.length){LD.pgrid=2;setEmpty("pgrid",1)}}}
setInterval(()=>{if(!document.hidden&&PL.length)loadPolls()},20000);
/* ===== المواد التعليمية والاختبارات ===== */
var LM=[],LQ=[],LG="all",LS="";
const GRN={"0":"كل الصفوف","1":"الصف الأول","2":"الصف الثاني","3":"الصف الثالث"},KIC={video:"🎥",pdf:"📄",link:"🔗"};
function drawLearn(){const f=$("#lf");if(!f)return;setEmpty("lf",!(LM.length||LQ.length));f.replaceChildren();
 const chip=(l,on,fn)=>{const b=mk("button",on?"on":"",l);b.type="button";b.onclick=fn;f.append(b)};
 [["all",L("كل الصفوف","All grades")],["1",L("الصف الأول","Grade 1")],["2",L("الصف الثاني","Grade 2")],["3",L("الصف الثالث","Grade 3")]].forEach(([v,l])=>chip(l,LG===v,()=>{LG=v;drawLearn()}));
 const subs=[...new Set([...LM,...LQ].map(x=>x.subject).filter(Boolean))];if(subs.length){chip(L("كل المواد","All subjects"),!LS,()=>{LS="";drawLearn()});subs.forEach(s=>chip(s,LS===s,()=>{LS=s;drawLearn()}))}
 const ok=x=>(LG==="all"||x.grade==="0"||x.grade===LG)&&(!LS||x.subject===LS),m=$("#lm"),q=$("#lq");m.replaceChildren();q.replaceChildren();
 LM.filter(ok).forEach(x=>{const r=mk("div","ai"),i=mk("div","ad",KIC[x.kind]||"🔗"),d=mk("div");d.append(mk("b","",x.title));d.append(mk("p","",[x.subject,GRN[x.grade],x.teacher_name].filter(Boolean).join(" · ")));if(x.note)d.append(mk("p","",x.note));
  const a=mk("a","mlink",L("افتح","Open"));a.href=x.url;a.target="_blank";a.rel="noopener noreferrer";d.append(a);r.append(i,d);m.append(r)});
 const qs=LQ.filter(ok);$("#lqh").hidden=!qs.length;
 qs.forEach(x=>{const c=mk("div","pc");c.append(mk("h3","",x.title),mk("small","",[x.subject,GRN[x.grade],fmt(x.count)+" "+L("أسئلة","questions")].filter(Boolean).join(" · ")));const b=mk("button","bt",L("ابدأ الاختبار","Start quiz"));b.type="button";b.onclick=()=>openQuiz(x.id);c.append(b);q.append(c)})}
async function openQuiz(id){try{const d=$("#qd"),z=await (await fetch("/api/quizzes/"+id)).json();d.replaceChildren(mk("h3","",z.title));
 const f=mk("form");z.questions.forEach((q,i)=>{const s=mk("fieldset"),g=mk("legend","",fmt(i+1)+". "+q.q);s.append(g);q.options.forEach((o,k)=>{const l=mk("label"),r=mk("input");r.type="radio";r.name="q"+i;r.value=k;l.append(r,document.createTextNode(" "+o));s.append(l)});f.append(s)});
 const out=mk("p","",""),go=mk("button","bt",L("إرسال الإجابات","Submit answers")),cl=mk("button","bt",L("إغلاق","Close"));go.type="submit";cl.type="button";cl.style.background="var(--muted)";cl.onclick=()=>d.close();
 f.onsubmit=async e=>{e.preventDefault();const a=z.questions.map((q,i)=>{const c=f.querySelector('input[name="q'+i+'"]:checked');return c?+c.value:-1});
  try{const r=await (await fetch("/api/quizzes/"+id+"/submit",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({answers:a})})).json();if(r.score==null)throw 0;
   out.textContent=L("نتيجتك: ","Your score: ")+fmt(r.score)+L(" من "," of ")+fmt(r.total)+" ("+fmt(Math.round(r.score*100/r.total))+"%)";out.style.fontWeight="700";go.hidden=true;
   f.querySelectorAll("fieldset").forEach((s,i)=>{s.querySelectorAll("label").forEach((l,k)=>{l.classList.remove("ok","bad");if(k===r.results[i].correct)l.classList.add("ok");else if(k===r.results[i].chosen)l.classList.add("bad")});s.querySelectorAll("input").forEach(x=>x.disabled=true)})}catch(x){out.textContent=L("تعذّر إرسال الإجابات، حاول تاني.","Could not submit, please try again.")}};
 f.append(out,go);d.append(f,cl);d.showModal()}catch(e){}}
async function loadLearn(){try{LM=await getJ("/api/materials");LQ=await getJ("/api/quizzes");LD.lf=1;drawLearn()}catch(e){LD.lf=2;setEmpty("lf",1)}}
/* ===== جدول الحصص + عدّاد زيارات بسيط (بدون بيانات شخصية) ===== */
var SC=[],SG="";
const DN=[["السبت","Sat"],["الأحد","Sun"],["الاثنين","Mon"],["الثلاثاء","Tue"],["الأربعاء","Wed"],["الخميس","Thu"]];
function drawSched(){const f=$("#sf");if(!f)return;setEmpty("sf",!SC.length);f.replaceChildren();const g=[...new Set(SC.map(x=>x.grp))];if(!g.includes(SG))SG=g[0]||"";
 g.forEach(n=>{const b=mk("button",n===SG?"on":"",n);b.type="button";b.onclick=()=>{SG=n;drawSched()};f.append(b)});
 const w=$("#sw");w.replaceChildren();if(!SG)return;const rows=SC.filter(x=>x.grp===SG),mp=Math.max(5,...rows.map(x=>x.period)),tb=mk("table","st"),hd=mk("tr");hd.append(mk("th","",L("اليوم","Day")));for(let p=1;p<=mp;p++)hd.append(mk("th","",L("الحصة ","P")+fmt(p)));tb.append(hd);
 const today=(new Date().getDay()+1)%7;DN.forEach((D,d)=>{if(!rows.some(x=>x.day===d))return;const tr=mk("tr",d===today?"td":"");tr.append(mk("th","",L(D[0],D[1])));for(let p=1;p<=mp;p++){const c=rows.find(x=>x.day===d&&x.period===p),td=mk("td");if(c){td.append(mk("b","",c.subject));if(c.teacher)td.append(mk("small","",c.teacher))}else td.textContent="—";tr.append(td)}tb.append(tr)});w.append(tb)}
async function loadSched(){try{SC=await getJ("/api/schedule");LD.sf=1;drawSched();drawTeachers();gl()}catch(e){LD.sf=2;setEmpty("sf",1);setEmpty("tgrid",1)}}
try{if(!sessionStorage.getItem("hv")){sessionStorage.setItem("hv","1");fetch("/api/hit",{method:"POST",headers:{"content-type":"application/json"},body:'{"k":"visit"}',keepalive:true}).catch(()=>{})}}catch(e){}
function hitBot(e){try{fetch("/api/hit",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({k:"bot",t:e?e.k[0]:"unknown"}),keepalive:true}).catch(()=>{})}catch(x){}}

/* ===== v8: متعدد الصفحات ===== */
const PG={about:"about.html#about",mission:"about.html#mission",people:"about.html#people",news:"news.html",tools:"services.html",gallery:"activities.html#gallery",suggest:"community.html#suggest",contact:"contact.html",sched:"schedule.html",learn:"library.html",teachers:"teachers.html"};
function goTo(g){const el=document.getElementById(g);if(el)el.scrollIntoView({behavior:still?"auto":"smooth"});else location.href=PG[g]||"/"}
function setEmpty(k,on){const e=document.getElementById("e-"+k);if(!e)return;const st=LD[LK[k]||k];if(!st)return;e.hidden=!on;if(on)e.textContent=st===2?L("تعذّر التحميل الآن، حاول لاحقًا.","Couldn't load right now. Please try again later."):L(e.dataset.ar,e.dataset.en)}
function newsEmpty(){document.querySelectorAll("[data-news]").forEach(c=>setEmpty(c.id,!c.querySelector("article.news")))}
var TS="";
function drawTeachers(){const g=$("#tgrid");if(!g)return;g.replaceChildren();const f=$("#tf");if(f)f.replaceChildren();
 const m=new Map();SC.forEach(x=>{const t=(x.teacher||"").trim(),s=(x.subject||"").trim();if(!t||!s||t.includes("/")||s.includes("/")||s==="أنشطة")return;let o=m.get(t);if(!o){o={n:t,s:new Set(),p:0};m.set(t,o)}o.s.add(s);o.p++});
 const all=[...m.values()].sort((a,b)=>a.n.localeCompare(b.n,"ar")),subs=[...new Set(all.flatMap(o=>[...o.s]))].sort((a,b)=>a.localeCompare(b,"ar"));
 if(TS&&!subs.includes(TS))TS="";
 if(f&&subs.length){const chip=(l,on,fn)=>{const b=mk("button",on?"on":"",l);b.type="button";b.onclick=fn;f.append(b)};chip(L("كل المواد","All subjects"),!TS,()=>{TS="";drawTeachers()});subs.forEach(s=>chip(s,TS===s,()=>{TS=s;drawTeachers()}))}
 const list=all.filter(o=>!TS||o.s.has(TS));setEmpty("tgrid",!list.length);
 list.forEach(o=>{const c=mk("article","tc");c.append(mk("div","hi",[...o.n][0]||"★"),mk("h3","",o.n),mk("p","",[...o.s].join(" · ")),mk("small","",fmt(o.p)+" "+L("حصة أسبوعيًا","periods per week")));g.append(c)})}
(function(){const n=document.getElementById("mainnav");if(!n)return;
 const norm=p=>{p=p.replace(/\/+$/,"").replace(/\.html$/,"").replace(/^\//,"");return p||"index"},cur=norm(location.pathname);
 n.querySelectorAll("a").forEach(a=>{const h=a.getAttribute("href").split("#")[0];if(norm(h)===cur){a.setAttribute("aria-current","page");const g=a.closest(".dg");if(g)g.querySelector(".dt").classList.add("cur")}});
 const dts=[...n.querySelectorAll(".dt")],close=()=>dts.forEach(b=>{b.setAttribute("aria-expanded","false");b.parentElement.classList.remove("open")});
 dts.forEach(b=>b.onclick=e=>{e.stopPropagation();const o=b.getAttribute("aria-expanded")==="true";close();if(!o){b.setAttribute("aria-expanded","true");b.parentElement.classList.add("open")}});
 document.addEventListener("click",e=>{if(!e.target.closest(".dg"))close()});addEventListener("keydown",e=>{if(e.key==="Escape")close()});
 if(document.body.dataset.p==="home"){const m={"#about":"about.html#about","#mission":"about.html#mission","#people":"about.html#people","#news":"news.html","#tools":"services.html","#gallery":"activities.html#gallery","#suggest":"community.html#suggest","#contact":"contact.html","#teachers":"teachers.html","#sched":"schedule.html","#learn":"library.html","#agenda":"activities.html","#honor":"honor.html","#polls":"community.html"};if(m[location.hash])location.replace(m[location.hash])}
})();
const LDR={news:loadNews,agenda:loadAgenda,honor:loadHonor,polls:loadPolls,learn:loadLearn,sched:loadSched};(document.body.dataset.need||"").split(" ").forEach(k=>LDR[k]&&LDR[k]());
if("serviceWorker"in navigator)addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}));
