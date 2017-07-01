export class SyncProgress {
  constructor(
    public current: number,
    public highest: number
  ) {

  }
}

export interface Connections {
  connections?: Array<Connection>;
}

export interface Connection {
  id?:string;
  address?:string;
  last_sent?: number;
  last_received?:number;
  outgoing?:boolean;
  introduced?:boolean;
  mirror?: number;
  listen_port?: number;
}