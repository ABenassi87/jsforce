import test from './util/ava/ext';
import { isNumber } from './util';
import Cache from '../src/cache';

/**
 *
 */
test.group('cache', (test) => {
  const cache = new Cache();
  let t1: number;
  let t2: number;
  let t3: number;
  let t4: number;
  let t5: number;

  const getTime = () =>
    new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(Date.now());
      }, 200);
    });

  const getTimeWithResCached = cache.createCachedFunction(getTime, null, {
    key: 'getTime',
    strategy: 'NOCACHE',
  });

  test('call response-cached getTime function and return time', async (t) => {
    t1 = await getTimeWithResCached();
    t.true(isNumber(t1));
  });

  test('call response-cached function and get different time', async (t) => {
    t2 = await getTimeWithResCached();
    t.true(isNumber(t2));
    t.true(t1 < t2);
  });

  const getTimeCacheIfHit = cache.createCachedFunction(getTime, null, {
    key: 'getTime',
    strategy: 'HIT',
  });

  test('call cacheable getTime function and get time which equals to latest call result', async (t) => {
    t3 = await getTimeCacheIfHit();
    t.true(isNumber(t3));
    t.true(t3 === t2);
  });

  const getTimeCacheImmediate: Function = cache.createCachedFunction(
    getTime,
    null,
    { key: 'getTime', strategy: 'IMMEDIATE' },
  );

  test('call cached function with immediate lookup strategy and get same time which equals to latest fn call result', (t) => {
    t4 = getTimeCacheImmediate();
    t.true(isNumber(t4));
    t.true(t4 === t3);
  });

  test('clear cache and call cache-first function and get time much newer than the latest', async (t) => {
    cache.clear();
    t5 = await getTimeCacheIfHit();
    t.true(isNumber(t5));
    t.true(t4 < t5);
  });
});
