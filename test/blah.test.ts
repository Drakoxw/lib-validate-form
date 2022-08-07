import { Validator } from '../src';


describe('validador de forms Strings', () => {
  it('string ok', () => {
    expect(Validator('hola mundo').string()).toEqual(true);
  });
  it('string error', () => {
    expect(Validator(66).string()).toEqual(false);
  });
});

describe('validador de forms Numbers', () => {
  it('number', () => {
    expect(Validator(777).number()).toEqual(true);
  });
  it('numberString', () => {
    expect(Validator('777').number()).toEqual(true);
  });
  it('numberString Error', () => {
    expect(Validator('error').number()).toEqual(false);
  });
});

describe('validador de forms Fechas', () => {

  it('dates OK', () => {
    expect(Validator('2022/08/05').date()).toEqual(true);
  });
  it('dates Error', () => {
    expect(Validator('2022/08/0').date()).toEqual(false);
  });
});

describe('validador de forms Valores Permitidos', () => {

  it('allowed OK', () => {
    expect(Validator(5).allowed([3,5,7,9])).toEqual(true);
  });
  it('allowed Error', () => {
    expect(Validator(2).allowed([3,5,7,9])).toEqual(false);
  });
  it('allowed string OK', () => {
    expect(Validator('tres').allowed(['uno', 'dos', 'tres', 'cuatro'])).toEqual(true);
  });
  it('allowed string Error', () => {
    expect(Validator(2).allowed(['uno', 'dos', 'tres', 'cuatro'])).toEqual(false);
  });

});
