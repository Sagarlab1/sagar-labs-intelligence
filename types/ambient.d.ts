/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "three" {
  const THREE: any;
  export = THREE;
}

declare module "cloudflare:workers" {
  export const env: { DB?: any; [key: string]: any };
}

declare type Fetcher = {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
};

declare type D1Database = any;
