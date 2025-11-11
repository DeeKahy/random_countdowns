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
      id: "november-12-bradly",
      label: "November 12th",
      at: "2025-11-12T12:00:00-08:00",
      note: "No specific time, just the day",
      sources: [
        {
          label: "bradly said so",
          description: "bradly said so",
        },
      ],
    },
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
      id: "steam-next-fest-oct-2025",
      label: "Steam Next Fest: October 2025",
      at: "2025-10-13T10:00:00-07:00",
      note: "Perfect time to reveal hardware alongside gaming demos?",
      sources: [
        {
          label: "Steam Store",
          url: "https://store.steampowered.com/sale/nextfest",
          description: "Official Steam Next Fest page",
        },
      ],
    },
    {
      id: "black-friday-2025",
      label: "Black Friday 2025",
      at: "2025-11-28T00:00:00-08:00",
      note: "Traditional shopping frenzy — ideal for hardware launch",
      sources: [
        {
          label: "Community Speculation",
          url: "https://www.reddit.com/r/ValveDeckard/",
          description: "Q4 2025 rumors align with Black Friday timing",
        },
      ],
    },
    {
      id: "game-awards-2025",
      label: "The Game Awards 2025",
      at: "2025-12-11T17:00:00-08:00",
      note: "Biggest gaming event of the year — Valve could steal the show",
      sources: [
        {
          label: "The Game Awards",
          url: "https://thegameawards.com/",
          description: "Official Game Awards website",
        },
      ],
    },
    {
      id: "steam-winter-sale-2025",
      label: "Steam Winter Sale 2025",
      at: "2025-12-18T10:00:00-08:00",
      note: "Steam's biggest sale — perfect timing for hardware + game bundles",
      sources: [
        {
          label: "Steamworks",
          url: "https://steamcommunity.com/groups/steamworks/announcements/detail/497187349280587904",
          description: "Official Steam sale dates announcement",
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
          text: "article claimed Q4 2025 launch window (Black Friday/Christmas), then was removed",
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
