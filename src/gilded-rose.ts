export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    /*
      Conditions:
      - At the end of the day, both sellIn & quality are reduced for every item
      - Once sellIn date passes, quality degrades (*2) 👍
      - Quality is never negative 👍
      - 'Aged Brie' increases in quality, the older it gets 👍
      - quality is never > 50 👍
      - 'Sulfuras' does not have to be sold & does not reduce quality. 👍
      - 'Backstage passes' increases in quality as sellIn value approaches,
        quality increases by 2 when sellIn > 5 && <= 10 and by 3 when sellIn <= 5 && > 0
        it drops to 0 after concert 👍
      - 'Conjured' degrades in quality twice as fast as normal items 👍
      - Items to be considered => "Aged Brie", "Backstage passes", "Sulfuras", "Conjured", others.
     */
    for (let item of this.items) {
      // Check that item is not 'Aged Brie', 'Backstage passes',
      if (
        item.name !== "Aged Brie" &&
        item.name !== "Backstage passes" &&
        item.name !== "Sulfuras" &&
        item.name !== "Conjured"
      ) {
        // check if sellIn has passed and reduce quality by 1 or by 2 (depending...)
        if (item.sellIn > 0) {
          item.quality = item.quality > 1 ? item.quality - 1 : 0;
        } else {
          item.quality = item.quality > 2 ? item.quality - 2 : 0;
        }
      } else if (item.name === "Aged Brie") {
        // Account for 'Aged Brie'
        item.quality = item.quality < 50 ? item.quality + 1 : 50;
      } else if (item.name === "Backstage passes") {
        let incrementor = 0;
        if (item.sellIn > 10) {
          incrementor = 1;
        } else if (item.sellIn > 5 && item.sellIn <= 10) {
          incrementor = 2;
        } else if (item.sellIn <= 5 && item.sellIn > 0) {
          incrementor = 3;
        } else {
          incrementor = -item.quality;
        }

        item.quality =
          item.quality + incrementor < 50 ? item.quality + incrementor : 50;
      } else if (item.name === "Conjured") {
        // account for 'Conjured' to reduce twice as much as others
        if (item.sellIn > 0) {
          item.quality = item.quality > 2 ? item.quality - 2 : 0;
        } else {
          item.quality = item.quality > 4 ? item.quality - 4 : 0;
        }
      } else if (item.name === "Sulfuras") {
        item.quality = 80;
      }

      if (item.name !== "Sulfuras") {
        item.sellIn -= 1;
      }
    }

    return this.items;
  }
}

export const items = [
  new Item("Aged Brie", 7, 49),
  new Item("Backstage passes", 6, 25),
  new Item("Sulfuras", 4, 80),
  new Item("Conjured", 5, 15),
  new Item("Random", 1, 1),
];
