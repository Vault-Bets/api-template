import { hashIdentity } from '@infu/icblast';

const identity = hashIdentity(process.argv[2]);
const principal = identity.getPrincipal().toString();

console.log(principal)