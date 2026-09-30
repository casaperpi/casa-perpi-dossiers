const NOTION_VERSION = "2026-03-11";
const OWNERS_DATA_SOURCE_ID = "391534e1-09e6-8134-908a-000b92c0ac22";

async function notion(path, token) {
  return fetch(`https://api.notion.com/v1${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json"
    }
  });
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const token = process.env.NOTION_TOKEN;
  if (!token) {
    return res.status(500).json({
      ok: false,
      notionAuth: false,
      ownersDatabase: false,
      error: "NOTION_TOKEN_missing"
    });
  }

  try {
    const meResponse = await notion("/users/me", token);
    if (!meResponse.ok) {
      return res.status(meResponse.status).json({
        ok: false,
        notionAuth: false,
        ownersDatabase: false,
        error: "notion_auth_failed",
        status: meResponse.status
      });
    }

    const dsResponse = await notion(`/data_sources/${OWNERS_DATA_SOURCE_ID}`, token);
    if (!dsResponse.ok) {
      return res.status(dsResponse.status).json({
        ok: false,
        notionAuth: true,
        ownersDatabase: false,
        error: "owners_database_not_accessible",
        status: dsResponse.status
      });
    }

    return res.status(200).json({
      ok: true,
      notionAuth: true,
      ownersDatabase: true,
      service: "Casa Perpi Onboarding API",
      notionVersion: NOTION_VERSION
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      notionAuth: false,
      ownersDatabase: false,
      error: "notion_check_failed"
    });
  }
}
