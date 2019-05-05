import { selectSong } from '../index';
import { SELECT_SONG } from '../types';


describe('selectSong', () => {
    it('has the correct type', () => {
        const action = selectSong();

        expect(action.type).toEqual(SELECT_SONG);
    });  

    it('has the correct payload', () => {
        const action = selectSong({});

        expect(action.payload).toEqual({});
    });  
});