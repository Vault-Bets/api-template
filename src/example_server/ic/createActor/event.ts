import { createIcBlast } from '../index';
import {
  _SERVICE as EventService,
} from '../declarations/orderbook/orderbook.did';
import {idlFactory} from '../declarations/orderbook/orderbook.did.js';
import { ActorSubclass } from '@dfinity/agent';

export async function initializeEvent(canisterID: string): Promise<
  ActorSubclass<EventService>
> {
  const ic = await createIcBlast(canisterID); 
  return await ic(canisterID, idlFactory);
}
