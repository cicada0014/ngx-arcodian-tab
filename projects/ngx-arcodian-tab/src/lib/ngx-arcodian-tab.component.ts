import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-arcodian-tabs',
  templateUrl: './ngx-arcodian-tabs.component.html',
  styleUrls: ['./ngx-arcodian-tabs.component.scss']
})
export class NgxArcodianTabComponent implements OnInit {

  @Input('tabs') tabs: { label: string, active?: boolean }[];
  @Input('columnCount') columnCount: number = 3;

  @Output('onSelectTab') onSelectTab: EventEmitter<any> = new EventEmitter();


  convertedTabs: { label: string }[][] = [];;
  rowHeight: number = 36;

  rowIndexForSelectedTab: number = 0;
  tabIndexForSelectedTab: number = 0;

  isDoing: boolean = false;
  isNoneTabContent: boolean = false;

  constructor() { }

  ngOnInit() {
    let rowCount = 0;
    this.tabs.forEach((tab) => {
      if (this.convertedTabs[rowCount] && this.convertedTabs[rowCount].length == this.columnCount) {
        rowCount++;
      }
      if (!this.convertedTabs[rowCount]) {
        this.convertedTabs[rowCount] = [];
      }
      this.convertedTabs[rowCount].push(tab)

    })


  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let targetRowContent = document.getElementById('ngx-arcodian-tab-content' + this.rowIndexForSelectedTab);
      let targetRow = document.getElementById('tab-row' + this.rowIndexForSelectedTab);
      if (targetRowContent) {
        targetRowContent.appendChild(document.getElementById('content-target'))
        targetRow.style.height = (targetRowContent.clientHeight ? targetRowContent.clientHeight + this.rowHeight : this.rowHeight) + 'px';
      } else {
        targetRow.style.height = this.rowHeight + 'px';
      }
    }, 0);

  }






  arcodianAnimate(rowIndex: number, selectedTabIndex: number, ) {
    return new Promise((resolve, reject) => {
      try {
        let _rowIndex;
        // 선택된 값과 매개변수로 들어온 \rowIndex가 다르다는 것은 기존의 것을 선택하지 않았다는 이야기
        // 반대로 같은 값이면 같은 탭 row을 선택했다는 이야기가 된다. 
        // 다른 걸 선택했을 경우 데이터를 미리 보여주기 위해 
        // 같은 걸 선택했을 경우 데이터를 바로 없애지 않고 애니메이션이 끝나고 보여주기 위해 차이를 둔다.
        if (this.rowIndexForSelectedTab != rowIndex || (this.rowIndexForSelectedTab == rowIndex && selectedTabIndex > -1)) {
          this.isNoneTabContent = false;
          _rowIndex = rowIndex;
        } else {
          _rowIndex = -1;
        }

        setTimeout(() => {
          let currOpenRow;
          let targetRowContent;
          if (_rowIndex > -1) {
            if (this.rowIndexForSelectedTab > -1) {
              currOpenRow = document.getElementById('tab-row' + this.rowIndexForSelectedTab);
              if (currOpenRow) {
                currOpenRow.style.height = this.rowHeight + 'px';
              }
            }
            this.rowIndexForSelectedTab = rowIndex;
          }
          setTimeout(() => {
            if (_rowIndex > -1) {
              targetRowContent = document.getElementById('ngx-arcodian-tab-content' + rowIndex);
            }

            let targetRow = document.getElementById('tab-row' + rowIndex);
            if (targetRowContent) {
              resolve();
              setTimeout(() => {
                targetRowContent.appendChild(document.getElementById('content-target'))
                targetRow.style.height = (targetRowContent.clientHeight ? (targetRowContent.clientHeight + this.rowHeight) : this.rowHeight) + 'px';
              }, 0);
            } else {
              targetRow.style.height = this.rowHeight + 'px';
            }
            setTimeout(() => {
              if (_rowIndex == -1) {
                this.isNoneTabContent = true;
                this.rowIndexForSelectedTab = -1;
                resolve();
              }
              this.isDoing = false
            }, 300);
          }, 0);
        }, 0);

      } catch (e) {
        console.log(e)
        reject(e)
      }

    })


  }


  async clickTab(tab: any, tabIndex: number, rowIndex: number) {
    if (this.isDoing) {
      return
    }
    this.isDoing = true;
    if (tabIndex != this.tabIndexForSelectedTab) {
      this.tabIndexForSelectedTab = tabIndex
    } else {
      this.tabIndexForSelectedTab = -1;
    }
    await this.arcodianAnimate(rowIndex, this.tabIndexForSelectedTab);
    this.onSelectTab.emit(tab);
    // document.getElementById('tab-row' + rowIndex).appendChild(document.getElementById('ngx-arcodian-tab-content'))
  }

}
