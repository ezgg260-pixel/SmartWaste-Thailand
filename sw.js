const C="smartwaste-v6";
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(clients.claim()));
self.addEventListener("fetch",e=>{
 const r=e.request;if(r.method!=="GET"||r.url.includes("nominatim")||r.headers.has("range"))return;
 e.respondWith(caches.open(C).then(async c=>{
  const hit=await c.match(r);
  const net=fetch(r).then(res=>{if(res.status===200||res.type==="opaque")c.put(r,res.clone()).catch(()=>{});return res}).catch(()=>hit);
  return hit||net;
 }));
});
