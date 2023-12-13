import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SwmInboundForm {
  valueForm = {
    form: {
      companyName: '',
      requestBy: '',
      requestOnBehalf: null,
      bookingDate: '',
      jobDescription: '',
      collection: false,
      oddSize: false,
      oddSizeRemark: '',
      poNumber: '',
      referenceNo: '',
      additionalService: '',
      remarks: '',
      returnSkid: false,
      repackingFrom: false,
      newPackMaterial: false,
      packingPalletStrapping: false,
      drumCrushing: false,
      inboundWasteDetailsList: [
        {
          wasteCode: '',
          quantity: 1,
          uom: null,
          time: '',
          location: '',
        },
      ],
    },
  };

  setFormValue(data) {
    this.valueForm = data;
  }

  getValueForm() {
    return this.valueForm;
  }
  constructor() {}
}
