const NV="2026-03-11";
async function N(path,token,opt={}){return fetch("https://api.notion.com/v1"+path,{...opt,headers:{Authorization:"Bearer "+token,"Notion-Version":NV,"Content-Type":"application/json"}})}
async function trash(id,t){if(id)await N("/pages/"+id,t,{method:"PATCH",body:JSON.stringify({in_trash:true})})}
export default async function handler(req,res){
  res.setHeader("Cache-Control","no-store");
  const t=process.env.NOTION_TOKEN;if(!t)return res.status(500).json({ok:false,error:"missing_notion"});
  const stamp=Date.now(),host=req.headers.host;
  const payload={"Nom et prénom":"TEST POST ONBOARDING CASA PERPI","Téléphone":"0600000000",email:"contact@casaperpi.com","Adresse exacte du logement":"TEST AUTOMATION — "+stamp,"Adresse contractuelle":"TEST","Capacité voyageurs":"4","Date de prise en main prévue":"2026-10-18","Canaux utilisés":["Airbnb","Booking.com","Direct"],"Airbnb - ID annonce":"TEST-AIRBNB","Airbnb - email compte":"contact@casaperpi.com","Booking - ID établissement":"TEST-BOOKING","Booking - email / identifiant":"contact@casaperpi.com","Booking - paiements / versements":"Virement propriétaire","Nombre jeux de clés":"2","Badge / Vigik":"À tester","Boîte à clés - emplacement":"Entrée","Wi-Fi nom réseau":"CASA-TEST","Climatisation":"Présente","Eau chaude":"Ballon","Tableau électrique":"Entrée","Coupure eau":"Cuisine","Linge disponible":"À vérifier","Consommables présents":"À vérifier","Fragilités / défauts":"Aucun défaut réel — test","Réservations futures":"Oui — détaillées ci-dessous",Dossier:"TEST-AUTO-"+stamp};
  const body={payload,bookings:[{arrival:"2026-10-20",departure:"2026-10-22",channel:"Airbnb",guest:"Voyageur test",guests:"2",amount:"200",payment:"Test",flags:[]}],pdf:null,honey:""};
  const r=await fetch("https://"+host+"/api/onboarding",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
  const data=await r.json().catch(()=>({}));
  if(!r.ok||!data.ok)return res.status(500).json({ok:false,error:"pipeline_failed",detail:data});
  const ids=[...(data.taskIds||[]),...(data.channelIds||[]),...(data.inventoryIds||[]),...(data.reservationIds||[]),data.documentId,data.onboardingId,data.propertyId,data.ownerId].filter(Boolean);
  for(const id of ids)await trash(id,t);
  return res.status(200).json({ok:true,tasksCreated:data.tasksCreated,channelsSynced:data.channelsSynced,inventorySynced:data.inventorySynced,reservationsCreated:data.reservationsCreated,cleanup:true});
}