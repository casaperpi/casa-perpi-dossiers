export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    ok: true,
    service: "Casa Perpi Onboarding API",
    version: "1.0.0"
  });
}
