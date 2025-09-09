import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose", () => {

    it("aged brie increases in quality the older it gets", () => {
        const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(1);
    });

    it("should return something", ( )=> {
        const gildedRose = new Shop([new Item("foo", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("foo");
    });

    it("sulfuras never has to be sold or decreases in quality", () => {
        const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(80);
    });

    it("backstage passes increase in quality as sellIn approaches", () => {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(21);
    });

    it("backstage passes increase in quality twice as fast as sellIn is in 10 or less days", () => {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 9, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(22);
    });

    it("backstage passes increase in quality thrice as fast as sellIn is in 5 or less days", () => {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(23);
    });

    it("backstage passes quality drops to 0 after the concert", () => {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
    });

    it("conjured items degrade in quality twice as fast as normal items", () => {
        const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(5);
    });

    it("quality of an item is never negative", () => {
        const gildedRose = new Shop([new Item("foo", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBeGreaterThanOrEqual(0);
    });

    it("quality of an item is never more than 50", () => {
        const gildedRose = new Shop([new Item("Aged Brie", 2, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBeLessThanOrEqual(50);
    });

    it("sellIn decreases by 1 for normal items", () => {
        const gildedRose = new Shop([new Item("foo", 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(9);
    });

    it("sellIn decreases by 1 for conjured items", () => {
        const gildedRose = new Shop([new Item("Conjured Mana Cake", 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(9);
    });
});
