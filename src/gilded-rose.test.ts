import { Item, GildedRose } from "./gilded-rose";
/*
  Conditions:
  - At the end of the day, both sellIn & quality are reduced for every item 👍
  - Once sellIn date passes, quality degrades (*2) 👍
  - Quality is never negative 👍
  - 'Aged Brie' increases in quality, the older it gets 👍
  - quality is never > 50 👍
  - 'Sulfuras' does not have to be sold & does not reduce quality. 👍
  - 'Backstage passes' increases in quality as sellIn value approaches,
    quality increases by 2 when sellIn > 5 && <= 10 and by 3 when sellIn <= 5 && > 0
    it drops to 0 after concert 👍
  - 'Conjured' degrades in quality twice as fast as normal items 👍
*/
describe("Test non-special items", () => {
  const mockItems = [
    new Item("Aged Brie", 7, 49),
    new Item("Backstage passes", 6, 25),
    new Item("Sulfuras", 4, 15),
    new Item("Conjured", 5, 15),
    new Item("Random", 4, 10),
    new Item("Other Item", 1, 11),
  ];
  const testShop = new GildedRose(mockItems);

  test("At the end of the day, both sellIn and quality are reduced for every normal item", () => {
    const randomIndex = 4;
    const randomQualityValue = testShop.items[randomIndex].quality;
    testShop.updateQuality();
    expect(testShop.items[randomIndex].quality).toEqual(randomQualityValue - 1);
  });

  test("Once sellIn date passes, quality degrades (*2)", () => {
    // The item 'Other Item' has a sellIn value below 1
    const otherItemIndex = 5;
    const currentQualityValue = testShop.items[otherItemIndex].quality;
    testShop.updateQuality();
    expect(testShop.items[otherItemIndex].quality).toEqual(
      currentQualityValue - 2
    );
  });
});

describe("Quality is never negative or above 50", () => {
  const mockItems = [new Item("Aged Brie", 7, 49), new Item("Conjured", 5, 1)];
  const testShop = new GildedRose(mockItems);

  test("Quality does not drop below 0", () => {
    const conjuredItemIndex = 1;
    // Perform one update cycle, which takes 2 quality points
    testShop.updateQuality();
    expect(testShop.items[conjuredItemIndex].quality).not.toBeLessThan(0);
  });

  test("Quality is never above 50", () => {
    const agedBrieIndex = 0;
    // N.B: 'Aged Brie' increases in quality, the older it gets, and is at 50 after previous update
    testShop.updateQuality();
    expect(testShop.items[agedBrieIndex].quality).not.toBeGreaterThan(50);
  });
});

describe("'Sulfuras' does not have to be sold & does not reduce quality from 80.", () => {
  const oldQuality = 80;
  const mockItems = [new Item("Sulfuras", 4, oldQuality)];
  const testShop = new GildedRose(mockItems);

  test("Sulfuras quality does not reduce after an update", () => {
    const sulfurasIndex = 0;
    testShop.updateQuality();
    expect(testShop.items[sulfurasIndex].quality).toEqual(oldQuality);
  });
});

describe("Backstage Passes", () => {
  // 'Backstage passes' increases in quality as sellIn value approaches,
  //   quality increases by 2 when sellIn > 5 && <= 10 and by 3 when sellIn <= 5 && > 0
  //   it drops to 0 after concert 👍
  test("Backstage Passes increase in quality as sellIn value approaches 0", () => {
    const initialQuality = 25;
    const mockItems = [new Item("Backstage passes", 6, initialQuality)];
    const testShop = new GildedRose(mockItems);

    testShop.updateQuality();
    const finalQuality = testShop.items[0].quality;
    expect(finalQuality).toBeGreaterThan(initialQuality);
  });

  test("Backstage Passes quality increase by 2 when sellIn > 5 && <= 10", () => {
    const initialSellIn = 7;
    const initialQuality = 25;
    const mockItems = [
      new Item("Backstage passes", initialSellIn, initialQuality),
    ];
    const testShop = new GildedRose(mockItems);

    testShop.updateQuality();
    const finalQuality = testShop.items[0].quality;
    expect(finalQuality - initialQuality).toEqual(2);
  });

  test("Backstage Passes quality increase by 3 when sellIn < 5 && > 0", () => {
    const initialSellIn = 3;
    const initialQuality = 25;
    const mockItems = [
      new Item("Backstage passes", initialSellIn, initialQuality),
    ];
    const testShop = new GildedRose(mockItems);

    testShop.updateQuality();
    const finalQuality = testShop.items[0].quality;
    expect(finalQuality - initialQuality).toEqual(3);
  });

  test("Backstage Passes quality drops to 0 after the concert", () => {
    const initialSellIn = 0;
    const initialQuality = 25;
    const mockItems = [
      new Item("Backstage passes", initialSellIn, initialQuality),
    ];
    const testShop = new GildedRose(mockItems);

    testShop.updateQuality();
    const finalQuality = testShop.items[0].quality;
    expect(finalQuality).toEqual(0);
  });
});

describe("'Conjured' degrades in quality twice as fast as normal items", () => {
  test("'Conjured' degrades in quality twice as fast as normal items", () => {
    const initialQuality = 10;
    const mockItems = [new Item("Conjured", 5, initialQuality)];
    const testShop = new GildedRose(mockItems);

    testShop.updateQuality();
    const finalQuality = testShop.items[0].quality;

    expect(initialQuality - finalQuality).toEqual(2);
  });
});

describe("'Aged Brie' increases in quality, the older it gets", () => {
  test("'Aged Brie' increases in quality, the older it gets", () => {
    const initialQuality = 10;
    const mockItems = [new Item("Aged Brie", 5, initialQuality)];
    const testShop = new GildedRose(mockItems);

    testShop.updateQuality();
    const finalQuality = testShop.items[0].quality;

    expect(finalQuality).toBeGreaterThan(initialQuality);
  });
});
