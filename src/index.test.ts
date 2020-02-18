import { CheckTaxID } from './index';
test('Check Tax', () => {
  return CheckTaxID('0135556015413').then(data => {
    expect(data).toBe('Yes');
  });
});
