const NV="2026-03-11",OWNERS="391534e1-09e6-8134-908a-000b92c0ac22";
async function notion(path,token,opt={}){return fetch("https://api.notion.com/v1"+path,{...opt,headers:{Authorization:"Bearer "+token,"Notion-Version":NV,"Content-Type":"application/json"}})}
async function trash(id,token){if(id)await notion("/pages/"+id,token,{method:"PATCH",body:JSON.stringify({in_trash:true})})}
export default async function handler(req,res){
  res.setHeader("Cache-Control","no-store");
  const token=process.env.NOTION_TOKEN;if(!token)return res.status(500).json({ok:false,error:"missing_notion"});
  const email="contact@casaperpi.com";
  const q=await notion("/data_sources/"+OWNERS+"/query",token,{method:"POST",body:JSON.stringify({filter:{property:"Email",email:{equals:email}},page_size:1})});
  const qd=await q.json();if(qd.results?.length)return res.status(409).json({ok:false,error:"test_email_conflict"});
  const stamp=Date.now(),host=req.headers.host;
  const payload={"Nom et prénom":"TEST INTÉGRATION CASA PERPI","Téléphone":"0600000000",email,"Adresse exacte du logement":"TEST INTÉGRATION — "+stamp,"Capacité voyageurs":"2","Canaux utilisés":["Airbnb"],"Réservations futures":"Oui — détaillées ci-dessous",Dossier:"TEST-CP-"+stamp};
  const body={payload,bookings:[{arrival:"2027-01-10",departure:"2027-01-12",channel:"Airbnb",guest:"Test Casa Perpi",guests:"2",amount:"200",payment:"Test",flags:[]}],pdf:null,honey:""};
  const r=await fetch("https://"+host+"/api/onboarding",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
  const data=await r.json().catch(()=>({}));
  if(!r.ok||!data.ok)return res.status(500).json({ok:false,error:"pipeline_failed",detail:data});
  const ids=[...(data.reservationIds||[]),data.documentId,data.onboardingId,data.propertyId,data.ownerId].filter(Boolean);
  for(const id of ids)await trash(id,token);
  return res.status(200).json({ok:true,pipeline:true,notion:true,resend:true,reservationsCreated:data.reservationsCreated,cleanup:true});
}
