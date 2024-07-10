import { createIcBlast } from '../index';
import {
  _SERVICE as tradingBotService,
} from '../declarations/tradingBot/tradingBot.did';
import {idlFactory} from '../declarations/tradingBot/tradingBot.did.js';
import { ActorSubclass } from '@dfinity/agent';

export async function initializeTradingBot(canisterID: string): Promise<
  ActorSubclass<tradingBotService>
> {
  const ic = await createIcBlast(canisterID); 
  return await ic(canisterID, idlFactory)};
