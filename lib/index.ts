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

interface State {
  total: number;
  cap: number;
  previousJourney?: Journey;
}

const zoneFor = (s: Station): Zone => (s < Station.Barbican ? Zone.A : Zone.B);
const DAILY_CAP_ZONE_B = 800;
const DAILY_CAP_ZONE_A = 700;

const isZoneB = (journey: Journey) =>
  zoneFor(journey.origin) === Zone.B || zoneFor(journey.destination) === Zone.B;

const isReturn = (state: State, journey: Journey) =>
  state.previousJourney !== undefined &&
  journey.origin === state.previousJourney.destination &&
  journey.destination === state.previousJourney.origin;

const priceFor = (state: State, journey: Journey) => {
  let basePrice = isZoneB(journey) ? 300 : 250;
  if (isReturn(state, journey)) basePrice -= 50;
  return Math.min(basePrice, state.cap - state.total);
};

function* journeysFromTaps(stations: Array<Station>): Generator<Journey> {
  for (let i = 0; i < stations.length; i += 2) {
    yield { origin: stations[i], destination: stations[i + 1] };
  }
}

export function* bill(taps: Array<Station>): Generator<Charge> {
  const state: State = { total: 0, cap: DAILY_CAP_ZONE_A };

  for (const journey of journeysFromTaps(taps)) {
    if (isZoneB(journey)) state.cap = DAILY_CAP_ZONE_B;

    const amount = priceFor(state, journey);

    yield {
      ...journey,
      amount,
    };

    state.total += amount;
    state.previousJourney = journey;
  }
}
