import { SHA3 } from 'sha3';

export const Sha3Factory = (string: string): string => {
  const hash = new SHA3(512);

  return hash.update(string).digest('hex');
};
