import { RequestIdLoggerMiddleware } from './request-id-logger.middleware';

describe('RequestIdLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new RequestIdLoggerMiddleware()).toBeDefined();
  });
});
