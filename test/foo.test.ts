import { Station, bill } from "../lib";

describe("A single journey in zone A", () => {
  const taps: Array<Station> = [Station.Asterisk, Station.Aldgate];

  it("should charge £2.50 for the journey", () => {
    const [charge] = bill(taps);
    expect(charge.amount).toEqual(250);
  });
});

describe("One-Way Zone 1 to Zone 2 Journey", () => {
  const taps: Array<Station> = [Station.Asterisk, Station.Barbican];

  it("should charge £3.00 for the journey", () => {
    const [charge] = bill(taps);
    expect(charge.amount).toEqual(300);
  });
});

describe("Multiple journeys", () => {
  const taps: Array<Station> = [
    Station.Asterisk,
    Station.Aldgate,
    Station.Asterisk,
    Station.Balham,
  ];

  const charges = Array.from(bill(taps));

  it("should issue two charges", () => {
    expect(charges).toHaveLength(2);
  });
});

describe("Multiple journeys including zone B reaching daily cap", () => {
  const taps: Array<Station> = [
    Station.Asterisk,
    Station.Barbican,
    Station.Barbican,
    Station.Balham,
    Station.Balham,
    Station.Bison,
    Station.Bison,
    Station.Asterisk,
  ];

  const charges = Array.from(bill(taps));

  it("should charge 2.00 for his third journey", () => {
    expect(charges[2].amount).toEqual(200);
  });
});

describe("Multiple journeys in zone A reaching daily cap", () => {
  const taps: Array<Station> = [
    Station.Asterisk,
    Station.Aldgate,
    Station.Aldgate,
    Station.Angel,
    Station.Angel,
    Station.Antelope,
    Station.Antelope,
    Station.Asterisk,
  ];

  const charges = Array.from(bill(taps));

  it("should charge 2.00 for his third journey", () => {
    expect(charges[2].amount).toEqual(200);
  });
});

describe("When a journey starts in zone B and ends in zone A", () => {
  const taps = [Station.Bison, Station.Aldgate];

  it("should charge 3.00", () => {
    const [charge] = bill(taps);
    expect(charge.amount).toEqual(300);
  });
});

describe("Multiple return journeys", () => {
  const taps = [Station.Bison, Station.Aldgate];

  it("should charge 3.00", () => {
    const [charge] = bill(taps);
    expect(charge.amount).toEqual(300);
  });
});
