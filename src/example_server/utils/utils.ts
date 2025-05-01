import {
  ImmutableOrder,
  OrderSide,
  OrderStatus,
} from "../ic/declarations/orderbook/orderbook.did";
import { Event, EventCanister } from "../models/events";

export const roundToNearest05 = (num: number) => {
  return Math.round(num * 20) / 20;
};

export const isEventToday = (event: Pick<Event, "date">) => {
  const now = new Date();
  const eventDate = new Date(event.date);
  const isToday =
    now.getFullYear() === eventDate.getFullYear() &&
    now.getMonth() === eventDate.getMonth() &&
    now.getDate() === eventDate.getDate();

  return isToday;
};

/**
 * Calculates the time until an hour before a given event.
 *
 * @param {EventCanister} event - The event for which to calculate the time until.
 * @return {number} The time until an hour before the event in milliseconds.
 */
export const getTimeUntilEvent = (event: EventCanister): number => {
  const fixtureStartTime = new Date(event.event.date);
  const eventTime = new Date(fixtureStartTime.getTime());
  const now: Date = new Date();
  const startDelay = eventTime.getTime() - now.getTime();
  const startDelayMinutes = startDelay / 60000;

  return startDelay;
};

export const isEventLive = (event: EventCanister) => {
  const fixtureStartTime = new Date(event.event.date);
  const eventTime = new Date(fixtureStartTime.getTime());
  const now: Date = new Date();  

  return eventTime < now;
};

/**
 * Returns a Date object representing the date that is `days` number of days from the current date.
 *
 * @param {number} days - The number of days from the current date.
 * @return {Date} The Date object representing the date that is `days` number of days from the current date.
 */
export const getRelativeDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export const roundToNearestHundredThousand = (num: number) => {
  return Math.round(num / 100_000) * 100_000;
};

export const roundToNearestFiveMillion = (num: number): number => {
  const roundFactor = 5_000_000;
  return Math.round(num / roundFactor) * roundFactor;
};

export const randomPercentageWithinRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Function to replace BigInt with string when using JSON.stringify
 *
 * @param key - The key of the property being serialized.
 * @param value - The value of the property being serialized.
 * @return The serialized value.
 */
export const replacer = (key, value) => {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
};

/**
 * Serializes an object into a JSON string
 *
 * @param jsonObject - The object to be serialized.
 * @return string.
 */
export const stringifyJson = (jsonObject: any) => {
  return JSON.stringify(jsonObject, replacer);
};

interface ImmutableOrderNumber {
  id: string;
  status: OrderStatus;
  eventId: number;
  premium: number;
  initialContracts: number;
  createdAt: number;
  side: OrderSide;
  user: string;
  currentContracts: number;
  marketId: number;
}

export const convertBigIntToNumber = (
  orders: ImmutableOrder[]
): ImmutableOrderNumber[] => {
  return orders.map((order) => ({
    id: order.id,
    eventId: Number(order.eventId),
    initialContracts: Number(order.initialContracts),
    currentContracts: Number(order.currentContracts),
    createdAt: Number(order.createdAt),
    marketId: Number(order.marketId),
    premium: Number(order.premium),
    status: order.status,
    user: order.user.toText(),
    side: order.side,
    processedByUserbook: order.processedByUserbook,
    updatedAt: Number(order.updatedAt),
    stake: Number(order.stake),
    isFreeBet: order.isFreeBet,
  }));
};

/**
 * Convert bigInts to numbers
 */
export const convertJSON = (jsonObject: any) => {
  return JSON.parse(jsonObject, replacer);
};
