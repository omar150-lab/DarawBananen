// Service Worker بسيط: يجعل الموقع قابلًا للتثبيت كتطبيق، ولا يخزّن أي محتوى (فيظل كل شيء محدّثًا)
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",()=>{});
