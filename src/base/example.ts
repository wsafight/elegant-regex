import SuperExpressive from 'super-expressive';

const regex = SuperExpressive()
  .allowMultipleMatches
  .lineByLine
  .startOfInput
  .optional.string('0x')
  .capture
  .exactly(4).anyOf
  .range('A', 'F')
  .range('a', 'f')
  .range('0', '9')
  .end()
  .end()
  .endOfInput
  .toRegex();

export const resultCode = regex.source
console.log(resultCode)