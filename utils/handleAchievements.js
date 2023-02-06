export const sumWin = () => {
  const wins = JSON.parse(localStorage.getItem("wins"));
  localStorage.setItem("wins", JSON.stringify(wins + 1));

  const roadToHero = JSON.parse(localStorage.getItem("roadToHero"));
  if (roadToHero.lose) {
    localStorage.setItem("roadToHero", JSON.stringify({ lose: true, win: true }));
  }

  // restart loses for rows
  localStorage.setItem("loses", JSON.stringify(0));
};

export const sumLose = () => {
  const loses = JSON.parse(localStorage.getItem("loses"));
  localStorage.setItem("loses", JSON.stringify(loses + 1));
  localStorage.setItem("roadToHero", JSON.stringify({ lose: true, win: false }));

  // restart wins for rows
  localStorage.setItem("wins", JSON.stringify(0));
};

export const firstWin = () => {
  const id = 1;
  const achievements = JSON.parse(localStorage.getItem("achievements"));
  if (achievements[id - 1].completed) return;
  achievements[id - 1].completed = true;
  localStorage.setItem("achievements", JSON.stringify(achievements));
};

export const firstLose = () => {
  const id = 2;
  const achievements = JSON.parse(localStorage.getItem("achievements"));
  if (achievements[id - 1].completed) return;
  achievements[id - 1].completed = true;
  localStorage.setItem("achievements", JSON.stringify(achievements));
};

export const threeWinsInARow = () => {
  const id = 3;
  const achievements = JSON.parse(localStorage.getItem("achievements"));
  if (achievements[id - 1].completed) return;
  const wins = JSON.parse(localStorage.getItem("wins"));
  if (wins < 3) return;
  achievements[id - 1].completed = true;
  localStorage.setItem("achievements", JSON.stringify(achievements));
};

export const threeLosesInARow = () => {
  const id = 4;
  const achievements = JSON.parse(localStorage.getItem("achievements"));
  if (achievements[id - 1].completed) return;
  const loses = JSON.parse(localStorage.getItem("loses"));
  if (loses < 3) return;
  achievements[id - 1].completed = true;
  localStorage.setItem("achievements", JSON.stringify(achievements));
};

export const roadToHero = () => {
  const id = 5;
  const achievements = JSON.parse(localStorage.getItem("achievements"));
  if (achievements[id - 1].completed) return;
  const roadToHero = JSON.parse(localStorage.getItem("roadToHero"));
  if (!roadToHero.lose || !roadToHero.win) return;
  achievements[id - 1].completed = true;
  localStorage.setItem("achievements", JSON.stringify(achievements));
};

export const secretAchievement404 = ({ word }) => {
  if (word !== "ICE CREAM" && word !== "HELADO") return;
  const id = 6;
  const achievements = JSON.parse(localStorage.getItem("achievements"));
  if (achievements[id - 1].completed) return;
  achievements[id - 1].completed = true;
  localStorage.setItem("achievements", JSON.stringify(achievements));
};
