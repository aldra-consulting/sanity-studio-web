import { type Environment } from '.';

declare global {
  interface Window {
    env: Environment;
  }
}
