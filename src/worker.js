// Worker: واجهة API + قاعدة بيانات D1 لموقع مدرسة دراو بنين الثانوية
const SEED=[
 {
  "title": "من تعلُّم البرمجة إلى صناعة أثر حقيقي",
  "who": "الطالب عمر الحسين صلاح الدين دياب",
  "body": "تفخر مدرسة دراو الثانوية بنين بإنجازات ابنها المتميز عمر، الذي استطاع توظيف ما تعلّمه في البرمجة في تنفيذ مشروع رقمي يعكس إبداعه ومهاراته التقنية، ليكون نموذجًا مشرفًا للطلاب الموهوبين والمبدعين.",
  "images": [
   "/images/news-01.webp",
   "/images/news-02.webp",
   "/images/news-03.webp",
   "/images/news-04.webp"
  ]
 },
 {
  "title": "إنجاز طلابي مشرّف بمدرسة دراو الثانوية بنين",
  "who": "",
  "body": "في حضورٍ يعكس تميّز أبناء المدرسة، التقى الطالب أحمد أسامة كيكي، أمين المدارس بمحافظة أسوان، بالدكتور محمد عبد اللطيف، وزير التربية والتعليم والتعليم الفني، والدكتور مصطفى مدبولي، رئيس مجلس الوزراء، وذلك خلال فعالية بمدينة العلمين الجديدة. تفخر المدرسة بأبنائها المتميزين، وتتمنى لهم دوام النجاح والتوفيق.",
  "images": [
   "/images/news-05.webp",
   "/images/news-06.webp",
   "/images/news-07.webp",
   "/images/news-08.webp"
  ]
 },
 {
  "title": "تسليم دبوس الاتحاد",
  "who": "",
  "body": "تسليم دبوس الاتحاد للأستاذة سحر، الأخصائية الاجتماعية بالمدرسة، تقديرًا لكون أمين اتحاد الطلاب بمدرستنا ممثلًا للطلاب على مستوى المديرية.",
  "images": [
   "/images/news-honor.webp"
  ]
 }
];
/* جدول الحصص الأولي (أيام: 0 السبت، 1 الأحد، 2 الاثنين، 3 الثلاثاء، 4 الأربعاء) — يمكن تعديله من لوحة الإدارة */
const SCH=[["فصل 1/1",0,1,"علوم متكاملة","هبة صلاح"],["فصل 1/1",0,2,"لغة فرنسية","نصر حسانين"],["فصل 1/1",0,3,"تاريخ","هبة مكي"],["فصل 1/1",0,4,"رياضيات","هناء منصور"],["فصل 1/1",0,5,"فلسفة","فيبي"],["فصل 1/1",0,6,"فلسفة","فيبي"],["فصل 1/1",0,7,"أنشطة","منتهى / رحاب / ترمين"],["فصل 2/1",0,1,"تربية دينية","ربيع محمود"],["فصل 2/1",0,2,"لغة انجليزية","محمد محمود"],["فصل 2/1",0,3,"فلسفة","فيبي"],["فصل 2/1",0,4,"رياضيات","ناصر عبدالراضي"],["فصل 2/1",0,5,"تاريخ","هبة مكي"],["فصل 2/1",0,6,"علوم متكاملة","هبة صلاح"],["فصل 2/1",0,7,"أنشطة","منتهى / رحاب / ترمين"],["فصل 3/1",0,1,"تربية دينية","وفاء صالح / عفاف"],["فصل 3/1",0,2,"تربية دينية","وفاء صالح / عفاف"],["فصل 3/1",0,3,"رياضيات","ناصر عبدالراضي"],["فصل 3/1",0,4,"برمجة","محمود عبدالوهاب"],["فصل 3/1",0,5,"علوم متكاملة","ريهام صالح"],["فصل 3/1",0,6,"تاريخ","مروة الليثي"],["فصل 3/1",0,7,"أنشطة","منتهى / رحاب / ترمين"],["فصل 4/1 خدمات",0,1,"تاريخ","هبة مكي"],["فصل 4/1 خدمات",0,2,"لغة عربية","صفاء سعد"],["فصل 4/1 خدمات",0,3,"رياضيات","هناء منصور"],["فصل 4/1 خدمات",0,4,"لغة فرنسية","صلاح محمد"],["فصل 4/1 خدمات",0,5,"فلسفة","أحمد سيد"],["فصل 4/1 خدمات",0,6,"علوم متكاملة","صلاح حامد"],["فصل 1/2",0,1,"لغة عربية","صفاء سعد"],["فصل 1/2",0,2,"تاريخ","هبة مكي"],["فصل 1/2",0,3,"لغة انجليزية","عبدالعليم سيد"],["فصل 1/2",0,4,"فيزياء","صلاح حامد"],["فصل 1/2",0,5,"فيزياء","صلاح حامد"],["فصل 2/2",0,1,"تاريخ","مروة الليثي"],["فصل 2/2",0,2,"رياضيات / كيمياء / علم نفس / برمجة","ناصر / ريهام / سعاد / محمود عبدالوهاب"],["فصل 2/2",0,3,"لغة عربية","ربيع محمود"],["فصل 2/2",0,4,"لغة انجليزية","محمد محمود"],["فصل 2/2",0,5,"ثقافة مالية","محمود عبدالوهاب"],["فصل 3/2",0,1,"لغة انجليزية","محمد محمود"],["فصل 3/2",0,2,"فيزياء / إدارة أعمال","صلاح حامد / هناء منصور"],["فصل 3/2",0,3,"لغة عربية","وفاء صالح"],["فصل 3/2",0,4,"تاريخ","مروة الليثي"],["فصل 3/2",0,5,"تاريخ","مروة الليثي"],["فصل 1/1",1,1,"رياضيات","هناء منصور"],["فصل 1/1",1,2,"برمجة","وداد عبدالرحيم"],["فصل 1/1",1,3,"لغة انجليزية","روماني جندي"],["فصل 1/1",1,4,"علوم متكاملة","هبة صلاح"],["فصل 1/1",1,5,"تاريخ","هبة مكي"],["فصل 1/1",1,6,"برمجة","وداد عبدالرحيم"],["فصل 2/1",1,1,"لغة عربية","ربيع محمود"],["فصل 2/1",1,2,"فلسفة","فيبي"],["فصل 2/1",1,3,"لغة انجليزية","محمد محمود"],["فصل 2/1",1,4,"لغة فرنسية","صلاح محمد"],["فصل 2/1",1,5,"علوم متكاملة","هبة صلاح"],["فصل 2/1",1,6,"رياضيات","ناصر عبدالراضي"],["فصل 3/1",1,1,"برمجة","محمود عبدالوهاب"],["فصل 3/1",1,2,"لغة انجليزية","روماني جندي"],["فصل 3/1",1,3,"رياضيات","ناصر عبدالراضي"],["فصل 3/1",1,4,"فلسفة","فيبي"],["فصل 3/1",1,5,"فلسفة","فيبي"],["فصل 3/1",1,6,"لغة عربية","وفاء صالح"],["فصل 4/1 خدمات",1,1,"علوم متكاملة","صلاح حامد"],["فصل 4/1 خدمات",1,2,"رياضيات","هناء منصور"],["فصل 4/1 خدمات",1,3,"تاريخ","هبة مكي"],["فصل 4/1 خدمات",1,4,"لغة انجليزية","روماني جندي"],["فصل 4/1 خدمات",1,5,"فلسفة","أحمد سيد"],["فصل 1/2",1,1,"تاريخ","هبة مكي"],["فصل 1/2",1,2,"لغة عربية","صفاء سعد"],["فصل 1/2",1,3,"ثقافة مالية","وداد عبدالرحيم"],["فصل 1/2",1,4,"لغة انجليزية","عبدالعليم سيد"],["فصل 1/2",1,5,"فيزياء","صلاح حامد"],["فصل 2/2",1,1,"لغة عربية","كوثر أحمد"],["فصل 2/2",1,2,"تاريخ","مروة الليثي"],["فصل 2/2",1,3,"ثقافة مالية","محمود عبدالوهاب"],["فصل 2/2",1,4,"لغة انجليزية","محمد محمود"],["فصل 2/2",1,5,"رياضيات / كيمياء / علم نفس / برمجة","ناصر / ريهام / سعاد / محمود عبدالوهاب"],["فصل 3/2",1,1,"لغة عربية","وفاء صالح"],["فصل 3/2",1,2,"لغة انجليزية","محمد محمود"],["فصل 3/2",1,3,"فيزياء / إدارة أعمال","صلاح حامد / هناء منصور"],["فصل 3/2",1,4,"ثقافة مالية","محمود عبدالوهاب"],["فصل 3/2",1,5,"تاريخ","مروة الليثي"],["فصل 1/1",2,1,"علوم متكاملة","هبة صلاح"],["فصل 1/1",2,2,"لغة عربية","ربيع محمود"],["فصل 1/1",2,3,"لغة عربية","ربيع محمود"],["فصل 1/1",2,4,"رياضيات","هناء منصور"],["فصل 1/1",2,5,"فلسفة","فيبي"],["فصل 2/1",2,1,"لغة عربية","ربيع محمود"],["فصل 2/1",2,2,"رياضيات","ناصر عبدالراضي"],["فصل 2/1",2,3,"فلسفة","فيبي"],["فصل 2/1",2,4,"لغة انجليزية","محمد محمود"],["فصل 2/1",2,5,"تاريخ","هبة مكي"],["فصل 3/1",2,1,"لغة عربية","وفاء صالح"],["فصل 3/1",2,2,"تاريخ","مروة الليثي"],["فصل 3/1",2,3,"رياضيات","ناصر عبدالراضي"],["فصل 3/1",2,4,"فلسفة","فيبي"],["فصل 3/1",2,5,"علوم متكاملة","ريهام صالح"],["فصل 4/1 خدمات",2,1,"لغة عربية","صفاء سعد"],["فصل 4/1 خدمات",2,2,"علوم متكاملة","صلاح حامد"],["فصل 4/1 خدمات",2,3,"فلسفة","أحمد سيد"],["فصل 4/1 خدمات",2,4,"تاريخ","هبة مكي"],["فصل 4/1 خدمات",2,5,"رياضيات","هناء منصور"],["فصل 1/2",2,1,"لغة انجليزية","عبدالعليم سيد"],["فصل 1/2",2,2,"تاريخ","هبة مكي"],["فصل 1/2",2,3,"لغة عربية","صفاء سعد"],["فصل 1/2",2,4,"فيزياء","صلاح حامد"],["فصل 2/2",2,1,"لغة انجليزية","محمد محمود"],["فصل 2/2",2,2,"لغة عربية","كوثر أحمد"],["فصل 2/2",2,3,"تاريخ","مروة الليثي"],["فصل 2/2",2,4,"رياضيات / كيمياء / برمجة","ناصر / ريهام / محمود عبدالوهاب"],["فصل 3/2",2,1,"تاريخ","مروة الليثي"],["فصل 3/2",2,2,"لغة انجليزية","محمد محمود"],["فصل 3/2",2,3,"فيزياء / إدارة أعمال","صلاح حامد / هناء منصور"],["فصل 3/2",2,4,"لغة عربية","وفاء صالح"],["فصل 1/1",3,1,"لغة انجليزية","روماني جندي"],["فصل 1/1",3,2,"لغة انجليزية","روماني جندي"],["فصل 1/1",3,3,"علوم متكاملة","هبة صلاح"],["فصل 1/1",3,4,"لغة عربية","ربيع محمود"],["فصل 1/1",3,5,"رياضيات","هناء منصور"],["فصل 2/1",3,1,"علوم متكاملة","هبة صلاح"],["فصل 2/1",3,2,"لغة فرنسية","صلاح محمد"],["فصل 2/1",3,3,"تاريخ","هبة مكي"],["فصل 2/1",3,4,"رياضيات","ناصر عبدالراضي"],["فصل 2/1",3,5,"لغة عربية","ربيع محمود"],["فصل 3/1",3,1,"لغة انجليزية","روماني جندي"],["فصل 3/1",3,2,"برمجة","محمود عبدالوهاب"],["فصل 3/1",3,3,"لغة عربية","وفاء صالح"],["فصل 3/1",3,4,"لغة فرنسية","صلاح محمد"],["فصل 3/1",3,5,"تاريخ","مروة الليثي"],["فصل 4/1 خدمات",3,1,"لغة فرنسية","صلاح محمد"],["فصل 4/1 خدمات",3,2,"لغة انجليزية","روماني جندي"],["فصل 4/1 خدمات",3,3,"لغة عربية","صفاء سعد"],["فصل 4/1 خدمات",3,4,"فلسفة","أحمد سيد"],["فصل 1/2",3,1,"تاريخ","هبة مكي"],["فصل 1/2",3,2,"لغة انجليزية","عبدالعليم سيد"],["فصل 1/2",3,3,"لغة عربية","صفاء سعد"],["فصل 1/2",3,4,"فيزياء","صلاح حامد"],["فصل 2/2",3,1,"لغة عربية","كوثر أحمد"],["فصل 2/2",3,2,"لغة انجليزية","محمد محمود"],["فصل 2/2",3,3,"رياضيات / كيمياء / برمجة","ناصر / ريهام / محمود عبدالوهاب"],["فصل 2/2",3,4,"تاريخ","مروة الليثي"],["فصل 3/2",3,1,"فيزياء / إدارة أعمال","صلاح حامد / هناء منصور"],["فصل 3/2",3,2,"لغة عربية","وفاء صالح"],["فصل 3/2",3,3,"لغة انجليزية","محمد محمود"],["فصل 1/1",4,1,"برمجة","وداد عبدالرحيم"],["فصل 1/1",4,2,"برمجة","وداد عبدالرحيم"],["فصل 1/1",4,3,"لغة فرنسية","نصر حسانين"],["فصل 1/1",4,4,"لغة انجليزية","روماني جندي"],["فصل 1/1",4,5,"علوم متكاملة","هبة صلاح"],["فصل 2/1",4,1,"لغة عربية","ربيع محمود"],["فصل 2/1",4,2,"رياضيات","ناصر عبدالراضي"],["فصل 2/1",4,3,"لغة انجليزية","محمد محمود"],["فصل 2/1",4,4,"علوم متكاملة","هبة صلاح"],["فصل 2/1",4,5,"تاريخ","هبة مكي"],["فصل 3/1",4,1,"علوم متكاملة","ريهام صالح"],["فصل 3/1",4,2,"لغة انجليزية","روماني جندي"],["فصل 3/1",4,3,"رياضيات","ناصر عبدالراضي"],["فصل 3/1",4,4,"لغة عربية","وفاء صالح"],["فصل 3/1",4,5,"تاريخ","مروة الليثي"],["فصل 4/1 خدمات",4,1,"لغة انجليزية","روماني جندي"],["فصل 4/1 خدمات",4,2,"لغة عربية","صفاء سعد"],["فصل 4/1 خدمات",4,3,"علوم متكاملة","صلاح حامد"],["فصل 4/1 خدمات",4,4,"رياضيات","هناء منصور"],["فصل 4/1 خدمات",4,5,"فلسفة","أحمد سيد"],["فصل 1/2",4,1,"لغة عربية","صفاء سعد"],["فصل 1/2",4,2,"تاريخ","هبة مكي"],["فصل 1/2",4,3,"لغة انجليزية","عبدالعليم سيد"],["فصل 1/2",4,4,"ثقافة مالية","وداد عبدالرحيم"],["فصل 2/2",4,1,"لغة انجليزية","محمد محمود"],["فصل 2/2",4,2,"لغة عربية","ربيع محمود"],["فصل 2/2",4,3,"تاريخ","مروة الليثي"],["فصل 2/2",4,4,"رياضيات / كيمياء / برمجة","ناصر / ريهام / محمود عبدالوهاب"],["فصل 3/2",4,1,"فيزياء / إدارة أعمال","صلاح حامد / هناء منصور"],["فصل 3/2",4,2,"لغة انجليزية","محمد محمود"],["فصل 3/2",4,3,"لغة عربية","وفاء صالح"],["فصل 3/2",4,4,"تاريخ","مروة الليثي"]];
const J=(o,s=200,h={})=>new Response(JSON.stringify(o),{status:s,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff",...h}});
const enc=new TextEncoder(),hex=u=>[...u].map(b=>b.toString(16).padStart(2,"0")).join("");
const pj=(x,d)=>{try{return JSON.parse(x)}catch(e){return d}};
const s=(v,n)=>typeof v==="string"?v.trim().slice(0,n):"";
async function hmac(key,msg){const k=await crypto.subtle.importKey("raw",enc.encode(key),{name:"HMAC",hash:"SHA-256"},false,["sign"]);return new Uint8Array(await crypto.subtle.sign("HMAC",k,enc.encode(msg)))}
async function same(a,b){const[x,y]=await Promise.all([hmac("cmp",a),hmac("cmp",b)]);let d=0;for(let i=0;i<x.length;i++)d|=x[i]^y[i];return d===0}
const key=env=>env.SESSION_SECRET||env.ADMIN_PASSWORD||"";
async function token(env,role){const p=role+"."+(Date.now()+288e5);return p+"."+hex(await hmac(key(env),p))}
async function roleOf(req,env){const m=/(?:^|; )sess=([^;]+)/.exec(req.headers.get("cookie")||"");if(!m||!key(env))return null;const[r,e,g]=m[1].split(".");if(!g||+e<Date.now()||(r!=="admin"&&r!=="viewer"&&!/^t\d+$/.test(r)))return null;
 if(!await same(g,hex(await hmac(key(env),r+"."+e))))return null;if(r[0]!=="t")return{role:r};
 const t=await env.DB.prepare("SELECT id,name,active FROM teachers WHERE id=?").bind(+r.slice(1)).first();return t&&t.active?{role:"teacher",tid:t.id,name:t.name}:null}
const hashCode=async c=>hex(new Uint8Array(await crypto.subtle.digest("SHA-256",enc.encode("daraw:"+c))));
const normCode=c=>String(c||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
function newCode(){const A="ABCDEFGHJKMNPQRSTUVWXYZ23456789",r=crypto.getRandomValues(new Uint8Array(12));const c=[...r].map(b=>A[b%A.length]).join("");return c.slice(0,4)+"-"+c.slice(4,8)+"-"+c.slice(8)}
const ipid=async(req,env)=>hex(await hmac(key(env)||"x",req.headers.get("cf-connecting-ip")||"local")).slice(0,16);
async function limited(DB,kind,ip,max,win){await DB.prepare("DELETE FROM events WHERE ts<?").bind(Date.now()-864e5).run();const r=await DB.prepare("SELECT COUNT(*) c FROM events WHERE kind=? AND ip=? AND ts>?").bind(kind,ip,Date.now()-win).first();return r.c>=max}
const hit=(DB,kind,ip)=>DB.prepare("INSERT INTO events(kind,ip,ts) VALUES(?,?,?)").bind(kind,ip,Date.now()).run();
let ready=false;
async function init(DB){if(ready)return;
 await DB.batch([
  DB.prepare("CREATE TABLE IF NOT EXISTS news(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL,who TEXT DEFAULT '',body TEXT DEFAULT '',date TEXT DEFAULT '',images TEXT DEFAULT '[]',en TEXT DEFAULT '{}',created_at INTEGER)"),
  DB.prepare("CREATE TABLE IF NOT EXISTS suggestions(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT DEFAULT '',message TEXT NOT NULL,status TEXT DEFAULT 'new',created_at INTEGER)"),
  DB.prepare("CREATE TABLE IF NOT EXISTS images(id INTEGER PRIMARY KEY AUTOINCREMENT,mime TEXT,data TEXT)"),
  DB.prepare("CREATE TABLE IF NOT EXISTS events(kind TEXT,ip TEXT,ts INTEGER)"),
  DB.prepare("CREATE TABLE IF NOT EXISTS meta(k TEXT PRIMARY KEY,v TEXT)"),
  DB.prepare("CREATE TABLE IF NOT EXISTS agenda(id INTEGER PRIMARY KEY AUTOINCREMENT,kind TEXT DEFAULT 'event',title TEXT NOT NULL,body TEXT DEFAULT '',date TEXT,en TEXT DEFAULT '{}',created_at INTEGER)"),
  DB.prepare("CREATE TABLE IF NOT EXISTS honor(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,achievement TEXT DEFAULT '',image TEXT DEFAULT '',en TEXT DEFAULT '{}',created_at INTEGER)"),
  DB.prepare("CREATE TABLE IF NOT EXISTS polls(id INTEGER PRIMARY KEY AUTOINCREMENT,question TEXT NOT NULL,options TEXT NOT NULL,active INTEGER DEFAULT 1,en TEXT DEFAULT '{}',created_at INTEGER)"),
  DB.prepare("CREATE TABLE IF NOT EXISTS votes(poll_id INTEGER,voter TEXT,opt INTEGER,ts INTEGER,PRIMARY KEY(poll_id,voter))"),
  DB.prepare("CREATE TABLE IF NOT EXISTS teachers(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,subject TEXT DEFAULT '',code_hash TEXT,active INTEGER DEFAULT 1,created_at INTEGER)"),
  DB.prepare("CREATE TABLE IF NOT EXISTS materials(id INTEGER PRIMARY KEY AUTOINCREMENT,grade TEXT,subject TEXT,title TEXT NOT NULL,url TEXT,kind TEXT,note TEXT DEFAULT '',teacher_id INTEGER DEFAULT 0,teacher_name TEXT DEFAULT '',created_at INTEGER)"),
  DB.prepare("CREATE TABLE IF NOT EXISTS quizzes(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL,grade TEXT,subject TEXT,questions TEXT,active INTEGER DEFAULT 1,teacher_id INTEGER DEFAULT 0,teacher_name TEXT DEFAULT '',created_at INTEGER)"),
  DB.prepare("CREATE TABLE IF NOT EXISTS schedule(grp TEXT,day INTEGER,period INTEGER,subject TEXT,teacher TEXT DEFAULT '',PRIMARY KEY(grp,day,period))"),
  DB.prepare("CREATE TABLE IF NOT EXISTS hits(day TEXT,path TEXT,n INTEGER DEFAULT 0,PRIMARY KEY(day,path))"),
  DB.prepare("CREATE TABLE IF NOT EXISTS attempts(id INTEGER PRIMARY KEY AUTOINCREMENT,quiz_id INTEGER,score INTEGER,total INTEGER,answers TEXT,ts INTEGER)")]);
 await DB.batch([...SEED.slice().reverse().map(n=>DB.prepare("INSERT INTO news(title,who,body,date,images,en,created_at) SELECT ?,?,?,'',?,'{}',? WHERE NOT EXISTS(SELECT 1 FROM meta WHERE k='seeded')").bind(n.title,n.who,n.body,JSON.stringify(n.images),Date.now())),DB.prepare("INSERT OR IGNORE INTO meta VALUES('seeded','1')")]);

 const ch=[];for(let i=0;i<SCH.length;i+=15)ch.push(SCH.slice(i,i+15));
 await DB.batch([...ch.map(c=>DB.prepare("INSERT INTO schedule(grp,day,period,subject,teacher) SELECT * FROM (VALUES "+c.map(()=>"(?,?,?,?,?)").join(",")+") WHERE NOT EXISTS(SELECT 1 FROM meta WHERE k='sched_seeded')").bind(...c.flat())),DB.prepare("INSERT OR IGNORE INTO meta VALUES('sched_seeded','1')")]);
 ready=true}
const row=r=>({id:r.id,title:r.title,who:r.who,text:r.body,date:r.date,images:pj(r.images,[]),en:pj(r.en,{})});
function clean(b){const title=s(b.title,150),date=s(b.date,10);if(!title||(date&&!/^\d{4}-\d{2}-\d{2}$/.test(date)))return null;const e=b.en||{};
 const images=(Array.isArray(b.images)?b.images:[]).filter(x=>typeof x==="string"&&/^(\/img\/\d+|\/images\/[\w.-]+)$/.test(x)).slice(0,12);
 return{title,date,images,who:s(b.who,120),body:s(b.text,3000),en:JSON.stringify({title:s(e.title,150),who:s(e.who,120),text:s(e.text,3000)})}}
const ids=a=>a.map(x=>/^\/img\/(\d+)$/.exec(x)).filter(Boolean).map(m=>+m[1]);
const dropImgs=(DB,a)=>a.length?DB.prepare("DELETE FROM images WHERE id IN ("+a.map(()=>"?").join(",")+")").bind(...a).run():null;
async function img(DB,id,req,ctx){const c=typeof caches!=="undefined"?caches.default:null;if(c){const h=await c.match(req);if(h)return h}
 const r=await DB.prepare("SELECT mime,data FROM images WHERE id=?").bind(id).first();if(!r)return new Response("not found",{status:404});
 const b=atob(r.data),a=new Uint8Array(b.length);for(let i=0;i<b.length;i++)a[i]=b.charCodeAt(i);
 const res=new Response(a,{headers:{"content-type":r.mime,"cache-control":"public, max-age=31536000, immutable","x-content-type-options":"nosniff"}});if(c)ctx.waitUntil(c.put(req,res.clone()));return res}
const dt=v=>{v=s(v,10);return/^\d{4}-\d{2}-\d{2}$/.test(v)?v:""};
const imgp=v=>typeof v==="string"&&/^\/img\/\d+$/.test(v)?v:"";
const enj=(e,ks)=>JSON.stringify(Object.fromEntries(ks.map(k=>[k,s((e||{})[k],800)])));
const lines=a=>(Array.isArray(a)?a:[]).map(x=>s(x,80)).filter(Boolean).slice(0,6);
const RES={
 agenda:{o:"date ASC,id DESC",c:b=>{const title=s(b.title,150),date=dt(b.date);return title&&date?{kind:b.kind==="notice"?"notice":"event",title,body:s(b.body,800),date,en:enj(b.en,["title","body"])}:null}},
 honor:{o:"id DESC",c:b=>{const name=s(b.name,120);return name?{name,achievement:s(b.achievement,300),image:imgp(b.image),en:enj(b.en,["name","achievement"])}:null}},
 polls:{o:"id DESC",c:(b,upd)=>{const q=s(b.question,200),o=lines(b.options);if(!q||(!upd&&o.length<2))return null;const e=b.en||{};
  const r={question:q,active:b.active===0||b.active===false?0:1,en:JSON.stringify({question:s(e.question,200),options:lines(e.options)})};if(!upd)r.options=JSON.stringify(o);return r}}};
async function list(DB,r,all){const q="SELECT * FROM "+r+(r==="polls"&&!all?" WHERE active=1":"")+" ORDER BY "+RES[r].o,rows=(await DB.prepare(q).all()).results,cnt={};
 if(r==="polls")(await DB.prepare("SELECT poll_id,opt,COUNT(*) c FROM votes GROUP BY poll_id,opt").all()).results.forEach(z=>{(cnt[z.poll_id]=cnt[z.poll_id]||{})[z.opt]=z.c});
 return rows.map(x=>{const o={...x,en:pj(x.en,{})};delete o.created_at;if(r==="polls"){o.options=pj(x.options,[]);o.counts=o.options.map((_,i)=>(cnt[x.id]||{})[i]||0)}return o})}
const gr=v=>["0","1","2","3"].includes(String(v))?String(v):"0";
function cleanMat(b){const title=s(b.title,150),u=s(b.url,500);if(!title||!/^https:\/\/[^\s]+$/.test(u))return null;return{grade:gr(b.grade),subject:s(b.subject,60),title,url:u,kind:["video","pdf","link"].includes(b.kind)?b.kind:"link",note:s(b.note,300)}}
function cleanQuiz(b){const raw=Array.isArray(b.questions)?b.questions.slice(0,20):[],title=s(b.title,150);
 const qs=raw.map(x=>({q:s(x&&x.q,300),options:(Array.isArray(x&&x.options)?x.options:[]).map(o=>s(o,120)).filter(Boolean).slice(0,5),correct:Number(x&&x.correct)})).filter(x=>x.q&&x.options.length>=2&&Number.isInteger(x.correct)&&x.correct>=0&&x.correct<x.options.length);
 if(!title||!qs.length||qs.length!==raw.length)return null;return{title,grade:gr(b.grade),subject:s(b.subject,60),questions:JSON.stringify(qs),active:b.active===0||b.active===false?0:1}}
async function route(req,env,ctx,u,p){const m=req.method,DB=env.DB;let x;
 if(m==="GET"&&(x=/^\/img\/(\d+)$/.exec(p)))return img(DB,+x[1],req,ctx);
 if(m==="GET"&&p==="/api/news"){const{results}=await DB.prepare("SELECT * FROM news ORDER BY date DESC,id DESC").all();return J({news:results.map(row)})}
 if(m==="GET"&&(x=/^\/api\/(agenda|honor|polls)$/.exec(p)))return J({items:await list(DB,x[1],false)});
 if(m==="GET"&&p==="/api/schedule"){const{results}=await DB.prepare("SELECT grp,day,period,subject,teacher FROM schedule ORDER BY grp,day,period").all();return J({items:results})}
 if(m==="GET"&&p==="/api/materials"){const{results}=await DB.prepare("SELECT id,grade,subject,title,url,kind,note,teacher_name FROM materials ORDER BY id DESC LIMIT 300").all();return J({items:results})}
 if(m==="GET"&&p==="/api/quizzes"){const{results}=await DB.prepare("SELECT id,title,grade,subject,teacher_name,questions FROM quizzes WHERE active=1 ORDER BY id DESC").all();return J({items:results.map(r=>({id:r.id,title:r.title,grade:r.grade,subject:r.subject,teacher_name:r.teacher_name,count:pj(r.questions,[]).length}))})}
 if(m==="GET"&&(x=/^\/api\/quizzes\/(\d+)$/.exec(p))){const r=await DB.prepare("SELECT id,title,questions FROM quizzes WHERE id=? AND active=1").bind(+x[1]).first();if(!r)return J({error:"not-found"},404);return J({id:r.id,title:r.title,questions:pj(r.questions,[]).map(q=>({q:q.q,options:q.options}))})}
 const body=m==="GET"||m==="DELETE"?{}:await req.json().catch(()=>({}));
 if(m==="POST"&&p==="/api/vote"){const id=+body.poll,opt=+body.opt,tok=s(body.token,40);if(!/^[A-Za-z0-9]{16,40}$/.test(tok))return J({error:"token"},400);
  const pl=await DB.prepare("SELECT options,active FROM polls WHERE id=?").bind(id).first(),n=pl?pj(pl.options,[]).length:0;if(!pl||!pl.active||!(opt>=0&&opt<n))return J({error:"invalid"},400);
  const ip=await ipid(req,env);if(await limited(DB,"vote",ip,200,36e5))return J({error:"rate"},429);
  const r=await DB.prepare("INSERT OR IGNORE INTO votes(poll_id,voter,opt,ts) VALUES(?,?,?,?)").bind(id,tok,opt,Date.now()).run();await hit(DB,"vote",ip);return J({ok:true,duplicate:r.meta.changes===0})}
 if(m==="POST"&&(x=/^\/api\/quizzes\/(\d+)\/submit$/.exec(p))){const qz=await DB.prepare("SELECT questions FROM quizzes WHERE id=? AND active=1").bind(+x[1]).first();if(!qz)return J({error:"not-found"},404);
  const ip=await ipid(req,env);if(await limited(DB,"quiz",ip,150,36e5))return J({error:"rate"},429);
  const qs=pj(qz.questions,[]),a=(Array.isArray(body.answers)?body.answers:[]).slice(0,qs.length).map(Number);let sc=0;
  const results=qs.map((q,i)=>{const ok=a[i]===q.correct;if(ok)sc++;return{correct:q.correct,chosen:Number.isInteger(a[i])?a[i]:-1}});
  await DB.prepare("INSERT INTO attempts(quiz_id,score,total,answers,ts) VALUES(?,?,?,?,?)").bind(+x[1],sc,qs.length,JSON.stringify(results.map(r=>r.chosen)),Date.now()).run();await hit(DB,"quiz",ip);return J({score:sc,total:qs.length,results})}
 if(m==="POST"&&p==="/api/hit"){const k=body.k==="bot"?"bot:"+s(body.t,40):body.k==="visit"?"visit":"";if(!k)return J({error:"invalid"},400);
  const ip=await ipid(req,env);if(await limited(DB,"hit",ip,200,36e5))return J({ok:true});await hit(DB,"hit",ip);
  await DB.prepare("INSERT INTO hits(day,path,n) VALUES(?,?,1) ON CONFLICT(day,path) DO UPDATE SET n=n+1").bind(new Date().toISOString().slice(0,10),k).run();return J({ok:true})}
 if(m==="POST"&&p==="/api/suggest"){if(body.website)return J({ok:true});const msg=s(body.message,600);if(msg.length<5)return J({error:"short"},400);
  const ip=await ipid(req,env);if(await limited(DB,"sug",ip,5,36e5))return J({error:"rate"},429);
  await DB.prepare("INSERT INTO suggestions(name,message,created_at) VALUES(?,?,?)").bind(s(body.name,60),msg,Date.now()).run();await hit(DB,"sug",ip);return J({ok:true})}
 if(m==="POST"&&p==="/api/login"){if(!key(env))return J({error:"not-configured"},503);const ip=await ipid(req,env);if(await limited(DB,"login",ip,5,9e5))return J({error:"rate"},429);
  const pw=s(body.password,200);let role=null,tid=0;if(pw&&await same(pw,env.ADMIN_PASSWORD||"\u0000"))role="admin";else if(pw&&env.DEMO_PASSWORD&&await same(pw,env.DEMO_PASSWORD))role="viewer";
  else if(pw){const c=normCode(pw),tr=c.length===12?await DB.prepare("SELECT id FROM teachers WHERE code_hash=? AND active=1").bind(await hashCode(c)).first():null;if(tr){role="teacher";tid=tr.id}}
  if(!role){await hit(DB,"login",ip);return J({error:"bad"},401)}
  return J({role},200,{"set-cookie":"sess="+await token(env,role==="teacher"?"t"+tid:role)+"; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800"})}
 if(m==="POST"&&p==="/api/logout")return J({ok:true},200,{"set-cookie":"sess=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0"});
 if(!p.startsWith("/api/admin/"))return J({error:"not-found"},404);
 const ses=await roleOf(req,env);if(!ses)return J({error:"auth"},401);const role=ses.role,tid=ses.tid||0,tname=role==="teacher"?ses.name:"الإدارة";
 if(role==="teacher"&&!/^\/api\/admin\/(me|image|materials|quizzes|quiz-stats)(\/|$)/.test(p))return J({error:"forbidden"},403);
 if(m!=="GET"){if(role==="viewer")return J({error:"view-only"},403);const o=req.headers.get("origin");if(o&&new URL(o).host!==u.host)return J({error:"origin"},403)}
 if(m==="GET"&&p==="/api/admin/me")return J({role,name:role==="teacher"?ses.name:""});
 const own=o=>role==="admin"||o.teacher_id===tid;
 if(p==="/api/admin/teachers"||/^\/api\/admin\/teachers\/\d+(\/reset)?$/.test(p)){
  if(m==="GET"&&p==="/api/admin/teachers"){const{results}=await DB.prepare("SELECT id,name,subject,active FROM teachers ORDER BY id DESC").all();return J({items:results})}
  if(m==="POST"&&p==="/api/admin/teachers"){const n=s(body.name,80);if(!n)return J({error:"invalid"},400);const c=newCode(),r=await DB.prepare("INSERT INTO teachers(name,subject,code_hash,created_at) VALUES(?,?,?,?)").bind(n,s(body.subject,60),await hashCode(normCode(c)),Date.now()).run();return J({id:r.meta.last_row_id,code:c})}
  if((x=/^\/api\/admin\/teachers\/(\d+)\/reset$/.exec(p))&&m==="POST"){const c=newCode();await DB.prepare("UPDATE teachers SET code_hash=?,active=1 WHERE id=?").bind(await hashCode(normCode(c)),+x[1]).run();return J({code:c})}
  if((x=/^\/api\/admin\/teachers\/(\d+)$/.exec(p))){if(m==="PATCH"){await DB.prepare("UPDATE teachers SET active=? WHERE id=?").bind(body.active?1:0,+x[1]).run();return J({ok:true})}
   if(m==="DELETE"){await DB.prepare("DELETE FROM teachers WHERE id=?").bind(+x[1]).run();return J({ok:true})}}
  return J({error:"not-found"},404)}
 if(p==="/api/admin/schedule"){
  if(m==="GET"){const{results}=await DB.prepare("SELECT grp,day,period,subject,teacher FROM schedule ORDER BY grp,day,period").all();return J({items:results})}
  if(m==="PUT"){const grp=s(body.grp,60),old=s(body.old,60),cells=Array.isArray(body.cells)?body.cells.slice(0,6):[];if(!grp)return J({error:"invalid"},400);
   const rs=[];cells.forEach((row,d)=>(Array.isArray(row)?row.slice(0,8):[]).forEach((v,i)=>{const sb=s(v&&v.s,60);if(sb)rs.push([grp,d,i+1,sb,s(v&&v.t,80)])}));
   const st=[DB.prepare("DELETE FROM schedule WHERE grp=?").bind(old||grp)];if(old&&old!==grp)st.push(DB.prepare("DELETE FROM schedule WHERE grp=?").bind(grp));
   for(let i=0;i<rs.length;i+=15){const c=rs.slice(i,i+15);st.push(DB.prepare("INSERT INTO schedule(grp,day,period,subject,teacher) VALUES "+c.map(()=>"(?,?,?,?,?)").join(",")).bind(...c.flat()))}
   await DB.batch(st);return J({ok:true})}
  if(m==="DELETE"){await DB.prepare("DELETE FROM schedule WHERE grp=?").bind(s(u.searchParams.get("grp"),60)).run();return J({ok:true})}}
 if(m==="GET"&&p==="/api/admin/analytics"){const d=new Date(Date.now()-13*864e5).toISOString().slice(0,10),q=async(sql,...a)=>(await DB.prepare(sql).bind(...a).all()).results;
  return J({visits:await q("SELECT day,n FROM hits WHERE path='visit' AND day>=? ORDER BY day",d),bot:await q("SELECT REPLACE(path,'bot:','') t,SUM(n) n FROM hits WHERE path LIKE 'bot:%' GROUP BY path ORDER BY n DESC LIMIT 8"),
   quizzes:await q("SELECT qz.title,COUNT(a.id) attempts,ROUND(AVG(a.score*100.0/NULLIF(a.total,0))) avg FROM quizzes qz LEFT JOIN attempts a ON a.quiz_id=qz.id GROUP BY qz.id ORDER BY attempts DESC LIMIT 8"),
   polls:await q("SELECT p.question,COUNT(v.voter) n FROM polls p LEFT JOIN votes v ON v.poll_id=p.id GROUP BY p.id ORDER BY n DESC LIMIT 6")})}
 if((x=/^\/api\/admin\/materials(?:\/(\d+))?$/.exec(p))){const id=x[1]&&+x[1];
  if(m==="GET"&&!id){const{results}=await DB.prepare("SELECT * FROM materials ORDER BY id DESC LIMIT 300").all();return J({items:results.map(r=>({...r,mine:own(r)}))})}
  const c=m==="DELETE"?{}:cleanMat(body);if(!c)return J({error:"invalid"},400);
  if(m==="POST"&&!id){const r=await DB.prepare("INSERT INTO materials(grade,subject,title,url,kind,note,teacher_id,teacher_name,created_at) VALUES(?,?,?,?,?,?,?,?,?)").bind(c.grade,c.subject,c.title,c.url,c.kind,c.note,tid,tname,Date.now()).run();return J({id:r.meta.last_row_id})}
  const old=id&&await DB.prepare("SELECT teacher_id FROM materials WHERE id=?").bind(id).first();if(!old)return J({error:"not-found"},404);if(!own(old))return J({error:"forbidden"},403);
  if(m==="PUT"){await DB.prepare("UPDATE materials SET grade=?,subject=?,title=?,url=?,kind=?,note=? WHERE id=?").bind(c.grade,c.subject,c.title,c.url,c.kind,c.note,id).run();return J({ok:true})}
  if(m==="DELETE"){await DB.prepare("DELETE FROM materials WHERE id=?").bind(id).run();return J({ok:true})}}
 if((x=/^\/api\/admin\/quizzes(?:\/(\d+))?$/.exec(p))){const id=x[1]&&+x[1];
  if(m==="GET"&&!id){const{results}=await DB.prepare("SELECT q.*,(SELECT COUNT(*) FROM attempts a WHERE a.quiz_id=q.id) attempts FROM quizzes q ORDER BY q.id DESC").all();return J({items:results.filter(r=>role!=="teacher"||own(r)).map(r=>({...r,questions:pj(r.questions,[]),mine:own(r)}))})}
  const c=m==="DELETE"?{}:cleanQuiz(body);if(!c)return J({error:"invalid"},400);
  if(m==="POST"&&!id){const r=await DB.prepare("INSERT INTO quizzes(title,grade,subject,questions,active,teacher_id,teacher_name,created_at) VALUES(?,?,?,?,?,?,?,?)").bind(c.title,c.grade,c.subject,c.questions,c.active,tid,tname,Date.now()).run();return J({id:r.meta.last_row_id})}
  const old=id&&await DB.prepare("SELECT teacher_id FROM quizzes WHERE id=?").bind(id).first();if(!old)return J({error:"not-found"},404);if(!own(old))return J({error:"forbidden"},403);
  if(m==="PUT"){await DB.prepare("UPDATE quizzes SET title=?,grade=?,subject=?,questions=?,active=? WHERE id=?").bind(c.title,c.grade,c.subject,c.questions,c.active,id).run();await DB.prepare("DELETE FROM attempts WHERE quiz_id=?").bind(id).run();return J({ok:true})}
  if(m==="DELETE"){await DB.prepare("DELETE FROM quizzes WHERE id=?").bind(id).run();await DB.prepare("DELETE FROM attempts WHERE quiz_id=?").bind(id).run();return J({ok:true})}}
 if(m==="GET"&&p==="/api/admin/quiz-stats"){const id=+u.searchParams.get("id"),qz=await DB.prepare("SELECT title,questions,teacher_id FROM quizzes WHERE id=?").bind(id).first();if(!qz)return J({error:"not-found"},404);if(!own(qz))return J({error:"forbidden"},403);
  const qs=pj(qz.questions,[]),{results}=await DB.prepare("SELECT score,total,answers FROM attempts WHERE quiz_id=? ORDER BY id DESC LIMIT 500").bind(id).all(),n=results.length,ok=qs.map(()=>0);let sum=0;
  results.forEach(r=>{sum+=r.total?r.score/r.total:0;pj(r.answers,[]).forEach((a,i)=>{if(qs[i]&&a===qs[i].correct)ok[i]++})});
  return J({title:qz.title,attempts:n,avg:n?Math.round(sum*100/n):0,questions:qs.map((q,i)=>({q:q.q,pct:n?Math.round(ok[i]*100/n):0}))})}
 if(m==="GET"&&p==="/api/admin/stats"){const c=async q=>(await DB.prepare(q).first()).c;return J({news:await c("SELECT COUNT(*) c FROM news"),suggestions:await c("SELECT COUNT(*) c FROM suggestions"),newSuggestions:await c("SELECT COUNT(*) c FROM suggestions WHERE status='new'"),images:await c("SELECT COUNT(*) c FROM images"),events:await c("SELECT COUNT(*) c FROM agenda"),honor:await c("SELECT COUNT(*) c FROM honor"),polls:await c("SELECT COUNT(*) c FROM polls"),votes:await c("SELECT COUNT(*) c FROM votes"),materials:await c("SELECT COUNT(*) c FROM materials"),quizzes:await c("SELECT COUNT(*) c FROM quizzes"),attempts:await c("SELECT COUNT(*) c FROM attempts"),teachers:await c("SELECT COUNT(*) c FROM teachers")})}
 if(m==="GET"&&p==="/api/admin/suggestions"){const{results}=await DB.prepare("SELECT * FROM suggestions ORDER BY id DESC LIMIT 200").all();return J({items:results})}
 if((x=/^\/api\/admin\/(agenda|honor|polls)(?:\/(\d+))?$/.exec(p))){const r=x[1],id=x[2]&&+x[2];
  if(m==="GET"&&!id)return J({items:await list(DB,r,true)});
  if(m==="POST"&&!id){const c=RES[r].c(body,false);if(!c)return J({error:"invalid"},400);const k=Object.keys(c),q=await DB.prepare("INSERT INTO "+r+"("+k.join(",")+",created_at) VALUES("+k.map(()=>"?").join(",")+",?)").bind(...k.map(z=>c[z]),Date.now()).run();return J({id:q.meta.last_row_id})}
  if(id){const old=await DB.prepare("SELECT * FROM "+r+" WHERE id=?").bind(id).first();if(!old)return J({error:"not-found"},404);
   if(m==="PUT"){const c=RES[r].c(body,true);if(!c)return J({error:"invalid"},400);const k=Object.keys(c);await DB.prepare("UPDATE "+r+" SET "+k.map(z=>z+"=?").join(",")+" WHERE id=?").bind(...k.map(z=>c[z]),id).run();if(r==="honor"&&old.image!==c.image)await dropImgs(DB,ids([old.image]));return J({ok:true})}
   if(m==="DELETE"){await DB.prepare("DELETE FROM "+r+" WHERE id=?").bind(id).run();if(r==="polls")await DB.prepare("DELETE FROM votes WHERE poll_id=?").bind(id).run();if(r==="honor")await dropImgs(DB,ids([old.image]));return J({ok:true})}}
  return J({error:"not-found"},404)}
 if(m==="POST"&&p==="/api/admin/image"){const g=/^data:(image\/(?:webp|jpeg|png));base64,([A-Za-z0-9+\/=]+)$/.exec(body.data||"");if(!g||g[2].length>1.2e6)return J({error:"bad-image"},400);
  const r=await DB.prepare("INSERT INTO images(mime,data) VALUES(?,?)").bind(g[1],g[2]).run();return J({url:"/img/"+r.meta.last_row_id})}
 if(m==="POST"&&p==="/api/admin/news"){const n=clean(body);if(!n)return J({error:"invalid"},400);
  const r=await DB.prepare("INSERT INTO news(title,who,body,date,images,en,created_at) VALUES(?,?,?,?,?,?,?)").bind(n.title,n.who,n.body,n.date,JSON.stringify(n.images),n.en,Date.now()).run();return J({id:r.meta.last_row_id})}
 if((x=/^\/api\/admin\/news\/(\d+)$/.exec(p))){const id=+x[1],old=await DB.prepare("SELECT images FROM news WHERE id=?").bind(id).first();if(!old)return J({error:"not-found"},404);
  if(m==="PUT"){const n=clean(body);if(!n)return J({error:"invalid"},400);await DB.prepare("UPDATE news SET title=?,who=?,body=?,date=?,images=?,en=? WHERE id=?").bind(n.title,n.who,n.body,n.date,JSON.stringify(n.images),n.en,id).run();
   const keep=ids(n.images);await dropImgs(DB,ids(pj(old.images,[])).filter(i=>!keep.includes(i)));return J({ok:true})}
  if(m==="DELETE"){await DB.prepare("DELETE FROM news WHERE id=?").bind(id).run();await dropImgs(DB,ids(pj(old.images,[])));return J({ok:true})}}
 if((x=/^\/api\/admin\/suggestions\/(\d+)$/.exec(p))){const id=+x[1];
  if(m==="PATCH"){await DB.prepare("UPDATE suggestions SET status=? WHERE id=?").bind(body.status==="done"?"done":"new",id).run();return J({ok:true})}
  if(m==="DELETE"){await DB.prepare("DELETE FROM suggestions WHERE id=?").bind(id).run();return J({ok:true})}}
 return J({error:"not-found"},404)}
export default{async fetch(req,env,ctx){const u=new URL(req.url),p=u.pathname;
 if(p.startsWith("/api/")||p.startsWith("/img/")){try{if(!env.DB)return J({error:"no-db"},503);await init(env.DB);return await route(req,env,ctx,u,p)}catch(e){console.error(e);return J({error:"server"},500)}}
 return env.ASSETS.fetch(req)}};
