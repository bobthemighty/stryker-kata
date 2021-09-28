export enum Station {
  Asterisk,
  Aldgate,
  Barbican,
}

enum Zone {
  A,
  B,
}

const zoneFor = (s: Station): Zone => (s < Station.Barbican ? Zone.A : Zone.B);

interface Charge {
  from: Station;
  to: Station;
  amount: number;
}

export function bill(journeys: Array<Station>): Array<Charge> {
  const zone = zoneFor(journeys[1]);
  if (zone === Zone.B)
    return [{ from: journeys[0], to: journeys[1], amount: 300 }];
  return [{ from: journeys[0], to: journeys[1], amount: 250 }];
}
