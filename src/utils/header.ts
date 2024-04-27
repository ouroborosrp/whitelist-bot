import figlet from 'figlet';
import gradient from 'gradient-string';

export const printHeader = () => {
  console.log(
    gradient.retro(
      figlet.textSync('WhitelistBot', { font: 'Big Money-nw' }) +
        '\nA Discord bot that manages IP whitelisting for your FiveM server.' +
        '\nCreated and maintained by @stormix (https://stormix.co)' +
        Array(2).fill('\n').join(''),
    ),
  );
};
