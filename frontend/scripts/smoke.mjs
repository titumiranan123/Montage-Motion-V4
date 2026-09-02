const baseUrl = (process.env.SMOKE_BASE_URL || "http://localhost:5000").replace(/\/$/, "");
const timeoutMs = Number(process.env.SMOKE_TIMEOUT_MS || 10000);

const checks = [
  { path: "/", status: 200 },
  { path: "/about-us", status: 200 },
  { path: "/blogs", status: 200 },
  { path: "/case-studies", status: 200 },
  { path: "/portfolio", status: 200 },
  { path: "/contact-us", status: 200 },
  { path: "/robots.txt", status: 200, includes: "User-Agent:" },
  { path: "/sitemap.xml", status: 200, includes: "<urlset" },
  { path: "/blogs/__smoke_missing__", status: 404 },
  { path: "/case-studies/__smoke_missing__", status: 404 },
  { path: "/__smoke_missing_service__", status: 404 },
];

const fetchWithTimeout = async (path) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(`${baseUrl}${path}`, { redirect: "manual", signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
};

let failures = 0;
for (const check of checks) {
  try {
    const response = await fetchWithTimeout(check.path);
    const body = await response.text();
    const includesExpected = !check.includes || body.includes(check.includes);
    if (response.status !== check.status || !includesExpected) {
      failures += 1;
      console.error(`FAIL ${check.path}: expected ${check.status}${check.includes ? ` and ${check.includes}` : ""}, got ${response.status}`);
      continue;
    }
    console.log(`PASS ${check.path}: ${response.status}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${check.path}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} smoke check(s) failed against ${baseUrl}`);
  process.exitCode = 1;
} else {
  console.log(`\nAll smoke checks passed against ${baseUrl}`);
}
