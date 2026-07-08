export interface FriendshipNote {
  id: number;
  title: string;
  message: string;
}

export interface StickyNote {
  id: number;
  message: string;
  rotation: number; // Random-like degree rotation for sticky notes aesthetic
  color: string;    // Tailwind color class
}

export interface AmazingCard {
  id: number;
  title: string;
  description: string;
  iconName: string; // The Lucide icon string
}

export const FRIENDSHIP_NOTES: FriendshipNote[] = [
  {
    id: 1,
    title: "The Rare Gem of Friendship",
    message: "A friend like you is a rare gem, Muneeza. Your presence brings a steady warmth that makes the hard days feel light and the good days even brighter. Having someone as sincere and kind as you in my life is a true blessing."
  },
  {
    id: 2,
    title: "Your Unwavering Kindness",
    message: "In a world that is often busy and hurried, your kindness is a gentle pause. Thank you for always listening with an open mind and a caring heart. Your empathy toward others never goes unnoticed."
  },
  {
    id: 3,
    title: "The Power of Your Smile",
    message: "Your smile has this amazing ability to lift the mood of any room. It carries a genuine warmth that makes others feel safe and valued. Never let the challenges of life dull that bright light you carry."
  },
  {
    id: 4,
    title: "An Inspiring Journey",
    message: "Watching you grow, tackle challenges, and chase your goals has been truly inspiring. Your determination, persistence, and positive outlook are things I deeply admire and learn from every single day."
  },
  {
    id: 5,
    title: "A Trustworthy Anchor",
    message: "True friends are like anchors in a storm. Thank you for being someone I can always count on—your trust, absolute reliability, and genuine nature mean the world to me. I'm incredibly grateful."
  },
  {
    id: 6,
    title: "Positivity and Light",
    message: "You radiate a gentle optimism that encourages everyone around you to look at the brighter side. Your cheerful spirit is an incredible gift, and it acts as a constant reminder that goodness is always around us."
  },
  {
    id: 7,
    title: "Celebrating Your Achievements",
    message: "On your birthday, I want to celebrate not just another year of your life, but all the amazing milestones you have reached. Your dedication has brought you so far, and this is just the beginning of your grand story."
  },
  {
    id: 8,
    title: "An Intellectual Spark",
    message: "Our conversations are always filled with depth, intelligence, and curiosity. I deeply value how much I learn just by discussing things with you. You have a remarkably brilliant and analytical mind."
  },
  {
    id: 9,
    title: "Your Creative Spirit",
    message: "Whether it is your unique ideas, your elegant perspective on life, or your personal projects—your creativity shines through beautifully. Keep dreaming big, thinking outside the box, and designing your path!"
  },
  {
    id: 10,
    title: "A Helper at Heart",
    message: "You are always the first to offer help, support, or a comforting word when someone is going through a tough time. That selflessness is what makes you such an extraordinary friend, Muneeza."
  },
  {
    id: 11,
    title: "Strength of Character",
    message: "Your integrity, strong character, and principles are deeply admirable. You stand up for what is right with quiet grace and unyielding confidence. You are a person of high values."
  },
  {
    id: 12,
    title: "The Gift of Laughter",
    message: "Thank you for the lighthearted moments, the sudden laughs, and the wonderful memories we have shared. They are precious treasures that I will carry with me forever. Here is to making many more!"
  },
  {
    id: 13,
    title: "Bright Horizons",
    message: "When I look at your potential, I see a future that is absolutely limitless. You possess the talent, intellect, and drive to turn all your biggest aspirations into beautiful realities. Believe in yourself!"
  },
  {
    id: 14,
    title: "Continuous Growth",
    message: "Life is a journey of constant learning and evolving. Seeing you embrace every chapter, lesson, and hurdle with quiet courage, wisdom, and dignity is a truly beautiful thing to witness."
  },
  {
    id: 15,
    title: "My Heartfelt Wish",
    message: "Muneeza, I wish you a year ahead filled with peace, robust health, immense happiness, and the fulfillment of your heart's greatest aspirations. Thank you for being such an amazing friend. Happy Birthday!"
  }
];

export const STICKY_NOTES: StickyNote[] = [
  {
    id: 1,
    message: "May your year be as bright and inspiring as you are! 🌟 Keep shining!",
    rotation: -3,
    color: "from-amber-200/90 to-yellow-300/90 text-amber-950"
  },
  {
    id: 2,
    message: "Always believe in your strength, Muneeza. You can conquer any goal! 💪",
    rotation: 2,
    color: "from-sky-200/90 to-blue-300/90 text-sky-950"
  },
  {
    id: 3,
    message: "Sending you endless positive vibes and warm birthday blessings! ✨",
    rotation: -1,
    color: "from-emerald-200/90 to-teal-300/90 text-emerald-950"
  },
  {
    id: 4,
    message: "Keep shining your wonderful light on the world—it makes a difference! 🌞",
    rotation: 4,
    color: "from-rose-200/90 to-pink-300/90 text-rose-950"
  },
  {
    id: 5,
    message: "Here is to exciting new chapters, grand milestones, and beautiful dreams! 🚀",
    rotation: -4,
    color: "from-purple-200/90 to-violet-300/90 text-purple-950"
  },
  {
    id: 6,
    message: "Your incredible kindness is a superpower. Never let the world change that! 💖",
    rotation: 1,
    color: "from-fuchsia-200/90 to-pink-200/90 text-fuchsia-950"
  },
  {
    id: 7,
    message: "May absolute happiness and laughter follow you in every single step. 🌸",
    rotation: 3,
    color: "from-orange-200/90 to-amber-300/90 text-orange-950"
  },
  {
    id: 8,
    message: "Wishing you perfect health, peace, success, and beautiful memories! 🎈",
    rotation: -2,
    color: "from-teal-100/90 to-cyan-200/90 text-teal-950"
  }
];

export const AMAZING_CARDS: AmazingCard[] = [
  {
    id: 1,
    title: "Kind Heart",
    description: "You approach everyone with genuine empathy and warmth, leaving an indelible imprint of grace wherever you go.",
    iconName: "Heart"
  },
  {
    id: 2,
    title: "Positive Nature",
    description: "A steady, bright optimism that lights up cloudy days and spreads comforting hope to everyone around you.",
    iconName: "Sun"
  },
  {
    id: 3,
    title: "Confidence",
    description: "A quiet, elegant inner strength that allows you to face obstacles head-on with resilience and dignity.",
    iconName: "Sparkles"
  },
  {
    id: 4,
    title: "Creativity",
    description: "An imaginative, observant mind that easily finds unique solutions, deep beauty, and art in the details of life.",
    iconName: "Palette"
  },
  {
    id: 5,
    title: "Intelligence",
    description: "Sharp wisdom, intellectual depth, and a thoughtful perspective that enriches every single conversation.",
    iconName: "Brain"
  },
  {
    id: 6,
    title: "Helpful Personality",
    description: "Always the first to offer assistance, a guiding hand, or a supportive word, driven by pure selflessness.",
    iconName: "HandHelping"
  },
  {
    id: 7,
    title: "Strong Character",
    description: "Unwavering integrity, high principles, and a dependable spirit that naturally inspires deep trust.",
    iconName: "Gem"
  },
  {
    id: 8,
    title: "Beautiful Smile",
    description: "A radiant, incredibly sincere smile that effortlessly brightens up the atmosphere and lifts spirits.",
    iconName: "Smile"
  },
  {
    id: 9,
    title: "Big Dreams",
    description: "A visionary approach to your future, aiming for the highest peaks while appreciating the beautiful journey.",
    iconName: "Compass"
  },
  {
    id: 10,
    title: "Great Future",
    description: "Equipped with brilliant talent, quiet discipline, and deep character, heading towards a path of spectacular accomplishments.",
    iconName: "Award"
  }
];
