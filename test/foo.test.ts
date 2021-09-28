import { Station, bill } from "../lib";

describe("A single journey in zone A", () => {
  const journey: Array<Station> = [Station.Asterisk, Station.Aldgate];

  it("should charge £2.50 for the journey", () => {
    const [charge] = bill(journey);
    expect(charge.amount).toEqual(250);
  });
});
