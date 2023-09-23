// mikronode.d.ts

declare module 'mikronode' {
    import { EventEmitter } from 'events';
    import { Socket } from 'net';
  
    export class Connection extends EventEmitter {
      constructor(socket: Socket);
  
      login(username: string, password: string): Promise<void>;
      write(command: string): Promise<string>;
      close(): void;
    }
  
    export class MikroNode {
      constructor(host: string, port: number);
      connect(): Promise<Connection>;
    }
  }
  