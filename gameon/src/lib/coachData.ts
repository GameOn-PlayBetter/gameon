export interface Coach {
  name: string;
  title: string;
  tags: string[];
  description: string;
  rating: number;
  reviews: number;
  price: number;
}

export const coachData: Coach[] = [
  {
    name: "David Chen",
    title: "Speedrun Coach",
    tags: ["Leadership", "Speedrun"],
    description: "15+ years helping gamers improve their speedrunning stats.",
    rating: 4.9,
    reviews: 124,
    price: 50,
  },
  {
    name: "Sarah Johnson",
    title: "Team Tactics Coach",
    tags: ["Co-op", "Strategy"],
    description:
      "Veteran team player helping squads dominate multiplayer titles with expert strategy, callouts, and co-op synergy.",
    rating: 4.8,
    reviews: 89,
    price: 60,
  },
  {
    name: "Michael Torres",
    title: "Mind Game Coach",
    tags: ["Tilt Control", "Focus Training"],
    description:
      "Guiding players to overcome mental tilt, stay calm under pressure, and master focus for high-stakes matches.",
    rating: 5.0,
    reviews: 156,
    price: 50,
  },
  {
    name: "Rachel Kim",
    title: "Rank-Up Coach",
    tags: ["Meta Mastery", "Role Optimization"],
    description:
      "Boosting players to climb ranked ladders by perfecting game knowledge, adapting to patch cycles, and refining roles.",
    rating: 4.9,
    reviews: 201,
    price: 25,
  },
  {
    name: "James Wilson",
    title: "Pro Circuit Coach",
    tags: ["Esports Prep", "Performance Under Pressure"],
    description:
      "Ex-pro turning grinders into contenders with scrim-ready drills, mental fortitude, and tournament pacing strategies.",
    rating: 4.7,
    reviews: 267,
    price: 80,
  },
  {
    name: "Emma Martinez",
    title: "Creative Builder Coach",
    tags: ["Sandbox Games", "World Design"],
    description:
      "Helping players craft jaw-dropping builds in Minecraft, Fortnite Creative, and other sandbox titles with style and flair.",
    rating: 4.8,
    reviews: 143,
    price: 60,
  },
];