import icblast, { hashIdentity } from '@infu/icblast';
import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

const identity = hashIdentity(process.env.HASH_IDENTITY!);
export const principal = identity.getPrincipal().toString();
export const createIcBlast = async (canisterID: string) => {
    const agent = new HttpAgent({
      host: 'https://ic0.app',
      identity,
    });
    agent.syncTime(Principal.fromText(canisterID));
    return icblast({ identity: identity, actorOptions: { agent: agent } });
  };