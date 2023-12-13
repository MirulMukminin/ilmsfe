import { formatDate } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { restServices } from 'services';
import { AppService } from '../app.service';

@Component({
  selector: 'app-cwcy-cw-inventory-items',
  templateUrl: './cwcy-cw-inventory-items.component.html',
  styleUrls: ['./cwcy-cw-inventory-items.component.scss'],
})
export class CwcyCwInventoryItemsComponent implements OnInit {
  model = new TableModel();
  searchModel = '';
  itemsPerPageOptions = [10, 20, 30, 40, 50];
  InventoryTableList = [];
  dataset = [];
  key: string;
  wasteCode: string;
  quantity: string;
  palletID: string;
  palletWeight: string;
  packagingID: string;
  packagingWeight: string;
  locationID: string;
  expiryDate: string;
  statusNearExpiry: boolean;
  sortingOn: boolean;
  @ViewChild('customTableItemTemplate')
  customTableItemTemplate: TemplateRef<any>;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.userInfo();
  }
  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.getRestQueryAPI(initialData.Company);
      })
      .catch((err) => {
        console.error(err);
        let errorObject = {
          type: 'error',
          title: 'Server Error',
          subtitle: 'Server Error. Please try again',
        };
        this.appService.showToaster(errorObject);
        this.appService.terminateSession();
      });
  }
  getRestQueryAPI(Company: string) {
    var apiParam: any = { customer: Company };

    //fire api and get response data
    // restServices.pbksb_CommonWarehouseCommonYardService
    //   .getCommonWarehouseInventories(this.appService.myApp)(apiParam)
    //   .then((result) => {
    //     let resArr: any = result;
    //     let inventoryTableResponse = JSON.parse(resArr);

    //     inventoryTableResponse.sort((a, b) =>
    //       a.itemCode < b.itemCode ? -1 : 1
    //     );
    //     this.InventoryTableList = inventoryTableResponse;
    //     inventoryTableResponse.forEach((value, index) => {
    //       this.apiRespValidation(value);
    //       this.pushDataSet(index);
    //     });

    //     this.startPagination();
    //   });

    this.model.header = [
      new TableHeaderItem({ data: 'No.' }),
      new TableHeaderItem({ data: 'Waste Code' }),
      new TableHeaderItem({ data: 'Qty.' }),
      new TableHeaderItem({ data: 'Pallet ID' }),
      new TableHeaderItem({ data: 'Pallet Weight (MT)' }),
      new TableHeaderItem({ data: 'Packaging ID' }),
      new TableHeaderItem({ data: 'Packaging Weight (MT)' }),
      new TableHeaderItem({ data: 'Location ID' }),
      new TableHeaderItem({ data: 'Expiry Date' }),
    ];
  }
  startPagination() {
    this.model.data = [[]];
    this.model.currentPage = 1;
    this.model.pageLength = 10;

    this.model.totalDataLength = this.dataset.length;
    this.selectPage(this.model.currentPage);
  }

  pushDataSet(index: any) {
    this.dataset.push({
      number: index + 1,
      wasteCode: this.wasteCode,
      quantity: this.quantity,
      palletID: this.palletID,
      palletWeight: this.palletWeight,
      packagingID: this.packagingID,
      packagingWeight: this.packagingWeight,
      locationID: this.locationID,
      expiryDate: this.expiryDate,
      nearExpiryStatus: this.statusNearExpiry,
    });
  }

  apiRespValidation(value: any) {
    if (value.itemCode) {
      this.wasteCode = value.itemCode;
    } else {
      this.wasteCode = 'N/A';
    }
    if (value.quantity) {
      this.quantity = value.quantity;
    } else {
      this.quantity = 'N/A';
    }
    if (value.palletId) {
      this.palletID = value.palletId;
    } else {
      this.palletID = 'N/A';
    }
    if (value.palletWeight) {
      this.palletWeight = value.palletWeight;
    } else {
      this.palletWeight = '-';
    }
    if (value.itemId) {
      this.packagingID = value.itemId;
    } else {
      this.packagingID = 'N/A';
    }
    if (value.packageWeight) {
      this.packagingWeight = value.packageWeight;
    } else {
      this.packagingWeight = '-';
    }
    if (value.site) {
      if (value.site.description) {
        this.locationID = value.site.description;
      } else {
        this.locationID = 'N/A';
      }
    }
    if (value.nearExpiryIndicator) {
      this.statusNearExpiry = value.nearExpiryIndicator;
    } else {
      this.statusNearExpiry = false;
    }

    if (value.expiryDate) {
      this.expiryDate = formatDate(value.expiryDate, 'dd/MM/yyyy', 'en_US');
    } else {
      this.expiryDate = 'N/A';
    }
  }

  searchFilter(string: String) {}
  doSort(index: number) {
    this.sortingOn = true;
    this.model.header.forEach((value, i) => {
      //reset sorted state for header that is not selected
      if (index != i) {
        value.sorted = false;
        //reset default orientation
        value.ascending = false;
        value.descending = true;
      }
    });

    //set selected header to sorted state
    this.model.header[index].sorted = true;
    //set sort icon to descending
    if (this.model.header[index].ascending == true) {
      this.model.header[index].ascending = false;
      this.model.header[index].descending = true;
      this.sortFunction(index, 'DESC');
    } else {
      //set sort icon to ascending
      this.model.header[index].ascending = true;
      this.model.header[index].descending = false;
      this.sortFunction(index, 'ASC');
    }
    if (index != 0) {
      this.dataset.forEach((value, index) => {
        value.number = index + 1;
      });
    }

    this.startPagination();
  }
  sortFunction(index: number, orientation: string) {
    if (orientation == 'ASC') {
      if (index === 8) {
        let sort = {
          8: 'expiryDate',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate);
      } else {
        let sort = {
          0: 'number',
          1: 'wasteCode',
          2: 'quantity',
          3: 'palletID',
          4: 'palletWeight',
          5: 'packagingID',
          6: 'packagingWeight',
          7: 'locationID',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal);
      }
    } else if (orientation == 'DESC') {
      if (index === 8) {
        let sort = {
          8: 'expiryDate',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate).reverse();
      } else {
        let sort = {
          0: 'number',
          1: 'wasteCode',
          2: 'quantity',
          3: 'palletID',
          4: 'palletWeight',
          5: 'packagingID',
          6: 'packagingWeight',
          7: 'locationID',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal).reverse();
      }
    }
  }

  sortAscendingNormal = (a, b) => {
    if (a[this.key] === b[this.key]) {
      return 0;
    } else {
      if (typeof a[this.key] == 'string') {
        return a[this.key].toLocaleLowerCase() < b[this.key].toLocaleLowerCase()
          ? -1
          : 1;
      } else {
        return a[this.key] < b[this.key] ? -1 : 1;
      }
    }
  };

  sortAscendingDate = (a, b) => {
    //convert string to date to sort
    var dateA = a[this.key];
    var dateAParts = dateA.split('/');
    // month is 0-based, that's why we need dataParts[1] - 1
    var dateAConverted = new Date(
      +dateAParts[2],
      +dateAParts[1] - 1,
      +dateAParts[0]
    );

    var dateB = b[this.key];
    var dateBParts = dateB.split('/');
    // month is 0-based, that's why we need dataParts[1] - 1
    var dateBConverted = new Date(
      +dateBParts[2],
      +dateBParts[1] - 1,
      +dateBParts[0]
    );

    if (dateAConverted === dateBConverted) {
      return 0;
    } else {
      return dateAConverted < dateBConverted ? -1 : 1;
    }
  };

  selectPage(page: number) {
    this.getPage(page).then((data: Array<Array<any>>) => {
      // set the data and update page
      this.model.data = this.prepareData(data);

      this.model.currentPage = page;
    });
  }

  getPage(page: number) {
    const fullPage = [];
    for (
      let i = (page - 1) * this.model.pageLength;
      i < page * this.model.pageLength && i < this.model.totalDataLength;
      i++
    ) {
      fullPage.push([
        this.dataset[i].number,
        this.dataset[i].wasteCode,
        this.dataset[i].quantity,
        this.dataset[i].palletID,
        this.dataset[i].palletWeight,
        this.dataset[i].packagingID,
        this.dataset[i].packagingWeight,
        this.dataset[i].locationID,
        this.dataset[i].expiryDate,
        this.dataset[i].nearExpiryStatus,
      ]);
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(fullPage), 150);
    });
  }

  protected prepareData(data: Array<Array<any>>) {
    // create new data from the service data
    let newData = [];

    data.forEach((dataRow) => {
      let row = [];
      dataRow.forEach((dataElement, index) => {
        if (dataRow[9] == true) {
          if (index != 9) {
            if (index == 1 || index == 2 || index == 3 || index == 8) {
              row.push(
                new TableItem({
                  data: dataElement,
                  title: dataElement,
                  template: this.customTableItemTemplate,
                })
              );
            } else {
              row.push(
                new TableItem({
                  data: dataElement,
                })
              );
            }
          }
        } else {
          if (index != 9) {
            row.push(
              new TableItem({
                data: dataElement,
              })
            );
          }
        }
      });
      newData.push(row);
    });

    return newData;
  }
}
