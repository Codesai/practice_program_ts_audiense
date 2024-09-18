import {Thing} from "../src/Thing";
import {Finder} from "../src/Finder";
import {FT} from "../src/FT";

describe('FinderTests', () => {
    let sue = new Thing();
    let greg = new Thing();
    let sarah = new Thing();
    let mike = new Thing();

    beforeEach(() => {
        sue.name = "Sue";
        sue.birthDate = new Date(1950, 0, 1);
        greg.name = "Greg";
        greg.birthDate = new Date(1952, 5, 1);
        sarah.name = "Sarah";
        sarah.birthDate = new Date(1982, 0, 1);
        mike.name = "Mike";
        mike.birthDate = new Date(1979, 0, 1);
    });

    it('Returns_Empty_Results_When_Given_Empty_List', () => {
        let list: Thing[] = [];
        let finder = new Finder(list);
        let result = finder.Find(FT.One);
        expect(result.P1).toBeUndefined();
        expect(result.P2).toBeUndefined();
    });

    it('Returns_Empty_Results_When_Given_One_Person', () => {
        let list: Thing[] = [sue];
        let finder = new Finder(list);
        let result = finder.Find(FT.One);
        expect(result.P1).toBeUndefined();
        expect(result.P2).toBeUndefined();
    });

    it('Returns_Closest_Two_For_Two_People', () => {
        let list: Thing[] = [sue, greg];
        let finder = new Finder(list);
        let result = finder.Find(FT.One);
        expect(result.P1).toBe(sue);
        expect(result.P2).toBe(greg);
    });

    it('Returns_Furthest_Two_For_Two_People', () => {
        let list: Thing[] = [mike, greg];
        let finder = new Finder(list);
        let result = finder.Find(FT.Two);
        expect(result.P1).toBe(greg);
        expect(result.P2).toBe(mike);
    });

    it('Returns_Furthest_Two_For_Four_People', () => {
        let list: Thing[] = [sue, sarah, mike, greg];
        let finder = new Finder(list);
        let result = finder.Find(FT.Two);
        expect(result.P1).toBe(sue);
        expect(result.P2).toBe(sarah);
    });

    it('Returns_Closest_Two_For_Four_People', () => {
        let list: Thing[] = [sue, sarah, mike, greg];
        let finder = new Finder(list);
        let result = finder.Find(FT.One);
        expect(result.P1).toBe(sue);
        expect(result.P2).toBe(greg);
    });
});