import { DefaultConig } from "../config/config";

export function getScreenSize(): string {
  console.log({ windowSize: window.innerWidth + "x" + window.innerHeight });

  return window.innerWidth + "x" + window.innerHeight;
}

export function getScreenItemLimit(): number {
  let screenItemLimit = DefaultConig.LIMIT;
  let windowWidth = Number(getScreenSize().split("x")[0]);
  console.log({ windowWidth });
  if (windowWidth <= 500) {
    screenItemLimit = 10;
  } else if (windowWidth > 500 && windowWidth <= 1080) {
    screenItemLimit = 20;
  } else if (windowWidth > 1080 && windowWidth <= 1280) {
    screenItemLimit = 30;
  } else if (windowWidth > 1280 && windowWidth <= 1440) {
    screenItemLimit = 30;
  } else if (windowWidth > 1440 && windowWidth <= 1920) {
    screenItemLimit = 30;
  } else if (windowWidth > 1920 && windowWidth <= 2048) {
    screenItemLimit = 100;
  } else {
    screenItemLimit = 10;
  }

  return screenItemLimit;
}

export function calculateTotalPages(limit: number, totalItem: number): number {
  return Math.ceil(totalItem / limit);
}

export function calculateWindowSize(limit: number): number {
  return limit * DefaultConig.DEFAULT_WINDOW_MULTIPLER;
}

export function calculateArrayLength<T>(array: T[]): number {
  return array.length;
}

export const throttle = (callback: Function, delay: number) => {
  let throttleTimeout: ReturnType<typeof setTimeout> | null = null;
  let storedEvent: any = null;

  const throttledEventHandler = (event: any) => {
    storedEvent = event;

    const shouldHandleEvent = !throttleTimeout;

    if (shouldHandleEvent) {
      callback(storedEvent);

      storedEvent = null;

      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;

        if (storedEvent) {
          throttledEventHandler(storedEvent);
        }
      }, delay);
    }
  };

  return throttledEventHandler;
};
