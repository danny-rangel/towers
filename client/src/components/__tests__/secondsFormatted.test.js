import secondsFormatted from '../../utils/secondsFormatted';


it('formats seconds', () => {
    expect(secondsFormatted(60)).toEqual('1:00');
    expect(secondsFormatted(59)).toEqual('0:59');
    expect(secondsFormatted(0)).toEqual('0:00');
});