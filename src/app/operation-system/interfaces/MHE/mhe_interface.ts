export interface MheForm {
  requestType?: string;
  companyName?: string;
  requestBy?: string;
  requestOnBehalf?: string;
  jobDescription?: string;
  PONum?: string;
  bookingType?: string;
  singleDate?: string;
  rangeDate?: RangeDate[];
  remarks?: string;
  machinery?: Machinery[];
  manPower?: ManPower[];
  otherMachineries?: OtherMachineries[];
  externalItem?: ExternalItem[];
  bookingDate?: string;
  estDuration?: number;
  estTrip?: number;
  estGoods?: number;
  refNo?: string;
  machineryConsole?: MachineryConsole[];
  detailBreakdown?: DetailBreakdown[];
  startDate?: string;
  endDate?: string;
  machineryContract?: MachineryContract[];
  contractNo?: string;
  workProgram?: string;
  vesselName?: Vessel[];
}

export interface Vessel {
  content?: string;
}

export interface RangeDate {
  id?: number;
  date?: string;
}

export interface DetailBreakdown {
  estimatedHours?: number;
  item?: string;
  price?: number;
  quantity?: number;
}

export interface Machinery {
  id?: number;
  Description?: string;
  Item?: string;
  boActivity?: string;
  Quantity?: number;
  Time?: string;
  EstimatedHours?: number;
  Location?: string;
  SpecificCrew?: any;
  disableBoActivity?: boolean;
  Selected?: any;
}
export interface MachineryContract {
  id?: number;
  Description?: string;
  Item?: string;
  Quantity?: number;
  Location?: string;
  Time?: string;
  EstimatedHours?: number;
}
export interface MachineryBerth {
  id?: number;
  Item?: string;
  Programme?: string;
  Quantity?: number;
  Time?: string;
  EstimatedHours?: number;
  Location?: string;
  SpecificCrew?: any;
  Selected?: any;
}

export interface ManPower {
  id?: number;
  Item?: string;
  Quantity?: number;
  Time?: string;
  EstimatedHours?: number;
  Location?: string;
  SpecificCrew?: any;
  Selected?: any;
}

export interface BoActivity {
  id?: number;
  code?: string;
  companyType?: number;
  description?: string;
  location?: number;
  noOfBo?: string;
  noOfCh?: any;
  version?: any;
  Selected?: any;
}

export interface ManPowerBerth {
  id?: number;
  Item?: string;
  Programme?: string;
  Quantity?: number;
  Time?: string;
  EstimatedHours?: number;
  Location?: string;
  SpecificCrew?: any;
  Selected?: any;
}
export interface OtherMachineries {
  id?: number;
  Description?: string;
  Item?: string;
  Quantity?: number;
  Time?: string;
  EstimatedHours?: number;
  Location?: string;
  Selected?: any;
}

export interface OtherMachineriesBerth {
  id?: number;
  Item?: string;
  Programme?: string;
  Quantity?: number;
  Time?: string;
  EstimatedHours?: number;
  Location?: string;
  Selected?: any;
}

export interface ExternalItem {
  id?: number;
  quotation?: string;
  Item?: string;
  UOM?: string;
  Quantity?: number;
  RentPeriod?: number;
  Unit?: string;
  Time?: string;
  Location?: string;
  Selected?: any;
}

export interface ConsoleForm {
  requestType?: string;
  companyName?: string;
  requestBy?: string;
  requestOnBehalf?: string;
  jobDescription?: string;
  bookingDate?: string;
  estDuration?: number;
  estTrip?: number;
  estGoods?: number;
  remarks?: string;
  refNo?: string;
  machineryConsole?: MachineryConsole[];
}

export interface MachineryConsole {
  id?: number;
  Selected?: any;
  Description?: string;
  Item?: string;
  Quantity?: number;
  Time?: string;
  Location?: string;
}

export interface UnderDeck {
  id?: number;
  Item?: any;
  Date?: string;
  Time?: string;
  Tonnes?: string;
  requestQuantityIn?: string;
  requestQuantityOut?: string;
  Barrel?: string;
  Selected?: any;
}

export interface GeneralWorks {
  id?: number;
  Item?: any;
  Remarks?: string;
  Selected?: any;
}
export interface FuelWaterTank {
  id?: any;
  indicator?: any;
  Tank?: any;
  FullTank?: string;
  Weight?: string;
  //BookingTime?: string;
  Selected?: any;
  Status?: any;
  StartTime?: any;
}
