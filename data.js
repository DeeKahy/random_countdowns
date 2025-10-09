// Initialize Copium Tracker with JSON data
// Easy to edit format: just add/remove/modify estimates here

createCopiumTracker({
  mount: "#copium-tracker",
  countdownIds: {
    days: "days",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds",
  },
  estimates: [
    {
      id: "meta-connect-2025",
      label: "Meta Connect long-shot reveal (Seattle rumor swirl)",
      at: "2025-09-17T17:00:00-07:00",
      note: "Assumed Valve crash party",
      sources: [
        {
          label: "PC Gamer",
          url: "https://www.pcgamer.com/hardware/vr-hardware/the-valve-rumor-mill-goes-into-overdrive-as-vr-influencers-travel-to-seattle-for-what-seems-likely-to-be-the-imminent-reveal-of-the-steam-frame/",
          description: "Influencers reportedly invited to Seattle",
        },
      ],
    },
    {
      id: "snapdragon-summit-2025",
      label: "Snapdragon Summit 2025",
      at: "2025-09-25T14:00:00+00:00",
      note: "Possibly waiting for Snapdragon 8 Elite 2",
      sources: [
        {
          label: "Reddit Theory",
          url: "https://www.reddit.com/r/ValveDeckard/comments/1nk0wup/possibly_waiting_for_snapdragon_8_elite_2_at_the/",
          description: "Community speculation on chipset timing",
        },
      ],
    },

    {
      id: "holiday-2025-release",
      label: "Likely Steam Frame / Deckard release window",
      at: "2025-12-24T00:00:00Z",
      note: "Consensus 'Valve Time™' expectation — Black Friday & Christmas marketing surge",
      sources: [
        {
          label: "Community Synthesis",
          url: "https://www.reddit.com/r/ValveDeckard/",
          description: "Aggregated leak analysis",
        },
      ],
      updates: [
        {
          date: "2025-10-08",
          text: "WeChat article claimed Q4 2025 launch window (Black Friday/Christmas), then was removed",
        },
        {
          date: "2025-10-08",
          text: "Manufacturing leak clarified: Goertek and Taiwan facilities confirmed as OEMs",
        },
        {
          date: "2025-10-08",
          text: "UploadVR reports headset entered mass production (4-8 week lead time typical)",
        },
      ],
    },
  ],
});
