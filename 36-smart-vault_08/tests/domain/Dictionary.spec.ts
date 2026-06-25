import {Dictionary} from "../../src/domain/Dictionary";
import {AccessEvents} from "../../src/domain/AccessEvents";

describe('Dictionary', () => {
    describe('validation', () => {
        it('should throw when an access event has no description', () => {
            expect(() => aCompleteDictionary().deleting(AccessEvents.doorJammed).create()).toThrow(
                'Dictionary is missing a description for the following access events: doorJammed'
            );
        });

        it('should throw listing access events with missing descriptions', () => {
            expect(() => aCompleteDictionary().deleting(AccessEvents.doorJammed, AccessEvents.invalidCode).create()).toThrow(
                'Dictionary is missing a description for the following access events: invalidCode, doorJammed'
            );
        });
        
    });

    describe('get', () => {
        it('should return the value for an existing key', () => {
            const dictionary = aCompleteDictionary().create();

            expect(dictionary.get(AccessEvents.invalidCode)).toBe('Invalid code');
            expect(dictionary.get(AccessEvents.doorJammed)).toBe('Door jammed');
        });
    });
});

function aCompleteDictionary() {
       
    function createMappings(): Map<AccessEvents, string> {
        return new Map<AccessEvents, string>([
            [AccessEvents.invalidCode, 'Invalid code'],
            [AccessEvents.doorJammed, 'Door jammed']
        ])
    }
    
    return {
        deleting: function(... keys: AccessEvents[]): { create: () => Dictionary } {
            const mappings = createMappings();
            keys.forEach(k => mappings.delete(k)); 
            return {
                create: () => new Dictionary(mappings)  
            };
        },
        create: () => new Dictionary(createMappings())
    }
}
