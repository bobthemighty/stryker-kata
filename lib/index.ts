export enum Station {
  Asterisk,
  Aldgate,
  Barbican,
  Balham,
  Bison,
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
const DAILY_CAP = 800;

const priceFor = (journey: Journey) => {
  if (zoneFor(journey.destination) === Zone.B) {
    return 300;
  }
  return 250;
};

export function* bill(journeys: Array<Station>): Generator<Charge> {
  let total = 0;

  for (let i = 0; i < journeys.length; i += 2) {
    const journey = { origin: journeys[i], destination: journeys[i + 1] };
    const basePrice = priceFor(journey);

    const charge = {
      ...journey,
      amount: Math.min(basePrice, DAILY_CAP - total),
    };

    total += charge.amount;

    yield charge;
  }
}
