/* global jest, describe, expect */
import * as math from 'mathjs';
import InlineCalculator from '../index';
jest.mock('mathjs', () => {
  return {
    eval: jest.fn()
  };
});

describe('InlineCalculator', () => {
  let input;

  beforeEach(() => {
    document.body.innerHTML = '<input type="text" id="inline-calculator">';
    new InlineCalculator();
    input = document.getElementById('inline-calculator');
    input.value = '2 + 2';
  });

  it('should do nothing', () => {
    input.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'f',
    }));

    expect(math.eval).not.toBeCalled();
    expect(input.value).toBe('2 + 2');
  });

  it('should update input value', () => {
    math.eval.mockReturnValueOnce(4);

    input.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter',
    }));

    expect(math.eval).toBeCalledWith('2 + 2');
    expect(input.value).toBe('4');
  });
});
