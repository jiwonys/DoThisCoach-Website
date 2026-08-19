/**
 * Comparison page data.
 *
 * Rules this file exists to enforce:
 *
 * 1. Every statement about another product is something that product publishes
 *    about itself, recorded with the URL it came from and the date it was read.
 * 2. No claim that a competitor *lacks* something. We cannot verify absence from
 *    a marketing page, and asserting it is how comparison content becomes both
 *    false and legally interesting. Where we could not verify a capability, the
 *    row says so in those words.
 * 3. Competitor names are used only to identify the products being compared.
 *    No logos, no marks in headings styled to look like endorsement.
 *
 * Re-verify before editing any figure. App Store in-app purchase lists change,
 * and they are the only place these companies publish prices at all.
 */

export const VERIFIED_ON = "August 19, 2026";

export const dothis = {
  name: "DoThis",
  listing: "https://apps.apple.com/us/app/dothis-ai-coach-for-athletes/id6771322181",
  subtitle: "Plans, Workouts & Nutrition",
  download: "Free",
  pricing: "Premium Monthly $12.99; Premium Yearly $119.99",
  trial: "7 days free",
  platforms: "iPhone (iOS 15.1+), Mac (Apple silicon, macOS 12+), Apple Vision",
  programming: "Workouts generated per session, then adjusted from the sets you actually completed",
};

export const comparisons = [
  {
    slug: "dothis-vs-fitbod",
    competitor: "Fitbod",
    title: "DoThis vs Fitbod",
    seoTitle: "DoThis vs Fitbod: An Honest Comparison | DoThis",
    description:
      "A sourced comparison of DoThis and Fitbod: pricing, platforms, how each builds workouts, and which one suits an athlete training around a sport schedule.",
    published: "2026-08-19",
    summary:
      "Both generate workouts algorithmically and adapt to your equipment. The clearest difference in what each publishes about itself is the organising principle: Fitbod describes building around muscle recovery, DoThis builds around the days you compete.",
    sources: [
      { label: "Fitbod on the App Store", url: "https://apps.apple.com/us/app/fitbod-workout-gym-planner/id1041517543" },
      { label: "fitbod.me", url: "https://fitbod.me/" },
    ],
    facts: [
      { row: "App Store subtitle", ours: "Plans, Workouts & Nutrition", theirs: "AI Personal Trainer & Workouts" },
      { row: "Download price", ours: "Free", theirs: "Free" },
      { row: "In-app purchases listed", ours: "Monthly $12.99; Yearly $119.99", theirs: "Monthly plans at $12.99 and $15.99; A Year of Fitbod Elite at $79.99 and $95.99, plus legacy tiers" },
      { row: "Apple platforms listed", ours: "iPhone, Mac (Apple silicon), Apple Vision", theirs: "iPhone, iPad, Mac, Apple Vision, Apple Watch" },
      { row: "Android", ours: "Not offered", theirs: "Listed on fitbod.me" },
      { row: "How programming is described", ours: "Generated per session, adjusted from your completed sets", theirs: "“Science-backed, proprietary algorithm” using logged workout data" },
      { row: "Equipment handling", ours: "Session rebuilt around the equipment you have that day", theirs: "“Fully customize your equipment settings” for bodyweight, bands, or limited gear" },
      { row: "Third-party integrations", ours: "Not published", theirs: "Apple Health, Strava, Fitbit" },
    ],
    theirStrength:
      "Fitbod publishes a wider platform list than DoThis, including iPad, Apple Watch, and Android, and names integrations with Apple Health, Strava, and Fitbit. If you track across several services or want the workout on your wrist, that is a real advantage and DoThis does not currently match it.",
    ourStrength:
      "DoThis is built around a competition schedule. You tell it when you play, and it places lifting so a heavy leg session does not land the day before a match, cuts volume when fixtures pile up, and keeps durability work in the plan when the week gets tight.",
    whoEach: [
      { who: "Choose Fitbod if", why: "you train in a gym without a fixed competition calendar, want Apple Watch or Android, or already live inside Strava and Fitbit." },
      { who: "Choose DoThis if", why: "you play a sport on a schedule and want lifting placed around matches, and you want to import a plan a coach already gave you." },
    ],
    faq: [
      { question: "Do both apps adjust to my equipment?", answer: "Yes. Both publish equipment customisation. Fitbod describes settings for bodyweight, bands, and limited gear; DoThis rebuilds the session around what you have that day." },
      { question: "Which is cheaper?", answer: "On the figures listed above, DoThis Premium Monthly and Fitbod's lower monthly tier are both $12.99. Fitbod's listed annual tiers are lower than DoThis at $79.99 and $95.99 against $119.99. Check current prices before deciding." },
      { question: "Can I move my history over?", answer: "We cannot verify an export path from Fitbod, so assume you would start fresh. DoThis can import a workout you paste in, which is not the same as importing a training history." },
    ],
  },
  {
    slug: "dothis-vs-ladder",
    competitor: "Ladder",
    title: "DoThis vs Ladder",
    seoTitle: "DoThis vs Ladder: An Honest Comparison | DoThis",
    description:
      "A sourced comparison of DoThis and Ladder: pricing, how programs are written, coaching model, and which suits an athlete training around a sport.",
    published: "2026-08-19",
    summary:
      "These are different products more than competing ones. Ladder sells human coaches writing weekly programming for a team you join. DoThis generates a plan for you and adapts it from your logged sets. The price gap follows directly from that.",
    sources: [
      { label: "Ladder on the App Store", url: "https://apps.apple.com/us/app/ladder-strength-training/id1502936453" },
      { label: "joinladder.com", url: "https://www.joinladder.com/" },
    ],
    facts: [
      { row: "App Store subtitle", ours: "Plans, Workouts & Nutrition", theirs: "Fitness, Workouts, Coaching" },
      { row: "Download price", ours: "Free", theirs: "Free" },
      { row: "In-app purchases listed", ours: "Monthly $12.99; Yearly $119.99", theirs: "PRO $29.99 / $179.99 annual; PRO+ $34.99 / $329.99; ELITE $44.99 / $449.99; ELITE+ $49.99 / $479.99" },
      { row: "Free trial", ours: "7 days free", theirs: "7-day free trial, “no credit card needed”" },
      { row: "Apple platforms listed", ours: "iPhone, Mac (Apple silicon), Apple Vision", theirs: "iPhone, iPad, Mac, Apple Vision, Apple Watch" },
      { row: "Who writes the program", ours: "Generated per session from your profile, schedule, and completed sets", theirs: "“Created by an expert coach and new each week”" },
      { row: "Structure", ours: "Individual plan", theirs: "Join a coach's team; 26+ teams listed, each with its own philosophy" },
      { row: "Community", ours: "Not published", theirs: "Community chat with coaches and teammates" },
    ],
    theirStrength:
      "Ladder gives you a named human coach and a group training alongside you. For people who stay consistent because someone is expecting them, that is worth more than any algorithm, and it is something DoThis does not offer at all.",
    ourStrength:
      "DoThis adapts to one athlete rather than a cohort. A team's weekly program cannot know that your match moved to Thursday or that your gym has no rack today. It is also roughly a third to a sixth of Ladder's listed subscription tiers.",
    whoEach: [
      { who: "Choose Ladder if", why: "accountability and community are what keep you training, and you want a human coach's programming." },
      { who: "Choose DoThis if", why: "your week is irregular, you need lifting placed around competition, or the coached tiers are outside your budget." },
    ],
    faq: [
      { question: "Is a human coach better than a generated plan?", answer: "For adherence, often yes. For fitting an irregular week, a fixed weekly program cannot adjust to a moved match or missing equipment the way a per-session generator can. They solve different problems." },
      { question: "Why is Ladder more expensive?", answer: "Its listed tiers pay human coaches writing new programming weekly. The prices above are what each App Store listing shows; whether the coaching is worth the difference depends on whether you need accountability or flexibility." },
      { question: "Do both have a free trial?", answer: "Yes. Both list seven days. Ladder states no credit card is needed to start." },
    ],
  },
  {
    slug: "dothis-vs-volt",
    competitor: "Volt",
    title: "DoThis vs Volt",
    seoTitle: "DoThis vs Volt Athletics: An Honest Comparison | DoThis",
    description:
      "A sourced comparison of DoThis and Volt: pricing, sport coverage, how programs are built, and which suits an individual athlete rather than a team.",
    published: "2026-08-19",
    summary:
      "Volt is the closest of the three to DoThis: both are sport-aware and both describe adaptive programming. The main difference is who each is sold to. Volt's business includes schools, colleges, and organisations; DoThis only sells to the individual athlete.",
    sources: [
      { label: "Volt: Gym & Home Workout Plans on the App Store", url: "https://apps.apple.com/us/app/volt-gym-home-workout-plans/id1189345596" },
      { label: "voltathletics.com", url: "https://www.voltathletics.com/" },
    ],
    facts: [
      { row: "App Store subtitle", ours: "Plans, Workouts & Nutrition", theirs: "Fitness Training for Any Goal" },
      { row: "Download price", ours: "Free", theirs: "Free" },
      { row: "In-app purchases listed", ours: "Monthly $12.99; Yearly $119.99", theirs: "Training Monthly $19.99; 3 Month $39.99; Yearly $129.99; sport-performance items from $9.99 to $69.99" },
      { row: "Apple platforms listed", ours: "iPhone, Mac (Apple silicon), Apple Vision", theirs: "iPhone, iPad, iPod touch, Mac (M1+), Apple Vision Pro" },
      { row: "How programming is described", ours: "Generated per session, adjusted from your completed sets", theirs: "“Cortex®” AI adjusting in real time, programs “built by expert CSCS-certified coaches”" },
      { row: "Sport coverage", ours: "Sport schedule and sport type shape the plan", theirs: "“40+ sports, activities, and training goals”" },
      { row: "Exercise library", ours: "Not published as a count", theirs: "“3,000+ movements” with HD video demonstrations" },
      { row: "Sold to teams and organisations", ours: "No; individual athletes only", theirs: "Yes; schools, colleges, military, and enterprises, with a separate Volt for Coaches app" },
    ],
    theirStrength:
      "Volt has institutional depth DoThis does not: CSCS-certified coaches behind the programming, a 3,000-movement library with HD video, 40-plus sports, and a coach-facing product for running a whole squad. If you are a coach programming for a team, DoThis is not built for you and Volt is.",
    ourStrength:
      "DoThis is narrower on purpose. It plans one athlete's week around their own fixtures, rebuilds a session when the equipment changes, and takes a workout someone else wrote and folds it into the plan. Its listed monthly and annual prices are below Volt's listed training tiers.",
    whoEach: [
      { who: "Choose Volt if", why: "you want programming with named certification behind it, a large video library, or you are a coach responsible for a squad." },
      { who: "Choose DoThis if", why: "you are an individual recreational athlete who wants a plan that reacts to your week rather than a program you follow." },
    ],
    faq: [
      { question: "Are both sport-specific?", answer: "Both describe sport-specific programming. Volt publishes coverage of 40-plus sports and sells to teams; DoThis focuses on the individual athlete's schedule and equipment." },
      { question: "Which is cheaper?", answer: "On the figures above, DoThis lists $12.99 monthly and $119.99 yearly against Volt's $19.99 monthly and $129.99 yearly training tiers. Volt also lists cheaper one-off sport-performance items, so compare like for like." },
      { question: "Does DoThis work for a team?", answer: "No. There is no coach-facing product and no squad management. If you need to program for a team, Volt has a product for that and DoThis does not." },
    ],
  },
];
