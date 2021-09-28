export enum Station {
  Asterisk,
  Aldgate,
}

interface Charge {
  from: Station;
  to: Station;
  amount: number;
}

export function bill(journeys: Array<Station>): Array<Charge> {
  return [{ from: journeys[0], to: journeys[1], amount: 250 }];
}
