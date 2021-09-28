export enum Station {
  Asterisk,
  Aldgate,
  Barbican,
}

enum Zone {
  A,
  B,
}

interface Journey {
  from: Station;
  to: Station;
}

interface Charge extends Journey {
  amount: number;
}

const zoneFor = (s: Station): Zone => (s < Station.Barbican ? Zone.A : Zone.B);

interface Charge {
  from: Station;
  to: Station;
  amount: number;
}

const chargeFor = (journey: Journey) => {
  if (zoneFor(journey.to) === Zone.B) return { ...journey, amount: 300 };
  return { ...journey, amount: 250 };
};

export function bill(journeys: Array<Station>): Array<Charge> {
  const journey = { from: journeys[0], to: journeys[1] };
  return [chargeFor(journey)];
}
