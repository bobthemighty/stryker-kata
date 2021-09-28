import { Station, bill } from "../lib";

describe("A single journey in zone A", () => {
  const journey: Array<Station> = [Station.Asterisk, Station.Aldgate];

  it("should charge £2.50 for the journey", () => {
    const [charge] = bill(journey);
    expect(charge.amount).toEqual(250);
  });
});

describe("One-Way Zone 1 to Zone 2 Journey", () => {
  const journey: Array<Station> = [Station.Asterisk, Station.Barbican];

  it("should charge £3.00 for the journey", () => {
    const [charge] = bill(journey);
    expect(charge.amount).toEqual(300);
  });
});

describe("Multiple journeys", () => {
  const journeys: Array<Station> = [
    Station.Asterisk,
    Station.Aldgate,
    Station.Asterisk,
    Station.Balham,
  ];

  const charges = Array.from(bill(journeys));

  it("should issue two charges", () => {
    expect(charges).toHaveLength(2);
  });
});

describe("Multiple journeys including zone B reaching daily cap", () => {
  const journeys: Array<Station> = [
    Station.Asterisk,
    Station.Barbican,
    Station.Barbican,
    Station.Balham,
    Station.Balham,
    Station.Bison,
    Station.Bison,
    Station.Asterisk,
  ];

  const charges = Array.from(bill(journeys));

  it("should charge 2.00 for his third journey", () => {
    expect(charges[2].amount).toEqual(200);
  });
});
