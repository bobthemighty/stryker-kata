export enum Station {
  Asterisk,
  Aldgate,
  Barbican,
  Balham,
}

enum Zone {
  A,
  B,
}

interface Journey {
  origin: Station;
  destination: Station;
}

interface Charge extends Journey {
  amount: number;
}

const zoneFor = (s: Station): Zone => (s < Station.Barbican ? Zone.A : Zone.B);

const chargeFor = (journey: Journey) => {
  if (zoneFor(journey.destination) === Zone.B) {
    return { ...journey, amount: 300 };
  }
  return { ...journey, amount: 250 };
};

export function* bill(journeys: Array<Station>): Generator<Charge> {
  for (let i = 0; i < journeys.length; i += 2) {
    yield chargeFor({
      origin: journeys[i],
      destination: journeys[i + 1],
    });
  }
}
