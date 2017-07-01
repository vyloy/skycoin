import { Component, AfterViewInit, ViewEncapsulation } from "@angular/core";
import { BlockSyncService } from "../services/skycoin.sync.service";
import { Observable } from "rxjs";
import { SyncProgress, Connections, Connection } from "../model/sync.progress";
import { ApiService } from "../services/api.service";

declare var _: any;

@Component({
  selector: 'skycoin-block-sync',
  template: `


             <div class="sync-div-container">

                <div *ngIf="conns.length <= 0 && initConns">
                    <h4>No Peers</h4>
                </div>

             <ul class="fa-ul">
  <li><i class="fa-li fa fa-spinner fa-spin" *ngIf="syncDone == false"></i>
  <span *ngIf="currentWalletNumber>0">{{currentWalletNumber}} of {{highestWalletNumber}} blocks syncned</span>
  <span *ngIf="currentWalletNumber==0">Syncing wallet</span>
  </li>
</ul>
              
               
              </div>
            
              `,
  encapsulation: ViewEncapsulation.None,
  providers: [BlockSyncService, ApiService]
})

export class SkycoinSyncWalletBlock implements AfterViewInit {

  _syncProgress: Observable<SyncProgress>;
  public handlerSync: any;
  syncDone: boolean;
  conns: Array<Connection> = [];
  initConns = false;
  currentWalletNumber: number;
  highestWalletNumber: number;
  _syncConnsTimer: any;
  constructor(private _syncService: BlockSyncService, private api: ApiService) {
    this.currentWalletNumber = this.highestWalletNumber = 0;
    this.syncDone = false;
  }

  ngAfterViewInit(): any {
    this._syncConnsTimer = setInterval(() => {
      this.getConnections();
    }, 5000);
    this.handlerSync = setInterval(() => {
      if (this.highestWalletNumber - this.currentWalletNumber <= 1 && this.highestWalletNumber != 0) {
        clearInterval(this.handlerSync);
        this.syncDone = true;
      }
      this.syncBlocks();
    }, 2000);
  }
  getConnections() {
    this.api.getConns().subscribe((conns: Connections) => {
      this.initConns = true;
      this.conns = conns.connections;
    });
  }
  syncBlocks(): any {
    this._syncProgress = this._syncService.getSyncProgress();
    this._syncProgress.subscribe((syncProgress: SyncProgress) => {
      this.currentWalletNumber = syncProgress.current;
      this.highestWalletNumber = syncProgress.highest;
    });


  }
}

