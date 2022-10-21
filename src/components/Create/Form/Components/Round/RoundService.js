const KEYS = {
  rounds: "rounds",
  roundId: "roundId"
};

export const getRoundTypes = () => [
  { id: "1", title: "Qualifiiers" },
  { id: "2", title: "Quarter-finals" },
  { id: "3", title: "Semi-finals" },
  { id: "4", title: "Finals" }
];

export function insertRound(data) {
  let rounds = getAllRounds();
  data["id"] = generateRoundId();
  rounds.push(data);
  localStorage.setItem(KEYS.rounds, JSON.stringify(rounds));
}

export function updateRound(data) {
  let rounds = getAllRounds();
  let recordIndex = rounds.findIndex((x) => x.id == data.id);
  rounds[recordIndex] = { ...data };
  localStorage.setItem(KEYS.rounds, JSON.stringify(rounds));
}

export function deleteRound(id) {
  let rounds = getAllRounds();
  rounds = rounds.filter((x) => x.id != id);
  localStorage.setItem(KEYS.rounds, JSON.stringify(rounds));
}

export function generateRoundId() {
  if (localStorage.getItem(KEYS.roundId) == null)
    localStorage.setItem(KEYS.roundId, "0");
  var id = parseInt(localStorage.getItem(KEYS.roundId));
  localStorage.setItem(KEYS.roundId, (++id).toString());
  return id;
}

export function getAllRounds() {
  if (localStorage.getItem(KEYS.rounds) == null)
    localStorage.setItem(KEYS.rounds, JSON.stringify([]));
  let rounds = JSON.parse(localStorage.getItem(KEYS.rounds));
  let departments = getDepartmentCollection();
  return rounds.map((x) => ({
    ...x,
    department: departments[x.departmentId - 1].title
  }));
}
