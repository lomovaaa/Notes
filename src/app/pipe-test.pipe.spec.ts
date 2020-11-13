import { PipeTestPipe } from './pipe-test.pipe';

describe('PipeTestPipe', () => {
  it('create an instance', () => {
    const pipe = new PipeTestPipe();
    expect(pipe).toBeTruthy();
  });
});
