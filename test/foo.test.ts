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

  it("should charge £2.50 for the first journey", () => {
    expect(charges[0]).toMatchObject({
      from: Station.Asterisk,
      to: Station.Aldgate,
      amount: 250,
    });
  });

  it("should charge £3.00 for the second journey", () => {
    expect(charges[1]).toMatchObject({
      from: Station.Asterisk,
      to: Station.Balham,
      amount: 300,
    });
  });
});
