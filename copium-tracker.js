/**
 * Copium Tracker™ — JSON-driven countdown with multiple sources & flexible updates
 * - Supports multiple sources per estimate
 * - Handles both time-based and general updates
 * - Auto-migrates past estimates to a "failed dates" log
 * - Stores state in localStorage (idempotent)
 * - Easy JSON configuration
 */
(function () {
  const STORAGE_KEY = "copium.estimates.v3";

  // --- utilities ---
  const nowMs = () => Date.now();
  const toMs = (iso) => new Date(iso).getTime();
  const fmt = (iso) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });

  function loadStore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { estimates: [] };
    } catch {
      return { estimates: [] };
    }
  }

  function saveStore(store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }

  function upsertEstimates(seed) {
    const store = loadStore();
    const byId = new Map(store.estimates.map((e) => [e.id, e]));
    for (const e of seed || []) {
      const prev = byId.get(e.id);
      byId.set(e.id, {
        missed: false,
        createdAt: prev?.createdAt || new Date().toISOString(),
        ...prev,
        ...e,
      });
    }
    store.estimates = Array.from(byId.values());
    saveStore(store);
    return store;
  }

  function pickNext(estimates) {
    const t = nowMs();
    return estimates
      .filter((e) => !e.missed && toMs(e.at) > t)
      .sort((a, b) => toMs(a.at) - toMs(b.at))[0];
  }

  function autosweepMisses(store) {
    const t = nowMs();
    let changed = false;
    for (const e of store.estimates) {
      if (!e.missed && toMs(e.at) <= t) {
        e.missed = true;
        e.missedAt = new Date().toISOString();
        changed = true;
      }
    }
    if (changed) saveStore(store);
    return changed;
  }

  function renderSources(sources) {
    if (!sources || sources.length === 0) return "";
    return sources
      .map(
        (src) =>
          `<a class="link text-blue-300 hover:text-blue-200" href="${src.url}" target="_blank" rel="noopener" title="${src.description || ""}">${src.label || "Source"}</a>`,
      )
      .join(" • ");
  }

  function renderUpdates(updates) {
    if (!updates || updates.length === 0) return "";
    return `<div class="space-y-1 mt-2 text-xs text-gray-400">
            ${updates.map((u) => `<div>📌 ${u.date ? `<span class="mono-font">${u.date}</span>: ` : ""}${u.text}</div>`).join("")}
        </div>`;
  }

  function renderUI(cfg, store) {
    const mount = document.querySelector(cfg.mount);
    if (!mount) return;
    const next = pickNext(store.estimates);
    const allFuture = store.estimates
      .filter((e) => !e.missed && toMs(e.at) > nowMs())
      .sort((a, b) => toMs(a.at) - toMs(b.at));

    mount.innerHTML = `
      <div class="card bg-base-100/20 backdrop-blur-md shadow-2xl border-2 border-purple-500/50 mb-6">
        <div class="card-body">
          <h3 class="text-2xl font-bold comic-font text-white mb-1">NEXT BEST ESTIMATE</h3>
          <div class="text-sm text-yellow-300 comic-font mb-3">
            ${next ? `${cfg.emojiNext || "🕒"} ${next.label} • ${fmt(next.at)}` : "No future dates. Add one with window.Copium.addEstimate(...)"}
          </div>
          <div class="flex justify-center">
            <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
              ${["days", "hours", "minutes", "seconds"]
                .map(
                  (k) => `
                <div class="flex flex-col p-2 rounded-box text-neutral-content border">
                  <span class="countdown justify-center font-mono text-5xl" id="${cfg.countdownIds[k]}">
                    <span style="--value:0"></span>
                  </span>
                  <span class="text-xs comic-font">${k}</span>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
          <div class="mt-3 text-center text-xs text-gray-300 comic-font">
            ${next ? (next.note ? next.note : "&nbsp;") : "&nbsp;"}
          </div>
          ${next && next.sources ? `<div class="text-center text-xs mt-2">${renderSources(next.sources)}</div>` : ""}
          ${next && next.updates ? renderUpdates(next.updates) : ""}
        </div>
      </div>
      ${
        allFuture.length > 0
          ? `
      <div class="card bg-base-100/20 backdrop-blur-md shadow-2xl border-2 border-blue-500/50 mb-6">
        <div class="card-body">
          <h3 class="text-2xl font-bold comic-font text-white mb-4">ALL FUTURE ESTIMATES</h3>
          <div class="space-y-6">
            ${allFuture
              .map(
                (event) => `
              <div class="border-b border-blue-300/30 pb-4 last:border-b-0 last:pb-0">
                <div class="text-center mb-3">
                  <h4 class="text-lg font-bold comic-font text-yellow-300">${event.label}</h4>
                  <div class="text-sm text-gray-300 comic-font">${fmt(event.at)}</div>
                </div>
                <div class="flex justify-center mb-2">
                  <div class="grid grid-flow-col gap-3 text-center auto-cols-max">
                    ${["days", "hours", "minutes", "seconds"]
                      .map(
                        (k) => `
                      <div class="flex flex-col p-2 rounded-box text-neutral-content border border-blue-400/30">
                        <span class="countdown justify-center font-mono text-2xl" id="${k}-${event.id}">
                          <span style="--value:0"></span>
                        </span>
                        <span class="text-xs comic-font">${k}</span>
                      </div>
                    `,
                      )
                      .join("")}
                  </div>
                </div>
                ${event.note ? `<div class="text-center text-xs text-gray-400 comic-font mb-1">${event.note}</div>` : ""}
                ${event.sources ? `<div class="text-center text-xs">${renderSources(event.sources)}</div>` : ""}
                ${event.updates ? renderUpdates(event.updates) : ""}
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </div>
      `
          : ""
      }
      <div class="card bg-base-100/20 backdrop-blur-md shadow-2xl border-2 border-red-500/50">
        <div class="card-body">
          <h3 class="text-2xl font-bold comic-font text-white mb-2">FAILED POTENTIAL DATES</h3>
          <div id="failed-list" class="overflow-x-auto">
            ${renderFailedTable(store)}
          </div>
        </div>
      </div>
    `;
  }

  function renderFailedTable(store) {
    const failed = store.estimates
      .filter((e) => e.missed)
      .sort((a, b) => toMs(b.at) - toMs(a.at));
    if (!failed.length) {
      return `<div class="text-sm text-gray-400 comic-font">Nothing failed… yet. 😅</div>`;
    }
    return `
      <table class="table table-zebra text-sm">
        <thead>
          <tr>
            <th class="comic-font">When it was supposed to happen</th>
            <th class="comic-font">Label</th>
            <th class="comic-font">Marked failed</th>
            <th class="comic-font">Sources / Note</th>
          </tr>
        </thead>
        <tbody>
          ${failed
            .map(
              (e) => `
            <tr>
              <td class="mono-font">${fmt(e.at)}</td>
              <td>${e.label}</td>
              <td class="mono-font">${e.missedAt ? fmt(e.missedAt) : "—"}</td>
              <td class="text-gray-300">${e.sources ? renderSources(e.sources) : e.note || ""}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
    `;
  }

  function setCountdownValues(ids, distanceMs) {
    const clamp = (n) => (n < 0 ? 0 : n);
    const days = Math.floor(distanceMs / 86400000);
    const hours = Math.floor((distanceMs % 86400000) / 3600000);
    const minutes = Math.floor((distanceMs % 3600000) / 60000);
    const seconds = Math.floor((distanceMs % 60000) / 1000);
    const write = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = `<span style="--value:${clamp(val)};"></span>`;
    };
    write(ids.days, days);
    write(ids.hours, hours);
    write(ids.minutes, minutes);
    write(ids.seconds, seconds);
  }

  function startTicker(cfg, store) {
    const tick = () => {
      const changed = autosweepMisses(store);
      const next = pickNext(store.estimates);
      const allFuture = store.estimates
        .filter((e) => !e.missed && toMs(e.at) > nowMs())
        .sort((a, b) => toMs(a.at) - toMs(b.at));

      if (changed) {
        renderUI(cfg, loadStore());
        return;
      }

      // Update main countdown
      if (!next) {
        setCountdownValues(cfg.countdownIds, 0);
      } else {
        const dist = toMs(next.at) - nowMs();
        if (dist <= 0) {
          setCountdownValues(cfg.countdownIds, 0);
        } else {
          setCountdownValues(cfg.countdownIds, dist);
        }
      }

      // Update all individual event countdowns
      allFuture.forEach((event) => {
        const dist = toMs(event.at) - nowMs();
        const eventIds = {
          days: `days-${event.id}`,
          hours: `hours-${event.id}`,
          minutes: `minutes-${event.id}`,
          seconds: `seconds-${event.id}`,
        };
        if (dist <= 0) {
          setCountdownValues(eventIds, 0);
        } else {
          setCountdownValues(eventIds, dist);
        }
      });
    };
    tick();
    return setInterval(tick, 1000);
  }

  // --- public API (single entry) ---
  window.createCopiumTracker = function createCopiumTracker(config) {
    const cfg = {
      mount: config.mount || "#copium-tracker",
      countdownIds: {
        days: (config.countdownIds && config.countdownIds.days) || "days",
        hours: (config.countdownIds && config.countdownIds.hours) || "hours",
        minutes:
          (config.countdownIds && config.countdownIds.minutes) || "minutes",
        seconds:
          (config.countdownIds && config.countdownIds.seconds) || "seconds",
      },
      emojiNext: config.emojiNext || "",
    };

    const store = upsertEstimates(config.estimates || []);
    renderUI(cfg, store);
    const handle = startTicker(cfg, store);

    window.Copium = {
      addEstimate: (est) => {
        const s = upsertEstimates([est]);
        renderUI(cfg, s);
      },
      list: () => loadStore().estimates,
      clearHistory: () => {
        const s = loadStore();
        s.estimates = s.estimates.map((e) => ({
          ...e,
          missed: false,
          missedAt: undefined,
        }));
        saveStore(s);
        renderUI(cfg, s);
      },
      _stop: () => clearInterval(handle),
    };
    return window.Copium;
  };
})();
