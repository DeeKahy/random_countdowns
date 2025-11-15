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
      id: "official-announcement-nov-2025",
      label:
        "🎉 OFFICIAL ANNOUNCEMENT - Steam Frame, Steam Controller, & Steam Machine!",
      at: "2025-11-12T10:00:00-08:00",
      note: "WE WEREN'T DELULU! Valve officially announced all three products for early 2026 release!",
      sources: [
        {
          label: "Official Valve Announcement",
          url: "https://store.steampowered.com/steamframe",
          description:
            "Steam Frame, Steam Controller, and Steam Machine announced",
        },
      ],
      updates: [
        {
          date: "2025-11-12",
          text: "Steam Frame: Wireless VR headset (standalone or PC streaming) - priced under $1000",
        },
        {
          date: "2025-11-12",
          text: "Steam Machine: Console-like gaming PC, 6x more powerful than Steam Deck, 4K@60fps",
        },
        {
          date: "2025-11-12",
          text: "Steam Controller: Split gamepad design for VR use",
        },
        {
          date: "2025-11-12",
          text: "All three products targeting early 2026 release in Steam Deck regions",
        },
      ],
    },
    {
      id: "early-2026-release",
      label:
        "Steam Frame, Steam Controller & Steam Machine - OFFICIAL EARLY 2026 RELEASE",
      at: "2026-03-31T23:59:59-07:00",
      note: "REDEMPTION ARC COMPLETE - Our hopium was justified! Early 2026 release window (Q1 estimate)",
      sources: [
        {
          label: "Valve Official",
          url: "https://store.steampowered.com/steamframe",
          description: "Official early 2026 release confirmation",
        },
      ],
    },
  ],
});
