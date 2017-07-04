import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Connection, Connections, BlcokChainProgress } from '../../model/msg'

declare function getBoundingClientRect(): any;

@Component({
  selector: 'connection-status',
  templateUrl: 'app/components/connection-status/connection-status.component.html',
  styleUrls: ['app/components/connection-status/connection-status.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService]
})

export class ConnectionStatusComponent implements OnInit {
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Input() position = 'bottom';
  @ViewChild('statusBox') statusBox: ElementRef
  conns: Array<Connection> = [];
  blcokChainProgress: BlcokChainProgress = null;
  blcokChainProgressPeerSize = 0;
  maxItem = 20;
  progressTimer: any;
  tmpTimer: any;
  status = 'bad';
  info = false;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getConns();
    setInterval(() => {
      this.getConns();
    }, 5000);
    // TODO Test
    this.getProgress();
  }
  getConns() {
    this.api.getConns().subscribe((res: Connections) => {
      this.conns = res.connections;
      this.status = this.getStatus(this.conns.length);
    })
  }
  openAll(ev: Event) {
    ev.stopImmediatePropagation();
    ev.stopPropagation();
    this.close();
    this.open.emit(true);
  }
  setMax() {
    if (this.getClientRect().height < 480) {
      this.maxItem = 5;
    } else {
      this.maxItem = 20;
    }
  }
  getClientRect() {
    return { height: window.innerHeight, width: window.innerWidth };
  }
  getProgress() {
    this.api.getProgress().subscribe((res: BlcokChainProgress) => {
      let size = res.peers.length;
      this.blcokChainProgressPeerSize = size;
      if (size > 30) {
        this.setMax();
        res.peers = res.peers.slice(0, this.maxItem + 1);
      }
      this.blcokChainProgress = res;
    })
  }
  setDirection() {
    let position = this.getPosition();
    let el = this.getClientRect();
  }

  getPosition() {
    return this.statusBox.nativeElement.getBoundingClientRect();
  }
  showInfo(ev: Event) {
    if (this.tmpTimer) {
      clearTimeout(this.tmpTimer);
      clearInterval(this.progressTimer);
    }
    this.getProgress();
    this.progressTimer = setInterval(() => {
      this.getProgress();
    }, 5000)
    this.info = true;
  }
  hideInfo(ev: Event) {
    this.tmpTimer = setTimeout(() => {
      this.close();
      this.tmpTimer = null;
    }, 500);

  }

  close() {
    clearInterval(this.progressTimer);
    this.info = false;
  }
  getStatus(len: number) {
    let status
    if (len >= 4) {
      status = 'great';
    } else if (len < 4 && len != 0) {
      status = 'medium'
    } else {
      status = 'bad';
    }
    return status;
  }


}