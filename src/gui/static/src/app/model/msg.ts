export interface Connections {
  connections?: Array<Connection>;
}

export interface Connection {
  id?: string;
  address?: string;
  last_sent?: number;
  last_received?: number;
  outgoing?: boolean;
  introduced?: boolean;
  mirror?: number;
  listen_port?: number;
}

export interface BlcokChainProgress {
  current?: number;
  highest?: number;
  peers?: Array<BlcokChainProgressPeer>;
}

export interface BlcokChainProgressPeer {
  address?: string;
  height?: number;
}