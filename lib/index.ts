export enum Station {
  Asterisk,
  Aldgate,
  Angel,
  Antelope,
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
const DAILY_CAP_ZONE_B = 800;
const DAILY_CAP_ZONE_A = 700;

const priceFor = (journey: Journey) => {
  if (zoneFor(journey.destination) === Zone.B) {
    return 300;
  }
  return 250;
};

function* journeysFromTaps(stations: Array<Station>): Generator<Journey> {
  for (let i = 0; i < stations.length; i += 2) {
    yield { origin: stations[i], destination: stations[i + 1] };
  }
}

interface State {
  total: number;
  cap: number;
}

export function* bill(taps: Array<Station>): Generator<Charge> {
  const state = { total: 0, cap: DAILY_CAP_ZONE_A };

  for (const journey of journeysFromTaps(taps)) {
    if (
      zoneFor(journey.origin) === Zone.B ||
      zoneFor(journey.destination) === Zone.B
    )
      state.cap = DAILY_CAP_ZONE_B;

    const basePrice = priceFor(journey);

    const charge = {
      ...journey,
      amount: Math.min(basePrice, state.cap - state.total),
    };

    state.total += charge.amount;

    yield charge;
  }
}
