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
const J=(o,s=200,h={})=>new Response(JSON.stringify(o),{status:s,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff",...h}});
const enc=new TextEncoder(),hex=u=>[...u].map(b=>b.toString(16).padStart(2,"0")).join("");
const pj=(x,d)=>{try{return JSON.parse(x)}catch(e){return d}};
const s=(v,n)=>typeof v==="string"?v.trim().slice(0,n):"";
async function hmac(key,msg){const k=await crypto.subtle.importKey("raw",enc.encode(key),{name:"HMAC",hash:"SHA-256"},false,["sign"]);return new Uint8Array(await crypto.subtle.sign("HMAC",k,enc.encode(msg)))}
async function same(a,b){const[x,y]=await Promise.all([hmac("cmp",a),hmac("cmp",b)]);let d=0;for(let i=0;i<x.length;i++)d|=x[i]^y[i];return d===0}
const key=env=>env.SESSION_SECRET||env.ADMIN_PASSWORD||"";
async function token(env,role){const p=role+"."+(Date.now()+288e5);return p+"."+hex(await hmac(key(env),p))}
async function roleOf(req,env){const m=/(?:^|; )sess=([^;]+)/.exec(req.headers.get("cookie")||"");if(!m||!key(env))return null;const[r,e,g]=m[1].split(".");if(!g||+e<Date.now()||(r!=="admin"&&r!=="viewer"))return null;return await same(g,hex(await hmac(key(env),r+"."+e)))?r:null}
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
  DB.prepare("CREATE TABLE IF NOT EXISTS votes(poll_id INTEGER,voter TEXT,opt INTEGER,ts INTEGER,PRIMARY KEY(poll_id,voter))")]);
 await DB.batch([...SEED.slice().reverse().map(n=>DB.prepare("INSERT INTO news(title,who,body,date,images,en,created_at) SELECT ?,?,?,'',?,'{}',? WHERE NOT EXISTS(SELECT 1 FROM meta WHERE k='seeded')").bind(n.title,n.who,n.body,JSON.stringify(n.images),Date.now())),DB.prepare("INSERT OR IGNORE INTO meta VALUES('seeded','1')")]);
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
async function route(req,env,ctx,u,p){const m=req.method,DB=env.DB;let x;
 if(m==="GET"&&(x=/^\/img\/(\d+)$/.exec(p)))return img(DB,+x[1],req,ctx);
 if(m==="GET"&&p==="/api/news"){const{results}=await DB.prepare("SELECT * FROM news ORDER BY date DESC,id DESC").all();return J({news:results.map(row)})}
 if(m==="GET"&&(x=/^\/api\/(agenda|honor|polls)$/.exec(p)))return J({items:await list(DB,x[1],false)});
 const body=m==="GET"||m==="DELETE"?{}:await req.json().catch(()=>({}));
 if(m==="POST"&&p==="/api/vote"){const id=+body.poll,opt=+body.opt,tok=s(body.token,40);if(!/^[A-Za-z0-9]{16,40}$/.test(tok))return J({error:"token"},400);
  const pl=await DB.prepare("SELECT options,active FROM polls WHERE id=?").bind(id).first(),n=pl?pj(pl.options,[]).length:0;if(!pl||!pl.active||!(opt>=0&&opt<n))return J({error:"invalid"},400);
  const ip=await ipid(req,env);if(await limited(DB,"vote",ip,200,36e5))return J({error:"rate"},429);
  const r=await DB.prepare("INSERT OR IGNORE INTO votes(poll_id,voter,opt,ts) VALUES(?,?,?,?)").bind(id,tok,opt,Date.now()).run();await hit(DB,"vote",ip);return J({ok:true,duplicate:r.meta.changes===0})}
 if(m==="POST"&&p==="/api/suggest"){if(body.website)return J({ok:true});const msg=s(body.message,600);if(msg.length<5)return J({error:"short"},400);
  const ip=await ipid(req,env);if(await limited(DB,"sug",ip,5,36e5))return J({error:"rate"},429);
  await DB.prepare("INSERT INTO suggestions(name,message,created_at) VALUES(?,?,?)").bind(s(body.name,60),msg,Date.now()).run();await hit(DB,"sug",ip);return J({ok:true})}
 if(m==="POST"&&p==="/api/login"){if(!key(env))return J({error:"not-configured"},503);const ip=await ipid(req,env);if(await limited(DB,"login",ip,5,9e5))return J({error:"rate"},429);
  const pw=s(body.password,200);let role=null;if(pw&&await same(pw,env.ADMIN_PASSWORD||"\u0000"))role="admin";else if(pw&&env.DEMO_PASSWORD&&await same(pw,env.DEMO_PASSWORD))role="viewer";
  if(!role){await hit(DB,"login",ip);return J({error:"bad"},401)}
  return J({role},200,{"set-cookie":"sess="+await token(env,role)+"; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800"})}
 if(m==="POST"&&p==="/api/logout")return J({ok:true},200,{"set-cookie":"sess=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0"});
 if(!p.startsWith("/api/admin/"))return J({error:"not-found"},404);
 const role=await roleOf(req,env);if(!role)return J({error:"auth"},401);
 if(m!=="GET"){if(role!=="admin")return J({error:"view-only"},403);const o=req.headers.get("origin");if(o&&new URL(o).host!==u.host)return J({error:"origin"},403)}
 if(m==="GET"&&p==="/api/admin/me")return J({role});
 if(m==="GET"&&p==="/api/admin/stats"){const c=async q=>(await DB.prepare(q).first()).c;return J({news:await c("SELECT COUNT(*) c FROM news"),suggestions:await c("SELECT COUNT(*) c FROM suggestions"),newSuggestions:await c("SELECT COUNT(*) c FROM suggestions WHERE status='new'"),images:await c("SELECT COUNT(*) c FROM images"),events:await c("SELECT COUNT(*) c FROM agenda"),honor:await c("SELECT COUNT(*) c FROM honor"),polls:await c("SELECT COUNT(*) c FROM polls"),votes:await c("SELECT COUNT(*) c FROM votes")})}
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
