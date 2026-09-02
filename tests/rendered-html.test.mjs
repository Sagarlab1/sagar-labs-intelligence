import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the Sagar Labs experience shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Sagar Labs/);
  assert.match(html, /Every great decision begins/);
  assert.match(html, /Humanity/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Lorem ipsum/i);
});

test("renders representative routes", async () => {
  for (const path of ["/how-it-works", "/infrastructure-signal", "/nova-broom-carousel", "/decision-intelligence", "/decision-room", "/scenario-explorer", "/evidence-explorer", "/ceo-summary", "/use-cases", "/pricing", "/about", "/contact", "/client-login"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    if (path === "/nova-broom-carousel") {
      const html = await response.text();
      assert.match(html, /Nova y Broom/);
      assert.match(html, /slide-01\.png/);
    }
  }
});
