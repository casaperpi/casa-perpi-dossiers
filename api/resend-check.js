export default async function handler(req,res){
  res.setHeader("Cache-Control","no-store");
  const configured=Boolean(process.env.RESEND_API_KEY);
  return res.status(configured?200:500).json({ok:configured,resendConfigured:configured,service:"Casa Perpi Onboarding API"});
}
