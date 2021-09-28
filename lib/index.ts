export enum Station {
  Asterisk,
  Aldgate,
  Barbican,
}

interface Charge {
  from: Station;
  to: Station;
  amount: number;
}

export function bill(journeys: Array<Station>): Array<Charge> {
  if (journeys[1] === Station.Barbican)
    return [{ from: journeys[0], to: journeys[1], amount: 300 }];
  return [{ from: journeys[0], to: journeys[1], amount: 250 }];
}
