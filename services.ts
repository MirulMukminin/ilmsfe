import { CubaApp, FetchOptions } from "@cuba-platform/rest";

import { ChemicalType } from "./entities/pbksb_ChemicalType";

import { MachineryType } from "./entities/pbksb_MachineryType";

import { MachineryPositionHandling } from "./entities/pbksb_MachineryPositionHandling";

import { JobStatus, RequestCFSType } from "./enums/enums";

import { Customer } from "./entities/pbksb_Customer";

import { RequestCFS } from "./entities/pbksb_RequestCFS";

export type pbksb_AgentService_getAgentCustomers_params = {
  name: string;
};

export type pbksb_CommonWarehouseCommonYardService_cancelGoodsReleaseRequest_params = {
  form: any;
};

export type pbksb_CommonWarehouseCommonYardService_cancelGoodsStorageRequest_params = {
  form: any;
};

export type pbksb_CommonWarehouseCommonYardService_createGoodsReleaseRequest_params = {
  form: any;
};

export type pbksb_CommonWarehouseCommonYardService_createGoodsStorageRequest_params = {
  form: any;
};

export type pbksb_CommonWarehouseCommonYardService_endorseGoodsReleaseRequest_params = {
  form: any;
};

export type pbksb_CommonWarehouseCommonYardService_endorseGoodsStorageRequest_params = {
  form: any;
};

export type pbksb_CommonWarehouseCommonYardService_getAllEndorsedReleaseRequestByCustomer_params = {
  customer: string;
};

export type pbksb_CommonWarehouseCommonYardService_getAllEndorsedStorageRequestByCustomer_params = {
  customer: string;
};

export type pbksb_CommonWarehouseCommonYardService_getAllReleaseRequestByCustomer_params = {
  customer: string;
};

export type pbksb_CommonWarehouseCommonYardService_getAllStorageRequestByCustomer_params = {
  customer: string;
};

export type pbksb_CommonWarehouseCommonYardService_getCommonWarehouseInventories_params = {
  customer: string;
};

export type pbksb_CommonWarehouseCommonYardService_getCommonWarehouseTransactionsByCustomer_params = {
  customer: string;
};

export type pbksb_CommonWarehouseCommonYardService_getCommonYardInventories_params = {
  customer: string;
};

export type pbksb_CommonWarehouseCommonYardService_getCommonYardTransactionsByCustomer_params = {
  customer: string;
};

export type pbksb_CommonWarehouseCommonYardService_getReleaseRequestByRequestNo_params = {
  requestNo: string;
};

export type pbksb_CommonWarehouseCommonYardService_getRemainingCommonWarehouseInventory_params = {
  customer: string;
};

export type pbksb_CommonWarehouseCommonYardService_getRemainingCommonYardInventory_params = {
  customer: string;
};

export type pbksb_CommonWarehouseCommonYardService_getStorageRequestByRequestNo_params = {
  requestNo: string;
};

export type pbksb_CommonWarehouseCommonYardService_updateGoodsReleaseRequest_params = {
  form: any;
};

export type pbksb_CommonWarehouseCommonYardService_updateGoodsStorageRequest_params = {
  form: any;
};

export type pbksb_CrewTransferService_cancelCrewTransferSignOffRequest_params = {
  requestNumber: string;
};

export type pbksb_CrewTransferService_cancelCrewTransferSignOnRequest_params = {
  requestNumber: string;
};

export type pbksb_CrewTransferService_createCrewTransferSignOffRequest_params = {
  requestForm: any;
};

export type pbksb_CrewTransferService_createCrewTransferSignOnRequest_params = {
  requestForm: any;
};

export type pbksb_CrewTransferService_endorseCrewTransferSignOffRequest_params = {
  requestNumber: string;
};

export type pbksb_CrewTransferService_endorseCrewTransferSignOnRequest_params = {
  requestNumber: string;
};

export type pbksb_CrewTransferService_getAllCrewTransferSignOffRequest_params = {
  customer: string;
};

export type pbksb_CrewTransferService_getAllCrewTransferSignOnRequest_params = {
  customer: string;
};

export type pbksb_CrewTransferService_getCrewTransferRequestByRequestNumber_params = {
  requestNumber: string;
};

export type pbksb_CrewTransferService_getEndorsedCrewTransferSignOffRequest_params = {
  customer: string;
};

export type pbksb_CrewTransferService_getEndorsedCrewTransferSignOnRequest_params = {
  customer: string;
};

export type pbksb_CrewTransferService_updateCrewTransferSignOffRequest_params = {
  requestForm: any;
};

export type pbksb_CrewTransferService_updateCrewTransferSignOnRequest_params = {
  requestForm: any;
};

export type pbksb_CustomerService_AssignAgent_params = {
  customerID: string;
  agentUserID: string;
  email: string;
  contactNo: string;
};

export type pbksb_CustomerService_ContractDetails_params = {
  contract_number: string;
};

export type pbksb_CustomerService_GetCustomerAgentByUserName_params = {
  Username: string;
};

export type pbksb_CustomerService_GetCustomerInfo_params = {
  Username: string;
};

export type pbksb_CustomerService_GetILMSUserInfo_params = {
  Username: any;
};

export type pbksb_CustomerService_GetMHEEndorsedRequestDetails_params = {
  RequestNumber: string;
};

export type pbksb_CustomerService_GetMHEEndorsedRequestListByDate_params = {
  startDate: string;
  endDate: string;
};

export type pbksb_CustomerService_GetMHEJobDetailsByJobTicket_params = {
  jobticket: any;
};

export type pbksb_CustomerService_GetMHEJobDetailsByJobTicketMobileApp_params = {
  jobticket: string;
};

export type pbksb_CustomerService_GetMHERequestFormPreview_params = {
  RequestNumber: string;
};

export type pbksb_CustomerService_GetPageDetailBreakDown_params = {
  RequestNumber: string;
};

export type pbksb_CustomerService_GetPageDetailBreakDownEstimation_params = {
  fs: any;
};

export type pbksb_CustomerService_IsSpecialRequestCrew_params = {
  customerID: string;
};

export type pbksb_CustomerService_ListAgentByCustomer_params = {
  customerID: string;
};

export type pbksb_CustomerService_ListContractByCompany_params = {
  company: string;
};

export type pbksb_CustomerService_UnassignAgent_params = {
  agentID: string;
};

export type pbksb_CustomerService_UpdateAgentByCustomer_params = {
  agentID: string;
  email: string;
  contactNo: string;
};

export type pbksb_CustomerService_UpdateCancelJobTicket_params = {
  jobMheID: string;
};

export type pbksb_CustomerService_UpdateCancelRequestNumber_params = {
  RequestNumber: any;
};

export type pbksb_CustomerService_getRequestFrom_params = {
  userID: any;
  CustomerCode: any;
};

export type pbksb_CustomerService_submitRequestFrom_params = {
  fs: any;
};

export type pbksb_CustomerService_updateRequestForm_params = {
  requestNumber: any;
};

export type pbksb_DashBoardService_getDashboardDetailsByAgent_params = {
  customerCode: string;
  userId: string;
};

export type pbksb_DashBoardService_getDashboardDetailsByAgentFilteredByDateAndModule_params = {
  customerCode: string;
  customerName: string;
  userId: string;
  dateFrom: any;
  dateTo: any;
  module: string;
};

export type pbksb_GRARestService_cancelGRARequest_params = {
  form: any;
};

export type pbksb_GRARestService_createGRARequestForm_params = {
  form: any;
};

export type pbksb_GRARestService_editGRARequestForm_params = {
  form: any;
};

export type pbksb_GRARestService_endorseGRARequest_params = {
  form: any;
};

export type pbksb_GRARestService_getAgentCustomers_params = {
  id: string;
};

export type pbksb_GRARestService_getAgentDetails_params = {
  name: string;
};

export type pbksb_GRARestService_getAgentDetailsById_params = {
  id: string;
};

export type pbksb_GRARestService_getCustomerAgents_params = {
  id: string;
};

export type pbksb_GRARestService_getCustomerDetails_params = {
  customerName: string;
};

export type pbksb_GRARestService_getCustomerDetailsById_params = {
  id: string;
};

export type pbksb_GRARestService_getEndorsedGRARequestsByCustomer_params = {
  customer: string;
};

export type pbksb_GRARestService_getGRARequestByRequestNumber_params = {
  requestNo: any;
};

export type pbksb_GRARestService_getGRARequestsByCustomer_params = {
  customer: string;
};

export type pbksb_GRARestService_getPendingEndorsementGRARequestsByCustomer_params = {
  customer: string;
};

export type pbksb_GRNRestService_cancelGRNRequest_params = {
  form: any;
};

export type pbksb_GRNRestService_createGRNRequestForm_params = {
  form: any;
};

export type pbksb_GRNRestService_editGRNRequestForm_params = {
  form: any;
};

export type pbksb_GRNRestService_endorseGRNRequest_params = {
  form: any;
};

export type pbksb_GRNRestService_getAgentCustomers_params = {
  id: string;
};

export type pbksb_GRNRestService_getAgentDetails_params = {
  name: string;
};

export type pbksb_GRNRestService_getAgentDetailsById_params = {
  id: string;
};

export type pbksb_GRNRestService_getCustomerAgents_params = {
  id: string;
};

export type pbksb_GRNRestService_getCustomerDetails_params = {
  customerName: string;
};

export type pbksb_GRNRestService_getCustomerDetailsById_params = {
  id: string;
};

export type pbksb_GRNRestService_getCustomerInventoryItems_params = {
  customer: string;
};

export type pbksb_GRNRestService_getCustomerInventoryTransactions_params = {
  customer: string;
};

export type pbksb_GRNRestService_getEndorsedGRNRequestsByCustomer_params = {
  customer: string;
};

export type pbksb_GRNRestService_getGRNRequestByRequestNumber_params = {
  requestNo: any;
};

export type pbksb_GRNRestService_getGRNRequestsByCustomer_params = {
  customer: string;
};

export type pbksb_GetBerthFormHeaderService_fetchBerthForminHM_params = {
  tableUUID: string;
  entityUUID: string;
};

export type pbksb_GetBerthFormHeaderService_getBerthInformationByBFID_params = {
  bfid: string;
};

export type pbksb_GetBerthFormHeaderService_getBerthInformationByBFIDandshifting_params = {
  bfid: string;
  shifting: string;
};

export type pbksb_GetBerthFormHeaderService_getBerthInformationByID_params = {
  tableID: string;
};

export type pbksb_GetBerthFormHeaderService_getBerthingInformation_params = {
  tableUUID: string;
  entityUUID: string;
};

export type pbksb_GetBerthFormHeaderService_getEncrypPssword_params = {
  pwdField: string;
};

export type pbksb_GetBerthFormHeaderService_getGrandTotalAll_params = {
  grandTotalARRs: any;
};

export type pbksb_GetBerthFormHeaderService_getHashencrypPssword_params = {
  pwdField: string;
};

export type pbksb_GetBerthFormHeaderService_updateNewPsswordStatus_params = {
  userid: string;
  userNewPwd: string;
};

export type pbksb_ICWAddSRestService_cancelASRequest_params = {
  form: any;
};

export type pbksb_ICWAddSRestService_createASRequestForm_params = {
  form: any;
};

export type pbksb_ICWAddSRestService_editASRequestForm_params = {
  form: any;
};

export type pbksb_ICWAddSRestService_endorseASRequest_params = {
  form: any;
};

export type pbksb_ICWAddSRestService_getASRequestByRequestNumber_params = {
  requestNo: string;
};

export type pbksb_ICWAddSRestService_getASRequestsByCustomer_params = {
  customer: string;
};

export type pbksb_ICWAddSRestService_getAgentCustomers_params = {
  id: string;
};

export type pbksb_ICWAddSRestService_getAgentDetails_params = {
  name: string;
};

export type pbksb_ICWAddSRestService_getAgentDetailsById_params = {
  id: string;
};

export type pbksb_ICWAddSRestService_getCustomerAgents_params = {
  id: string;
};

export type pbksb_ICWAddSRestService_getCustomerDetails_params = {
  customerName: string;
};

export type pbksb_ICWAddSRestService_getCustomerDetailsById_params = {
  id: string;
};

export type pbksb_ICWAddSRestService_getCustomerInventoryItems_params = {
  customer: string;
};

export type pbksb_ICWAddSRestService_getCustomerInventoryTransactions_params = {
  customer: string;
};

export type pbksb_ICWAddSRestService_getEndorsedASRequestsByCustomer_params = {
  customer: string;
};

export type pbksb_ICWAddSRestService_getPendingEndorsementASRequestsByCustomer_params = {
  customer: string;
};

export type pbksb_ICWRestService_cancelStorageRequest_params = {
  form: any;
};

export type pbksb_ICWRestService_createStorageRequestForm_params = {
  form: any;
};

export type pbksb_ICWRestService_editStorageRequestForm_params = {
  form: any;
};

export type pbksb_ICWRestService_endorseStorageRequest_params = {
  form: any;
};

export type pbksb_ICWRestService_getAgentCustomers_params = {
  id: string;
};

export type pbksb_ICWRestService_getAgentDetails_params = {
  name: string;
};

export type pbksb_ICWRestService_getAgentDetailsById_params = {
  id: string;
};

export type pbksb_ICWRestService_getCustomerAgents_params = {
  id: string;
};

export type pbksb_ICWRestService_getCustomerDetails_params = {
  customerName: string;
};

export type pbksb_ICWRestService_getCustomerDetailsById_params = {
  id: string;
};

export type pbksb_ICWRestService_getEndorsedStorageRequestsByCustomer_params = {
  customer: string;
};

export type pbksb_ICWRestService_getItemTypes_params =
  | {}
  | {
      customer: string;
    };

export type pbksb_ICWRestService_getPendingEndorsementStorageRequestsByCustomer_params = {
  customer: string;
};

export type pbksb_ICWRestService_getStorageRequestByRequestNumber_params = {
  docketNo: string;
};

export type pbksb_ICWRestService_getStorageRequestsByCustomer_params = {
  customer: string;
};

export type pbksb_ICWRestService_getWarehouseUtil_params = {
  customer: string;
};

export type pbksb_ICWTransferRestService_cancelTransferRequest_params = {
  form: any;
};

export type pbksb_ICWTransferRestService_createTransferRequestForm_params = {
  form: any;
};

export type pbksb_ICWTransferRestService_editTransferRequestForm_params = {
  form: any;
};

export type pbksb_ICWTransferRestService_endorseTransferRequest_params = {
  form: any;
};

export type pbksb_ICWTransferRestService_getAgentCustomers_params = {
  id: string;
};

export type pbksb_ICWTransferRestService_getAgentDetails_params = {
  name: string;
};

export type pbksb_ICWTransferRestService_getAgentDetailsById_params = {
  id: string;
};

export type pbksb_ICWTransferRestService_getCustomerAgents_params = {
  id: string;
};

export type pbksb_ICWTransferRestService_getCustomerDetails_params = {
  customerName: string;
};

export type pbksb_ICWTransferRestService_getCustomerDetailsById_params = {
  id: string;
};

export type pbksb_ICWTransferRestService_getCustomerInventoryBalances_params = {
  customer: string;
};

export type pbksb_ICWTransferRestService_getCustomerInventoryDetails_params =
  | {
      chemicalType: ChemicalType;
    }
  | {
      customer: string;
      itemDescription: string;
    };

export type pbksb_ICWTransferRestService_getCustomerInventoryItems_params = {
  customer: string;
};

export type pbksb_ICWTransferRestService_getCustomerInventoryTransactions_params = {
  customer: string;
};

export type pbksb_ICWTransferRestService_getEndorsedTransferRequestsByCustomer_params = {
  customer: string;
};

export type pbksb_ICWTransferRestService_getInventoryICWItem_params = {
  id: string;
};

export type pbksb_ICWTransferRestService_getPendingEndorsementTransferRequestsByCustomer_params = {
  customer: string;
};

export type pbksb_ICWTransferRestService_getTransferRequestByRequestNumber_params = {
  requestNo: any;
};

export type pbksb_ICWTransferRestService_getTransferRequestsByCustomer_params = {
  customer: string;
};

export type pbksb_InventoryService_getInventoryDetails_params = {
  jobNo: string;
  customerName: string;
};

export type pbksb_JobMHEService_GetListJobMHEDocument_params = {
  job_ticket: string;
};

export type pbksb_JobMHEService_GetListofJobMHEbyDate_params = {
  date: string;
};

export type pbksb_JobMHEService_GetListofJobMHEbyDateSort_params = {
  status: string;
  sort: string;
};

export type pbksb_JobMHEService_GetListofJobMHEbyStatus_params = {
  status: string;
};

export type pbksb_JobMHEService_GetPriceBreakDownByJobTicket_params = {
  JobTicket: string;
};

export type pbksb_JobMHEService_GetPriceBreakDownList_params = {
  RequestNumber: string;
};

export type pbksb_JobMHEService_GetPriceScheduleByMachineryType_params = {
  machineryType: MachineryType;
};

export type pbksb_JobMHEService_GetPriceScheduleByManPowerPositionHandling_params = {
  positionHandling: MachineryPositionHandling;
};

export type pbksb_JobMHEService_IFS_Calculate_MHE_Job_params = {
  Quantity: any;
  EstimatedHours: any;
  PriceRate: any;
};

export type pbksb_JobMHEService_RegisterEmployeeToken_params = {
  login: string;
  fcmtoken: string;
};

export type pbksb_JobMHEService_RequestAmendJobTicket_params = {
  jobTicket: string;
  notes: string;
};

export type pbksb_JobMHEService_UpdateBreakTimeJobTicket_params = {
  breakTime: any;
};

export type pbksb_JobMHEService_UpdateCancelJobTicket_params = {
  JobTicket: string;
  Cancellation: string;
  CancelType: string;
};

export type pbksb_JobMHEService_UpdateEndorseJobTicket_params = {
  JobTicket: string;
};

export type pbksb_JobMHEService_UpdateInProgressJobTicket_params = {
  JobTicket: string;
};

export type pbksb_JobMHEService_UpdateJobTicketCompleted_params = {
  JobTicketNumber: string;
};

export type pbksb_JobMHEService_UpdateJobTicketNumberForCompletedWithTimeCompletedAndRemarks_params = {
  JobTicketNumber: string;
  timeCompleted: string;
  remarks: string;
};

export type pbksb_JobMHEService_UpdateRequestNumberCompleted_params = {
  RequestNumber: string;
};

export type pbksb_JobMHEService_fileUpload_JobMHE_params = {
  file: any;
};

export type pbksb_JobMHEService_getCSVInvoice_params = {
  jobStatus: JobStatus;
};

export type pbksb_JobMHEService_getCustomer_params = {
  customerCode: string;
};

export type pbksb_JobMHEService_sendNotification_params = {
  note: any;
  token: string;
};

export type pbksb_JobMHEService_setStatus_params = {
  rj: any;
};

export type pbksb_MHEAssignOperatorService_AssignOperator_params = {
  date: any;
};

export type pbksb_MHEAssignOperatorService_EstimateGangByDate_params = {
  date: any;
};

export type pbksb_MarineService_AddMHERequestMachinery_params = {
  form: any;
};

export type pbksb_MarineService_CancelBerthRequestForm_params = {
  form: any;
};

export type pbksb_MarineService_CancelBerthRequestFuelWaterStandAloneForm_params = {
  berthFuelWaterID: any;
};

export type pbksb_MarineService_CancelBerthWorkPermit_params = {
  form: any;
};

export type pbksb_MarineService_CancelEquipment_params = {
  form: any;
};

export type pbksb_MarineService_CancelExternalItem_params = {
  form: any;
};

export type pbksb_MarineService_CancelFuelWaterItem_params = {
  form: any;
};

export type pbksb_MarineService_CancelGeneralWorks_params = {
  form: any;
};

export type pbksb_MarineService_CancelJobMHE_params = {
  form: any;
};

export type pbksb_MarineService_CancelMHEJobConsole_params = {
  form: any;
};

export type pbksb_MarineService_CancelMHEJobNormal_params = {
  form: any;
};

export type pbksb_MarineService_CancelMachinery_params = {
  form: any;
};

export type pbksb_MarineService_CancelManpower_params = {
  form: any;
};

export type pbksb_MarineService_CancelUnderdeck_params = {
  form: any;
};

export type pbksb_MarineService_CancelWorkWithPermit_params = {
  form: any;
};

export type pbksb_MarineService_ChangeStatusBerthRequestForm_params = {
  form: any;
};

export type pbksb_MarineService_ChangeStatusBerthWorkPermit_params = {
  form: any;
};

export type pbksb_MarineService_ChangeStatusUnderDeckSummary_params = {
  form: any;
};

export type pbksb_MarineService_CreateUnderdeckItem_params = {
  form: any;
};

export type pbksb_MarineService_DeleteBerthFormDoc_params = {
  form: any;
};

export type pbksb_MarineService_DeleteWharfageFormDoc_params = {
  form: any;
};

export type pbksb_MarineService_EndorseBOD_params = {
  form: any;
};

export type pbksb_MarineService_EndorseWharfage_params = {
  form: any;
};

export type pbksb_MarineService_EndorsedBOD_params = {
  form: any;
};

export type pbksb_MarineService_EndorsedBerthRequestFuelWaterStandAloneForm_params = {
  berthFuelWaterID: any;
};

export type pbksb_MarineService_EndorsedFuelWater_params = {
  berthFuelWaterID: any;
};

export type pbksb_MarineService_EndorsedFuelWaterJobTicket_params = {
  jobTicket: string;
};

export type pbksb_MarineService_EntityResponse_params = {
  id: string;
};

export type pbksb_MarineService_GetAdditionalServices_params = {
  requestNo: string;
};

export type pbksb_MarineService_GetBODDetailsByBODNo_params = {
  bod_number: string;
};

export type pbksb_MarineService_GetBODListByCompany_params = {
  company: string;
};

export type pbksb_MarineService_GetBerthFormDoc_params = {
  formID: string;
};

export type pbksb_MarineService_GetBerthFormDocs_params = {
  requestNo: string;
};

export type pbksb_MarineService_GetBerthFuelWaterJobTicketDetails_params = {
  requestNo: string;
};

export type pbksb_MarineService_GetBerthFuelWaterJobTicketPreview_params = {
  jobTicket: string;
};

export type pbksb_MarineService_GetBerthFuelWaterStandaloneJobTicketPreview_params = {
  jobTicket: string;
};

export type pbksb_MarineService_GetBerthHeavyPackages_params = {
  requestNo: string;
};

export type pbksb_MarineService_GetBerthMaterialRequisitionByCompany_params = {
  company: string;
};

export type pbksb_MarineService_GetBerthMaterialRequisitionDetails_params = {
  requestNo: string;
};

export type pbksb_MarineService_GetBerthRequestByCompany_params = {
  company: string;
};

export type pbksb_MarineService_GetBerthRequestDetailsByRequestNo_params = {
  requestNo: string;
};

export type pbksb_MarineService_GetBerthScopeOfWork_params = {
  requestNo: string;
};

export type pbksb_MarineService_GetBerthScopeWorkByGroup_params = {
  requestNo: string;
};

export type pbksb_MarineService_GetBerthWorkProgram_params = {
  requestNo: string;
};

export type pbksb_MarineService_GetBerthWorkProgramSummary_params = {
  requestNo: string;
};

export type pbksb_MarineService_GetBerthingInformation_params = {
  requestNo: string;
};

export type pbksb_MarineService_GetEndorsedBODDetailsByBODNo_params = {
  bod_number: string;
};

export type pbksb_MarineService_GetEndorsedBODListByCompany_params = {
  company: string;
};

export type pbksb_MarineService_GetEndorsedFuelWaterStandaloneListRequestByCompany_params = {
  company: string;
};

export type pbksb_MarineService_GetFuelWaterRequestFormDetails_params = {
  requestNo: string;
};

export type pbksb_MarineService_GetFuelWaterRequestFormStandAloneDetails_params = {
  requestNo: string;
};

export type pbksb_MarineService_GetFuelWaterStandaloneListRequestByCompany_params = {
  company: string;
};

export type pbksb_MarineService_GetGeneralWorksFormDetails_params = {
  requestNo: string;
};

export type pbksb_MarineService_GetListCancelledJobs_params = {
  company: string;
};

export type pbksb_MarineService_GetListCompletedJobs_params = {
  company: string;
};

export type pbksb_MarineService_GetMHERequestFormDetails_params = {
  requestNo: string;
};

export type pbksb_MarineService_GetMarineServiceCode_params = {
  jobTicket: string;
};

export type pbksb_MarineService_GetMobileJobTicketDetails_params = {
  jobTicket: string;
};

export type pbksb_MarineService_GetMobileJobTicketItemDetails_params = {
  jobTicket: string;
};

export type pbksb_MarineService_GetNewInProgressJobs_params = {
  company: string;
};

export type pbksb_MarineService_GetNewInProgressJobsByStatus_params = {
  status: string;
};

export type pbksb_MarineService_GetSRDetailsByWharfageID_params = {
  wharfageID: string;
};

export type pbksb_MarineService_GetServiceRequestByCompany_params = {
  company: string;
};

export type pbksb_MarineService_GetServiceRequestListByCompany_params = {
  company: string;
};

export type pbksb_MarineService_GetUnderdeckFormDetails_params = {
  requestNo: string;
};

export type pbksb_MarineService_GetVesselArrivalDepartureInformation_params = {
  requestNo: string;
};

export type pbksb_MarineService_GetWharfageDocs_params = {
  wharfageID: string;
};

export type pbksb_MarineService_GetWharfageGeneralWorksDetails_params = {
  wharfageID: string;
};

export type pbksb_MarineService_GetWharfageUnderdeckDetails_params = {
  wharfageID: string;
};

export type pbksb_MarineService_GetWorkProgramCancellationPreview_params = {
  jobTicket: string;
};

export type pbksb_MarineService_GetWorkWithPermitFormDetails_params = {
  requestNo: string;
};

export type pbksb_MarineService_PostBerthMHERequestConsole_params = {
  form: any;
};

export type pbksb_MarineService_PostBerthMHERequestNormal_params = {
  form: any;
};

export type pbksb_MarineService_PostBerthRequestForm_params = {
  form: any;
};

export type pbksb_MarineService_PostBerthRequestFuelWaterForm_params = {
  form: any;
};

export type pbksb_MarineService_PostBerthRequestFuelWaterStandAloneForm_params = {
  form: any;
};

export type pbksb_MarineService_PostGeneralWorksForm_params = {
  form: any;
};

export type pbksb_MarineService_PostMaterialRequisitionForm_params = {
  form: any;
};

export type pbksb_MarineService_PostServiceRequestForm_params = {
  form: any;
};

export type pbksb_MarineService_PostUnderDeckForm_params = {
  form: any;
};

export type pbksb_MarineService_PostWorkPermitForm_params = {
  form: any;
};

export type pbksb_MarineService_RejectBOD_params = {
  berthFormID: string;
  comment: string;
};

export type pbksb_MarineService_RejectFuelWaterStandAloneForm_params = {
  jobticket: string;
  comment: string;
};

export type pbksb_MarineService_RejectWharfage_params = {
  wharfageID: string;
  comment: string;
};

export type pbksb_MarineService_SetMHEFormStatus_params = {
  form: any;
};

export type pbksb_MarineService_StringResponse_params = {
  a: any;
  b: any;
};

export type pbksb_MarineService_SubmitBerthMaterialRequisition_params = {
  form: any;
};

export type pbksb_MarineService_SubmitBerthRequestForm_params = {
  form: any;
};

export type pbksb_MarineService_SubmitBerthRequestFuelWaterStandAloneForm_params = {
  berthFuelWaterID: any;
};

export type pbksb_MarineService_SubmitWharfageRequestForm_params = {
  form: any;
};

export type pbksb_MarineService_UpdateBerthHeavyPackagesForm_params = {
  form: any;
};

export type pbksb_MarineService_UpdateBerthMHERequestConsole_params = {
  form: any;
};

export type pbksb_MarineService_UpdateBerthMHERequestNormal_params = {
  form: any;
};

export type pbksb_MarineService_UpdateBerthMaterialRequisition_params = {
  form: any;
};

export type pbksb_MarineService_UpdateBerthRequestForm_params = {
  form: any;
};

export type pbksb_MarineService_UpdateBerthRequestFuelWaterForm_params = {
  form: any;
};

export type pbksb_MarineService_UpdateBerthRequestFuelWaterFormStatusBooked_params = {
  form: any;
};

export type pbksb_MarineService_UpdateBerthRequestFuelWaterStandAloneForm_params = {
  form: any;
};

export type pbksb_MarineService_UpdateBerthWorkPermit_params = {
  form: any;
};

export type pbksb_MarineService_UpdateCancelJobTicket_params = {
  jobTicket: string;
};

export type pbksb_MarineService_UpdateGeneralWorksForm_params = {
  form: any;
};

export type pbksb_MarineService_UpdateMarineCompletedJobTicket_params = {
  jobTicket: string;
};

export type pbksb_MarineService_UpdateMarineInProgressJobTicket_params = {
  jobTicket: string;
};

export type pbksb_MarineService_UpdateUnderDeckForm_params = {
  form: any;
};

export type pbksb_MarineService_UpdateWharfageGeneralWorksForm_params = {
  form: any;
};

export type pbksb_MarineService_UploadBerthFormDoc_params = {
  form: any;
};

export type pbksb_MarineService_UploadMaterialRequisitionDoc_params = {
  form: any;
};

export type pbksb_MarineService_UploadWharfageFormDoc_params = {
  form: any;
};

export type pbksb_MarineService_calculateDivedNumber_params = {
  a: any;
  b: any;
};

export type pbksb_MarineService_fileUpload_MarineJobMHE_params = {
  file: any;
};

export type pbksb_MarineService_getAgentListByCompany_params = {
  customerCode: string;
};

export type pbksb_MasterDataService_StartServiceMHE_params = {
  cargoHandling: any;
  Employee: any;
  isNewVisit: any;
};

export type pbksb_MasterDataService_UpdateVessel_params = {
  vesselName: any;
  Email: any;
};

export type pbksb_MasterDataService_checkMHEPendingEndorsedByCustomerID_params = {
  customerID: any;
};

export type pbksb_MobileService_completeJobMHE_params = {
  mobileJobMHECompleteRequestForm: any;
};

export type pbksb_MobileService_getMobileDashBoard_params = {
  mobileAppForm: any;
};

export type pbksb_MobileService_getMobileJobMHEDetails_params = {
  mobileUserLoginRequestForm: any;
};

export type pbksb_MobileService_getMobileJobMHEList_params = {
  mobileUserLoginRequestForm: any;
};

export type pbksb_MobileService_updateJobMHESatatus_params = {
  mobileJobMHEUpdateRequest: any;
};

export type pbksb_MobileService_updateSessionTiming_params = {
  mobileJobMHESession: any;
};

export type pbksb_PSBService_ApplyNewReturnDate_params = {
  form: any;
};

export type pbksb_PSBService_ApplyTemporaryOutGoodOutForm_params = {
  form: any;
};

export type pbksb_PSBService_CancelGoodIn_params = {
  goodInID: string;
};

export type pbksb_PSBService_CancelGoodOut_params = {
  goodOutID: string;
};

export type pbksb_PSBService_ChangeStatusGoodInForm_params = {
  id: string;
  status: string;
};

export type pbksb_PSBService_ChangeStatusTransferOwnerShipBuyerForm_params = {
  id: string;
  status: string;
};

export type pbksb_PSBService_ChangeStatusTransferOwnerShipSellerForm_params = {
  id: string;
  status: string;
};

export type pbksb_PSBService_DeleteGoodInForm_params = {
  reference_no: string;
};

export type pbksb_PSBService_DeleteGoodOutForm_params = {
  reference_no: string;
};

export type pbksb_PSBService_ExistReqistrationNoGI_params = {
  registrationNo: string;
};

export type pbksb_PSBService_ExistReqistrationNoGO_params = {
  registrationNo: string;
};

export type pbksb_PSBService_GetBuildFromPartsFormDetails_params = {
  request_no: string;
};

export type pbksb_PSBService_GetBuildFromPartsList_params = {
  company: string;
};

export type pbksb_PSBService_GetCurrentInventoryListByCompany_params = {
  company: string;
};

export type pbksb_PSBService_GetGoodDetailsTransferOwnerShip_params = {
  request_no: string;
};

export type pbksb_PSBService_GetGoodInByCompany_params = {
  company: string;
};

export type pbksb_PSBService_GetGoodInListByCustomer_params = {
  company: string;
};

export type pbksb_PSBService_GetGoodInListByFormNumber_params = {
  formNumber: string;
};

export type pbksb_PSBService_GetGoodOutDetails_params = {
  reference_no: string;
};

export type pbksb_PSBService_GetGoodOutListByCustomer_params = {
  company: string;
};

export type pbksb_PSBService_GetGoodsDetailsByRequestNo_params = {
  request_no: string;
};

export type pbksb_PSBService_GetGoodsInDetailsByRegistrationNo_params = {
  registration_no: any;
};

export type pbksb_PSBService_GetGoodsInFormDetails_params = {
  reference_no: string;
};

export type pbksb_PSBService_GetListBuildFromPartsFormDocument_params = {
  request_no: string;
};

export type pbksb_PSBService_GetListBuildPartsIssue_params = {
  request_no: string;
};

export type pbksb_PSBService_GetListChangeLogExpectedDate_params = {
  reference_no: string;
};

export type pbksb_PSBService_GetListExpectedReturnDate_params = {
  reference_no: string;
};

export type pbksb_PSBService_GetListGoods_params = {
  reference_no: string;
};

export type pbksb_PSBService_GetListIssueOutGood_params = {
  reference_no: string;
};

export type pbksb_PSBService_GetListNewLocation_params = {
  request_no: string;
};

export type pbksb_PSBService_GetListNewParts_params = {
  request_no: string;
};

export type pbksb_PSBService_GetListPreviousLocation_params = {
  request_no: string;
};

export type pbksb_PSBService_GetListReturnGood_params = {
  reference_no: string;
};

export type pbksb_PSBService_GetListTemporaryOutGood_params = {
  reference_no: string;
};

export type pbksb_PSBService_GetListTransferOwnershipDocument_params = {
  request_no: string;
};

export type pbksb_PSBService_GetTransferLocationFormDetails_params = {
  request_no: string;
};

export type pbksb_PSBService_GetTransferLocationList_params = {
  company: string;
};

export type pbksb_PSBService_GetTransferOwnerShipBuyerForm_params =
  | {
      requestNumber: string;
    }
  | {
      requestNumber: any;
    };

export type pbksb_PSBService_GetTransferOwnerShipBuyerList_params = {
  buyer: any;
  firstResult: any;
};

export type pbksb_PSBService_GetTransferOwnerShip_Doc_params = {
  file: any;
};

export type pbksb_PSBService_GetTransferOwnershipDetailsByRequestNo_params = {
  request_no: string;
};

export type pbksb_PSBService_GetTransferOwnershipRequestList_params = {
  company: string;
};

export type pbksb_PSBService_GoodListByRegistrationNo_params = {
  registrationNo: string;
};

export type pbksb_PSBService_GoodListByRegistrationNoAndCustomer_params = {
  registrationNo: string;
  customer: string;
};

export type pbksb_PSBService_InventoryChangeHistory_params = {
  form_no: string;
};

export type pbksb_PSBService_InventoryChangeHistory2_params = {
  form_no: string;
};

export type pbksb_PSBService_ListGoodTransferOwnerShip_params = {
  request_no: string;
};

export type pbksb_PSBService_ListGoodsOutByRegistrationNumber_params = {
  reg_num: string;
};

export type pbksb_PSBService_PostBuildFromPartsForm_params = {
  bfp_form: any;
};

export type pbksb_PSBService_PostGoodIn_params = {
  fm: any;
};

export type pbksb_PSBService_PostGoodInForm_params = {
  form: any;
};

export type pbksb_PSBService_PostGoodInwithListGood_params = {
  form: any;
};

export type pbksb_PSBService_PostGoodOutwithListGood_params = {
  form: any;
};

export type pbksb_PSBService_PostGoodReturn_params = {
  form: any;
};

export type pbksb_PSBService_PostInventoryAdjustment_params = {
  form: any;
};

export type pbksb_PSBService_PostLocationBuyerForm_params = {
  form: any;
};

export type pbksb_PSBService_PostTransferLocationRequestForm_params = {
  form: any;
};

export type pbksb_PSBService_PostTransferOwnerShipSellerForm_params = {
  form: any;
};

export type pbksb_PSBService_UpdateGoodInForm_params = {
  form: any;
};

export type pbksb_PSBService_UpdateGoodOutForm_params = {
  form: any;
};

export type pbksb_PSBService_UpdateReturnGood_params = {
  form: any;
};

export type pbksb_PSBService_UploadBuildPartsDoc_params = {
  file: any;
};

export type pbksb_PSBService_calculateDivedNumber_params = {
  a: any;
  b: any;
};

export type pbksb_PSBService_fileUpload_TransferOwnership_params = {
  file: any;
};

export type pbksb_PSBService_getPSBRequestFrom_params = {
  username: string;
};

export type pbksb_PSBService_registrationNoListByCustomer_params = {
  customer: string;
};

export type pbksb_PSBService_submitPSBFormSubmit_params = {
  psbfs: any;
};

export type pbksb_PSBService_uploadFile_Test_params = {
  id: string;
  nameFile: string;
};

export type pbksb_PasswordManagerNewService_getHashedPsswrd_params = {
  pwdFieldRawValue: string;
};

export type pbksb_PasswordManagerNewService_updatePsswrdwithUserSession_params = {
  currentPswd: string;
  pwdFieldRawValue: string;
};

export type pbksb_PsbService_getPsbReportListByCustomerAndDate_params = {
  customer: Customer;
  fromDate: any;
  toDate: any;
};

export type pbksb_RequestCFSService_cancelCFSRequest_params = {
  form: any;
};

export type pbksb_RequestCFSService_chargeCustomer_params = {
  requestCFS: RequestCFS;
};

export type pbksb_RequestCFSService_createCFSRequest_params = {
  form: any;
};

export type pbksb_RequestCFSService_createContainerCFS_params = {
  form: any;
};

export type pbksb_RequestCFSService_editCFSRequest_params = {
  form: any;
};

export type pbksb_RequestCFSService_endorseCFSRequest_params = {
  form: any;
};

export type pbksb_RequestCFSService_getContainersByCustomer_params = {
  customer: string;
};

export type pbksb_RequestCFSService_getContainersByRequestType_params = {
  customer: string;
  requestType: RequestCFSType;
};

export type pbksb_RequestCFSService_getEndorsedAndCompletedRequestsByCustomer_params = {
  customer: string;
};

export type pbksb_RequestCFSService_getEndorsedRequestsByCustomer_params = {
  customer: string;
};

export type pbksb_RequestCFSService_getRequestByTicketNumber_params = {
  ticketNo: string;
};

export type pbksb_RequestCFSService_getRequestsByCustomer_params = {
  customer: string;
};

export type pbksb_ScheduledWasteService_cancelInboundRequest_params =
  | {
      jobNo: string;
    }
  | {
      jobNo: string;
      userName: string;
    };

export type pbksb_ScheduledWasteService_cancelOutboundRequest_params = {
  jobNo: string;
};

export type pbksb_ScheduledWasteService_cancelWasteDetailJob_params = {
  jobNo: string;
  wasteCode: string;
};

export type pbksb_ScheduledWasteService_cancelWasteDetailsJob_params = {
  wasteDetailsForm: any;
};

export type pbksb_ScheduledWasteService_createInboundScheduledWasteForm_params = {
  form: any;
};

export type pbksb_ScheduledWasteService_createOutboundScheduledWasteForm_params = {
  form: any;
};

export type pbksb_ScheduledWasteService_createTwgForm_params = {
  form: any;
};

export type pbksb_ScheduledWasteService_downloadTwgApprovedFile_params = {
  file: any;
};

export type pbksb_ScheduledWasteService_downloadTwgUploadedFile_params = {
  file: any;
};

export type pbksb_ScheduledWasteService_editTwgForm_params = {
  form: any;
};

export type pbksb_ScheduledWasteService_endorseAddServiceReport_params = {
  form: any;
};

export type pbksb_ScheduledWasteService_endorseInboundSoReport_params = {
  form: any;
};

export type pbksb_ScheduledWasteService_endorseOutboundSoReport_params = {
  form: any;
};

export type pbksb_ScheduledWasteService_getAddServiceReportList_params = {
  customer: string;
};

export type pbksb_ScheduledWasteService_getAddServiceReportView_params = {
  formNo: string;
};

export type pbksb_ScheduledWasteService_getInboundRequestByRequestNumber_params = {
  jobNo: string;
};

export type pbksb_ScheduledWasteService_getInboundRequestsListByCustomer_params = {
  customer: string;
};

export type pbksb_ScheduledWasteService_getInboundSOReportList_params = {
  customer: string;
};

export type pbksb_ScheduledWasteService_getInboundSOReportView_params = {
  formNo: string;
};

export type pbksb_ScheduledWasteService_getInventoryList_params = {
  customer: string;
};

export type pbksb_ScheduledWasteService_getOutboundRequestByRequestNumber_params = {
  jobNo: string;
};

export type pbksb_ScheduledWasteService_getOutboundRequestsListByCustomer_params = {
  customer: string;
};

export type pbksb_ScheduledWasteService_getOutboundSOReportList_params = {
  customer: string;
};

export type pbksb_ScheduledWasteService_getOutboundSOReportView_params = {
  formNo: string;
};

export type pbksb_ScheduledWasteService_getOutboundWasteDetails_params = {
  customer: string;
  wasteCode: string;
};

export type pbksb_ScheduledWasteService_getOutboundWasteDetailsByCustomer_params = {
  customer: string;
};

export type pbksb_ScheduledWasteService_getSummaryList_params = {
  customer: string;
};

export type pbksb_ScheduledWasteService_getTwgRequestsByFormNo_params = {
  formNo: string;
};

export type pbksb_ScheduledWasteService_getTwgRequestsListByCustomer_params = {
  customer: string;
};

export type pbksb_ScheduledWasteService_getWasteCodeList_params = {
  customer: string;
};

export type pbksb_ScheduledWasteService_submitTwgForm_params = {
  form: any;
};

export type pbksb_SendEmailService_SubmitGoodInForm_params = {
  goodInID: string;
};

export type pbksb_SendEmailService_sendCancellationEmail_params = {
  email: string;
  moduleName: string;
  ticketNo: string;
  cancelledBy: string;
  cancelledTime: any;
};

export type pbksb_SendEmailService_sendCancellationEmailWithCaption_params = {
  email: string;
  moduleName: string;
  ticketNo: string;
  cancelledBy: string;
  cancelledTime: any;
  caption: string;
};

export type pbksb_SendEmailService_sendPendingEndorsementEmail_params = {
  email: string;
  moduleName: string;
  ticketNo: string;
};

export type pbksb_WasteDisposalService_cancelRequest_params = {
  form: any;
};

export type pbksb_WasteDisposalService_createWasteDisposalForm_params = {
  form: any;
};

export type pbksb_WasteDisposalService_editWasteDisposalForm_params = {
  form: any;
};

export type pbksb_WasteDisposalService_endorseRequest_params = {
  form: any;
};

export type pbksb_WasteDisposalService_getEndorsedRequestByCustomer_params = {
  customer: string;
};

export type pbksb_WasteDisposalService_getRequestByRequestNumber_params = {
  jobNo: string;
};

export type pbksb_WasteDisposalService_getRequestsByCustomer_params = {
  customer: string;
};

export var restServices = {
  pbksb_AgentService: {
    getAgentCustomers: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_AgentService_getAgentCustomers_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_AgentService",
        "getAgentCustomers",
        params,
        fetchOpts
      );
    },
    getAll: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_AgentService",
        "getAll",
        {},
        fetchOpts
      );
    }
  },
  pbksb_BerthService: {
    ListVessel: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_BerthService",
        "ListVessel",
        {},
        fetchOpts
      );
    }
  },
  pbksb_CommonWarehouseCommonYardService: {
    cancelGoodsReleaseRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CommonWarehouseCommonYardService_cancelGoodsReleaseRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "cancelGoodsReleaseRequest",
        params,
        fetchOpts
      );
    },
    cancelGoodsStorageRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CommonWarehouseCommonYardService_cancelGoodsStorageRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "cancelGoodsStorageRequest",
        params,
        fetchOpts
      );
    },
    createGoodsReleaseRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CommonWarehouseCommonYardService_createGoodsReleaseRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "createGoodsReleaseRequest",
        params,
        fetchOpts
      );
    },
    createGoodsStorageRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CommonWarehouseCommonYardService_createGoodsStorageRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "createGoodsStorageRequest",
        params,
        fetchOpts
      );
    },
    endorseGoodsReleaseRequest: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CommonWarehouseCommonYardService_endorseGoodsReleaseRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "endorseGoodsReleaseRequest",
        params,
        fetchOpts
      );
    },
    endorseGoodsStorageRequest: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CommonWarehouseCommonYardService_endorseGoodsStorageRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "endorseGoodsStorageRequest",
        params,
        fetchOpts
      );
    },
    getAllEndorsedReleaseRequestByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CommonWarehouseCommonYardService_getAllEndorsedReleaseRequestByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "getAllEndorsedReleaseRequestByCustomer",
        params,
        fetchOpts
      );
    },
    getAllEndorsedStorageRequestByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CommonWarehouseCommonYardService_getAllEndorsedStorageRequestByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "getAllEndorsedStorageRequestByCustomer",
        params,
        fetchOpts
      );
    },
    getAllReleaseRequest: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "getAllReleaseRequest",
        {},
        fetchOpts
      );
    },
    getAllReleaseRequestByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CommonWarehouseCommonYardService_getAllReleaseRequestByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "getAllReleaseRequestByCustomer",
        params,
        fetchOpts
      );
    },
    getAllStorageRequest: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "getAllStorageRequest",
        {},
        fetchOpts
      );
    },
    getAllStorageRequestByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CommonWarehouseCommonYardService_getAllStorageRequestByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "getAllStorageRequestByCustomer",
        params,
        fetchOpts
      );
    },
    getCommonWarehouseInventories: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CommonWarehouseCommonYardService_getCommonWarehouseInventories_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "getCommonWarehouseInventories",
        params,
        fetchOpts
      );
    },
    getCommonWarehouseTransactionsByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CommonWarehouseCommonYardService_getCommonWarehouseTransactionsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "getCommonWarehouseTransactionsByCustomer",
        params,
        fetchOpts
      );
    },
    getCommonYardInventories: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CommonWarehouseCommonYardService_getCommonYardInventories_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "getCommonYardInventories",
        params,
        fetchOpts
      );
    },
    getCommonYardTransactionsByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CommonWarehouseCommonYardService_getCommonYardTransactionsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "getCommonYardTransactionsByCustomer",
        params,
        fetchOpts
      );
    },
    getReleaseRequestByRequestNo: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CommonWarehouseCommonYardService_getReleaseRequestByRequestNo_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "getReleaseRequestByRequestNo",
        params,
        fetchOpts
      );
    },
    getRemainingCommonWarehouseInventory: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CommonWarehouseCommonYardService_getRemainingCommonWarehouseInventory_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "getRemainingCommonWarehouseInventory",
        params,
        fetchOpts
      );
    },
    getRemainingCommonYardInventory: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CommonWarehouseCommonYardService_getRemainingCommonYardInventory_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "getRemainingCommonYardInventory",
        params,
        fetchOpts
      );
    },
    getStorageRequestByRequestNo: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CommonWarehouseCommonYardService_getStorageRequestByRequestNo_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "getStorageRequestByRequestNo",
        params,
        fetchOpts
      );
    },
    getUOMList: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "getUOMList",
        {},
        fetchOpts
      );
    },
    updateGoodsReleaseRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CommonWarehouseCommonYardService_updateGoodsReleaseRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "updateGoodsReleaseRequest",
        params,
        fetchOpts
      );
    },
    updateGoodsStorageRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CommonWarehouseCommonYardService_updateGoodsStorageRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CommonWarehouseCommonYardService",
        "updateGoodsStorageRequest",
        params,
        fetchOpts
      );
    }
  },
  pbksb_CrewTransferService: {
    cancelCrewTransferSignOffRequest: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CrewTransferService_cancelCrewTransferSignOffRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CrewTransferService",
        "cancelCrewTransferSignOffRequest",
        params,
        fetchOpts
      );
    },
    cancelCrewTransferSignOnRequest: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CrewTransferService_cancelCrewTransferSignOnRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CrewTransferService",
        "cancelCrewTransferSignOnRequest",
        params,
        fetchOpts
      );
    },
    createCrewTransferSignOffRequest: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CrewTransferService_createCrewTransferSignOffRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CrewTransferService",
        "createCrewTransferSignOffRequest",
        params,
        fetchOpts
      );
    },
    createCrewTransferSignOnRequest: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CrewTransferService_createCrewTransferSignOnRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CrewTransferService",
        "createCrewTransferSignOnRequest",
        params,
        fetchOpts
      );
    },
    endorseCrewTransferSignOffRequest: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CrewTransferService_endorseCrewTransferSignOffRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CrewTransferService",
        "endorseCrewTransferSignOffRequest",
        params,
        fetchOpts
      );
    },
    endorseCrewTransferSignOnRequest: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CrewTransferService_endorseCrewTransferSignOnRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CrewTransferService",
        "endorseCrewTransferSignOnRequest",
        params,
        fetchOpts
      );
    },
    getAllCrewTransferSignOffRequest: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CrewTransferService_getAllCrewTransferSignOffRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CrewTransferService",
        "getAllCrewTransferSignOffRequest",
        params,
        fetchOpts
      );
    },
    getAllCrewTransferSignOnRequest: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CrewTransferService_getAllCrewTransferSignOnRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CrewTransferService",
        "getAllCrewTransferSignOnRequest",
        params,
        fetchOpts
      );
    },
    getAllCrewsForSignOff: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "pbksb_CrewTransferService",
        "getAllCrewsForSignOff",
        {},
        fetchOpts
      );
    },
    getCrewTransferRequestByRequestNumber: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CrewTransferService_getCrewTransferRequestByRequestNumber_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CrewTransferService",
        "getCrewTransferRequestByRequestNumber",
        params,
        fetchOpts
      );
    },
    getEndorsedCrewTransferSignOffRequest: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CrewTransferService_getEndorsedCrewTransferSignOffRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CrewTransferService",
        "getEndorsedCrewTransferSignOffRequest",
        params,
        fetchOpts
      );
    },
    getEndorsedCrewTransferSignOnRequest: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CrewTransferService_getEndorsedCrewTransferSignOnRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CrewTransferService",
        "getEndorsedCrewTransferSignOnRequest",
        params,
        fetchOpts
      );
    },
    updateCrewTransferSignOffRequest: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CrewTransferService_updateCrewTransferSignOffRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CrewTransferService",
        "updateCrewTransferSignOffRequest",
        params,
        fetchOpts
      );
    },
    updateCrewTransferSignOnRequest: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CrewTransferService_updateCrewTransferSignOnRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CrewTransferService",
        "updateCrewTransferSignOnRequest",
        params,
        fetchOpts
      );
    }
  },
  pbksb_CustomerService: {
    AssignAgent: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CustomerService_AssignAgent_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "AssignAgent",
        params,
        fetchOpts
      );
    },
    ContractDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CustomerService_ContractDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "ContractDetails",
        params,
        fetchOpts
      );
    },
    GetCustomerAgentByUserName: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_CustomerService_GetCustomerAgentByUserName_params) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "GetCustomerAgentByUserName",
        params,
        fetchOpts
      );
    },
    GetCustomerInfo: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CustomerService_GetCustomerInfo_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "GetCustomerInfo",
        params,
        fetchOpts
      );
    },
    GetILMSUserInfo: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CustomerService_GetILMSUserInfo_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "GetILMSUserInfo",
        params,
        fetchOpts
      );
    },
    GetJobMHE: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "GetJobMHE",
        {},
        fetchOpts
      );
    },
    GetListRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "GetListRequestForm",
        {},
        fetchOpts
      );
    },
    GetMHEEndorsedRequestDetails: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CustomerService_GetMHEEndorsedRequestDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "GetMHEEndorsedRequestDetails",
        params,
        fetchOpts
      );
    },
    GetMHEEndorsedRequestList: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "GetMHEEndorsedRequestList",
        {},
        fetchOpts
      );
    },
    GetMHEEndorsedRequestListByDate: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CustomerService_GetMHEEndorsedRequestListByDate_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "GetMHEEndorsedRequestListByDate",
        params,
        fetchOpts
      );
    },
    GetMHEJobDetailsByJobTicket: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_CustomerService_GetMHEJobDetailsByJobTicket_params) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "GetMHEJobDetailsByJobTicket",
        params,
        fetchOpts
      );
    },
    GetMHEJobDetailsByJobTicketMobileApp: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CustomerService_GetMHEJobDetailsByJobTicketMobileApp_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "GetMHEJobDetailsByJobTicketMobileApp",
        params,
        fetchOpts
      );
    },
    GetMHERequestFormPreview: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CustomerService_GetMHERequestFormPreview_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "GetMHERequestFormPreview",
        params,
        fetchOpts
      );
    },
    GetPageDetailBreakDown: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CustomerService_GetPageDetailBreakDown_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "GetPageDetailBreakDown",
        params,
        fetchOpts
      );
    },
    GetPageDetailBreakDownEstimation: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_CustomerService_GetPageDetailBreakDownEstimation_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "GetPageDetailBreakDownEstimation",
        params,
        fetchOpts
      );
    },
    IsSpecialRequestCrew: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CustomerService_IsSpecialRequestCrew_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "IsSpecialRequestCrew",
        params,
        fetchOpts
      );
    },
    ListAgentByCustomer: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CustomerService_ListAgentByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "ListAgentByCustomer",
        params,
        fetchOpts
      );
    },
    ListAgentUser: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "ListAgentUser",
        {},
        fetchOpts
      );
    },
    ListContractByCompany: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CustomerService_ListContractByCompany_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "ListContractByCompany",
        params,
        fetchOpts
      );
    },
    UnassignAgent: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CustomerService_UnassignAgent_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "UnassignAgent",
        params,
        fetchOpts
      );
    },
    UpdateAgentByCustomer: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CustomerService_UpdateAgentByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "UpdateAgentByCustomer",
        params,
        fetchOpts
      );
    },
    UpdateCancelJobTicket: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CustomerService_UpdateCancelJobTicket_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "UpdateCancelJobTicket",
        params,
        fetchOpts
      );
    },
    UpdateCancelRequestNumber: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CustomerService_UpdateCancelRequestNumber_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "UpdateCancelRequestNumber",
        params,
        fetchOpts
      );
    },
    getAllNationalities: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "getAllNationalities",
        {},
        fetchOpts
      );
    },
    getCountRequestFormCompleted: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "getCountRequestFormCompleted",
        {},
        fetchOpts
      );
    },
    getNextValue: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "getNextValue",
        {},
        fetchOpts
      );
    },
    getRequestFrom: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CustomerService_getRequestFrom_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "getRequestFrom",
        params,
        fetchOpts
      );
    },
    getRequestListForUser2: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "getRequestListForUser2",
        {},
        fetchOpts
      );
    },
    listAgent: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "listAgent",
        {},
        fetchOpts
      );
    },
    showCountRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "showCountRequest",
        {},
        fetchOpts
      );
    },
    submitRequestFrom: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CustomerService_submitRequestFrom_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "submitRequestFrom",
        params,
        fetchOpts
      );
    },
    test: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "test",
        {},
        fetchOpts
      );
    },
    updateRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_CustomerService_updateRequestForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_CustomerService",
        "updateRequestForm",
        params,
        fetchOpts
      );
    }
  },
  pbksb_DashBoardService: {
    getDashboardDetailsByAgent: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_DashBoardService_getDashboardDetailsByAgent_params) => {
      return cubaApp.invokeService(
        "pbksb_DashBoardService",
        "getDashboardDetailsByAgent",
        params,
        fetchOpts
      );
    },
    getDashboardDetailsByAgentFilteredByDateAndModule: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_DashBoardService_getDashboardDetailsByAgentFilteredByDateAndModule_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_DashBoardService",
        "getDashboardDetailsByAgentFilteredByDateAndModule",
        params,
        fetchOpts
      );
    }
  },
  pbksb_GRARestService: {
    cancelGRARequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRARestService_cancelGRARequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "cancelGRARequest",
        params,
        fetchOpts
      );
    },
    createGRARequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRARestService_createGRARequestForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "createGRARequestForm",
        params,
        fetchOpts
      );
    },
    editGRARequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRARestService_editGRARequestForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "editGRARequestForm",
        params,
        fetchOpts
      );
    },
    endorseGRARequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRARestService_endorseGRARequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "endorseGRARequest",
        params,
        fetchOpts
      );
    },
    getAgentCustomers: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRARestService_getAgentCustomers_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getAgentCustomers",
        params,
        fetchOpts
      );
    },
    getAgentDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRARestService_getAgentDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getAgentDetails",
        params,
        fetchOpts
      );
    },
    getAgentDetailsById: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRARestService_getAgentDetailsById_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getAgentDetailsById",
        params,
        fetchOpts
      );
    },
    getAgents: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getAgents",
        {},
        fetchOpts
      );
    },
    getCustomerAgents: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRARestService_getCustomerAgents_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getCustomerAgents",
        params,
        fetchOpts
      );
    },
    getCustomerDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRARestService_getCustomerDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getCustomerDetails",
        params,
        fetchOpts
      );
    },
    getCustomerDetailsById: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRARestService_getCustomerDetailsById_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getCustomerDetailsById",
        params,
        fetchOpts
      );
    },
    getCustomers: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getCustomers",
        {},
        fetchOpts
      );
    },
    getEndorsedGRARequestsByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_GRARestService_getEndorsedGRARequestsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getEndorsedGRARequestsByCustomer",
        params,
        fetchOpts
      );
    },
    getGRARequestByRequestNumber: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_GRARestService_getGRARequestByRequestNumber_params) => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getGRARequestByRequestNumber",
        params,
        fetchOpts
      );
    },
    getGRARequestsByCustomer: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRARestService_getGRARequestsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getGRARequestsByCustomer",
        params,
        fetchOpts
      );
    },
    getICYSItemTypes: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getICYSItemTypes",
        {},
        fetchOpts
      );
    },
    getItemTypes: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getItemTypes",
        {},
        fetchOpts
      );
    },
    getPendingEndorsementGRARequestsByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_GRARestService_getPendingEndorsementGRARequestsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getPendingEndorsementGRARequestsByCustomer",
        params,
        fetchOpts
      );
    },
    getServerDate: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getServerDate",
        {},
        fetchOpts
      );
    },
    getServerDateTime: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getServerDateTime",
        {},
        fetchOpts
      );
    },
    getServerTime: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getServerTime",
        {},
        fetchOpts
      );
    },
    getSiteLocations: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getSiteLocations",
        {},
        fetchOpts
      );
    },
    getStorageLocations: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_GRARestService",
        "getStorageLocations",
        {},
        fetchOpts
      );
    }
  },
  pbksb_GRNRestService: {
    cancelGRNRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRNRestService_cancelGRNRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "cancelGRNRequest",
        params,
        fetchOpts
      );
    },
    createGRNRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRNRestService_createGRNRequestForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "createGRNRequestForm",
        params,
        fetchOpts
      );
    },
    editGRNRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRNRestService_editGRNRequestForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "editGRNRequestForm",
        params,
        fetchOpts
      );
    },
    endorseGRNRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRNRestService_endorseGRNRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "endorseGRNRequest",
        params,
        fetchOpts
      );
    },
    getAgentCustomers: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRNRestService_getAgentCustomers_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "getAgentCustomers",
        params,
        fetchOpts
      );
    },
    getAgentDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRNRestService_getAgentDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "getAgentDetails",
        params,
        fetchOpts
      );
    },
    getAgentDetailsById: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRNRestService_getAgentDetailsById_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "getAgentDetailsById",
        params,
        fetchOpts
      );
    },
    getAgents: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "getAgents",
        {},
        fetchOpts
      );
    },
    getCustomerAgents: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRNRestService_getCustomerAgents_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "getCustomerAgents",
        params,
        fetchOpts
      );
    },
    getCustomerDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRNRestService_getCustomerDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "getCustomerDetails",
        params,
        fetchOpts
      );
    },
    getCustomerDetailsById: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRNRestService_getCustomerDetailsById_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "getCustomerDetailsById",
        params,
        fetchOpts
      );
    },
    getCustomerInventoryItems: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRNRestService_getCustomerInventoryItems_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "getCustomerInventoryItems",
        params,
        fetchOpts
      );
    },
    getCustomerInventoryTransactions: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_GRNRestService_getCustomerInventoryTransactions_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "getCustomerInventoryTransactions",
        params,
        fetchOpts
      );
    },
    getCustomers: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "getCustomers",
        {},
        fetchOpts
      );
    },
    getEndorsedGRNRequestsByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_GRNRestService_getEndorsedGRNRequestsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "getEndorsedGRNRequestsByCustomer",
        params,
        fetchOpts
      );
    },
    getGRNRequestByRequestNumber: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_GRNRestService_getGRNRequestByRequestNumber_params) => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "getGRNRequestByRequestNumber",
        params,
        fetchOpts
      );
    },
    getGRNRequestsByCustomer: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GRNRestService_getGRNRequestsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "getGRNRequestsByCustomer",
        params,
        fetchOpts
      );
    },
    getServerDate: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "getServerDate",
        {},
        fetchOpts
      );
    },
    getServerDateTime: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "getServerDateTime",
        {},
        fetchOpts
      );
    },
    getServerTime: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_GRNRestService",
        "getServerTime",
        {},
        fetchOpts
      );
    }
  },
  pbksb_GetBerthFormHeaderService: {
    fetchBerthForminHM: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GetBerthFormHeaderService_fetchBerthForminHM_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GetBerthFormHeaderService",
        "fetchBerthForminHM",
        params,
        fetchOpts
      );
    },
    getBerthInformationByBFID: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GetBerthFormHeaderService_getBerthInformationByBFID_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GetBerthFormHeaderService",
        "getBerthInformationByBFID",
        params,
        fetchOpts
      );
    },
    getBerthInformationByBFIDandshifting: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_GetBerthFormHeaderService_getBerthInformationByBFIDandshifting_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GetBerthFormHeaderService",
        "getBerthInformationByBFIDandshifting",
        params,
        fetchOpts
      );
    },
    getBerthInformationByID: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GetBerthFormHeaderService_getBerthInformationByID_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GetBerthFormHeaderService",
        "getBerthInformationByID",
        params,
        fetchOpts
      );
    },
    getBerthingInformation: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GetBerthFormHeaderService_getBerthingInformation_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GetBerthFormHeaderService",
        "getBerthingInformation",
        params,
        fetchOpts
      );
    },
    getEncrypPssword: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GetBerthFormHeaderService_getEncrypPssword_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GetBerthFormHeaderService",
        "getEncrypPssword",
        params,
        fetchOpts
      );
    },
    getGrandTotalAll: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GetBerthFormHeaderService_getGrandTotalAll_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GetBerthFormHeaderService",
        "getGrandTotalAll",
        params,
        fetchOpts
      );
    },
    getHashencrypPssword: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GetBerthFormHeaderService_getHashencrypPssword_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GetBerthFormHeaderService",
        "getHashencrypPssword",
        params,
        fetchOpts
      );
    },
    updateNewPsswordStatus: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_GetBerthFormHeaderService_updateNewPsswordStatus_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_GetBerthFormHeaderService",
        "updateNewPsswordStatus",
        params,
        fetchOpts
      );
    }
  },
  pbksb_ICWAddSRestService: {
    cancelASRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWAddSRestService_cancelASRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "cancelASRequest",
        params,
        fetchOpts
      );
    },
    createASRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWAddSRestService_createASRequestForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "createASRequestForm",
        params,
        fetchOpts
      );
    },
    editASRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWAddSRestService_editASRequestForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "editASRequestForm",
        params,
        fetchOpts
      );
    },
    endorseASRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWAddSRestService_endorseASRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "endorseASRequest",
        params,
        fetchOpts
      );
    },
    getASRequestByRequestNumber: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ICWAddSRestService_getASRequestByRequestNumber_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getASRequestByRequestNumber",
        params,
        fetchOpts
      );
    },
    getASRequestsByCustomer: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWAddSRestService_getASRequestsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getASRequestsByCustomer",
        params,
        fetchOpts
      );
    },
    getAgentCustomers: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWAddSRestService_getAgentCustomers_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getAgentCustomers",
        params,
        fetchOpts
      );
    },
    getAgentDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWAddSRestService_getAgentDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getAgentDetails",
        params,
        fetchOpts
      );
    },
    getAgentDetailsById: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWAddSRestService_getAgentDetailsById_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getAgentDetailsById",
        params,
        fetchOpts
      );
    },
    getAgents: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getAgents",
        {},
        fetchOpts
      );
    },
    getCustomerAgents: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWAddSRestService_getCustomerAgents_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getCustomerAgents",
        params,
        fetchOpts
      );
    },
    getCustomerDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWAddSRestService_getCustomerDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getCustomerDetails",
        params,
        fetchOpts
      );
    },
    getCustomerDetailsById: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWAddSRestService_getCustomerDetailsById_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getCustomerDetailsById",
        params,
        fetchOpts
      );
    },
    getCustomerInventoryItems: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWAddSRestService_getCustomerInventoryItems_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getCustomerInventoryItems",
        params,
        fetchOpts
      );
    },
    getCustomerInventoryTransactions: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ICWAddSRestService_getCustomerInventoryTransactions_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getCustomerInventoryTransactions",
        params,
        fetchOpts
      );
    },
    getCustomers: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getCustomers",
        {},
        fetchOpts
      );
    },
    getEndorsedASRequestsByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ICWAddSRestService_getEndorsedASRequestsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getEndorsedASRequestsByCustomer",
        params,
        fetchOpts
      );
    },
    getItemTypes: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getItemTypes",
        {},
        fetchOpts
      );
    },
    getPendingEndorsementASRequestsByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ICWAddSRestService_getPendingEndorsementASRequestsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getPendingEndorsementASRequestsByCustomer",
        params,
        fetchOpts
      );
    },
    getServerDate: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getServerDate",
        {},
        fetchOpts
      );
    },
    getServerDateTime: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getServerDateTime",
        {},
        fetchOpts
      );
    },
    getServerTime: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getServerTime",
        {},
        fetchOpts
      );
    },
    getUOMList: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWAddSRestService",
        "getUOMList",
        {},
        fetchOpts
      );
    }
  },
  pbksb_ICWRestService: {
    cancelStorageRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWRestService_cancelStorageRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "cancelStorageRequest",
        params,
        fetchOpts
      );
    },
    createStorageRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWRestService_createStorageRequestForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "createStorageRequestForm",
        params,
        fetchOpts
      );
    },
    editStorageRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWRestService_editStorageRequestForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "editStorageRequestForm",
        params,
        fetchOpts
      );
    },
    endorseStorageRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWRestService_endorseStorageRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "endorseStorageRequest",
        params,
        fetchOpts
      );
    },
    getAgentCustomers: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWRestService_getAgentCustomers_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getAgentCustomers",
        params,
        fetchOpts
      );
    },
    getAgentDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWRestService_getAgentDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getAgentDetails",
        params,
        fetchOpts
      );
    },
    getAgentDetailsById: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWRestService_getAgentDetailsById_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getAgentDetailsById",
        params,
        fetchOpts
      );
    },
    getAgents: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getAgents",
        {},
        fetchOpts
      );
    },
    getCustomerAgents: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWRestService_getCustomerAgents_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getCustomerAgents",
        params,
        fetchOpts
      );
    },
    getCustomerDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWRestService_getCustomerDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getCustomerDetails",
        params,
        fetchOpts
      );
    },
    getCustomerDetailsById: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWRestService_getCustomerDetailsById_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getCustomerDetailsById",
        params,
        fetchOpts
      );
    },
    getCustomers: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getCustomers",
        {},
        fetchOpts
      );
    },
    getEndorsedStorageRequestsByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ICWRestService_getEndorsedStorageRequestsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getEndorsedStorageRequestsByCustomer",
        params,
        fetchOpts
      );
    },
    getItemTypes: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWRestService_getItemTypes_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getItemTypes",
        params,
        fetchOpts
      );
    },
    getPendingEndorsementStorageRequestsByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ICWRestService_getPendingEndorsementStorageRequestsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getPendingEndorsementStorageRequestsByCustomer",
        params,
        fetchOpts
      );
    },
    getServerDate: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getServerDate",
        {},
        fetchOpts
      );
    },
    getServerDateTime: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getServerDateTime",
        {},
        fetchOpts
      );
    },
    getServerTime: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getServerTime",
        {},
        fetchOpts
      );
    },
    getStorageRequestByRequestNumber: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ICWRestService_getStorageRequestByRequestNumber_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getStorageRequestByRequestNumber",
        params,
        fetchOpts
      );
    },
    getStorageRequestsByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_ICWRestService_getStorageRequestsByCustomer_params) => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getStorageRequestsByCustomer",
        params,
        fetchOpts
      );
    },
    getUOMList: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getUOMList",
        {},
        fetchOpts
      );
    },
    getWarehouseUtil: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWRestService_getWarehouseUtil_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWRestService",
        "getWarehouseUtil",
        params,
        fetchOpts
      );
    }
  },
  pbksb_ICWTransferRestService: {
    cancelTransferRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWTransferRestService_cancelTransferRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "cancelTransferRequest",
        params,
        fetchOpts
      );
    },
    createTransferRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWTransferRestService_createTransferRequestForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "createTransferRequestForm",
        params,
        fetchOpts
      );
    },
    editTransferRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWTransferRestService_editTransferRequestForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "editTransferRequestForm",
        params,
        fetchOpts
      );
    },
    endorseTransferRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWTransferRestService_endorseTransferRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "endorseTransferRequest",
        params,
        fetchOpts
      );
    },
    getAgentCustomers: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWTransferRestService_getAgentCustomers_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getAgentCustomers",
        params,
        fetchOpts
      );
    },
    getAgentDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWTransferRestService_getAgentDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getAgentDetails",
        params,
        fetchOpts
      );
    },
    getAgentDetailsById: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWTransferRestService_getAgentDetailsById_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getAgentDetailsById",
        params,
        fetchOpts
      );
    },
    getAgents: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getAgents",
        {},
        fetchOpts
      );
    },
    getCustomerAgents: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWTransferRestService_getCustomerAgents_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getCustomerAgents",
        params,
        fetchOpts
      );
    },
    getCustomerDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWTransferRestService_getCustomerDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getCustomerDetails",
        params,
        fetchOpts
      );
    },
    getCustomerDetailsById: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWTransferRestService_getCustomerDetailsById_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getCustomerDetailsById",
        params,
        fetchOpts
      );
    },
    getCustomerInventoryBalances: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ICWTransferRestService_getCustomerInventoryBalances_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getCustomerInventoryBalances",
        params,
        fetchOpts
      );
    },
    getCustomerInventoryDetails: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ICWTransferRestService_getCustomerInventoryDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getCustomerInventoryDetails",
        params,
        fetchOpts
      );
    },
    getCustomerInventoryItems: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWTransferRestService_getCustomerInventoryItems_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getCustomerInventoryItems",
        params,
        fetchOpts
      );
    },
    getCustomerInventoryTransactions: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ICWTransferRestService_getCustomerInventoryTransactions_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getCustomerInventoryTransactions",
        params,
        fetchOpts
      );
    },
    getCustomers: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getCustomers",
        {},
        fetchOpts
      );
    },
    getEndorsedTransferRequestsByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ICWTransferRestService_getEndorsedTransferRequestsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getEndorsedTransferRequestsByCustomer",
        params,
        fetchOpts
      );
    },
    getInventoryICWItem: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ICWTransferRestService_getInventoryICWItem_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getInventoryICWItem",
        params,
        fetchOpts
      );
    },
    getItemTypes: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getItemTypes",
        {},
        fetchOpts
      );
    },
    getPendingEndorsementTransferRequestsByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ICWTransferRestService_getPendingEndorsementTransferRequestsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getPendingEndorsementTransferRequestsByCustomer",
        params,
        fetchOpts
      );
    },
    getServerDate: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getServerDate",
        {},
        fetchOpts
      );
    },
    getServerDateTime: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getServerDateTime",
        {},
        fetchOpts
      );
    },
    getServerTime: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getServerTime",
        {},
        fetchOpts
      );
    },
    getTransferRequestByRequestNumber: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ICWTransferRestService_getTransferRequestByRequestNumber_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getTransferRequestByRequestNumber",
        params,
        fetchOpts
      );
    },
    getTransferRequestsByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ICWTransferRestService_getTransferRequestsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getTransferRequestsByCustomer",
        params,
        fetchOpts
      );
    },
    getUOMList: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ICWTransferRestService",
        "getUOMList",
        {},
        fetchOpts
      );
    }
  },
  pbksb_InventoryService: {
    getInventoryDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_InventoryService_getInventoryDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_InventoryService",
        "getInventoryDetails",
        params,
        fetchOpts
      );
    }
  },
  pbksb_JobMHEService: {
    GetListJobMHEDocument: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_GetListJobMHEDocument_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "GetListJobMHEDocument",
        params,
        fetchOpts
      );
    },
    GetListofJobMHEForNewAndOnProgress: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "GetListofJobMHEForNewAndOnProgress",
        {},
        fetchOpts
      );
    },
    GetListofJobMHEbyDate: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_GetListofJobMHEbyDate_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "GetListofJobMHEbyDate",
        params,
        fetchOpts
      );
    },
    GetListofJobMHEbyDateSort: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_GetListofJobMHEbyDateSort_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "GetListofJobMHEbyDateSort",
        params,
        fetchOpts
      );
    },
    GetListofJobMHEbyStatus: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_GetListofJobMHEbyStatus_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "GetListofJobMHEbyStatus",
        params,
        fetchOpts
      );
    },
    GetPriceBreakDownByJobTicket: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_JobMHEService_GetPriceBreakDownByJobTicket_params) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "GetPriceBreakDownByJobTicket",
        params,
        fetchOpts
      );
    },
    GetPriceBreakDownList: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_GetPriceBreakDownList_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "GetPriceBreakDownList",
        params,
        fetchOpts
      );
    },
    GetPriceScheduleByMachineryType: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_JobMHEService_GetPriceScheduleByMachineryType_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "GetPriceScheduleByMachineryType",
        params,
        fetchOpts
      );
    },
    GetPriceScheduleByManPowerPositionHandling: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_JobMHEService_GetPriceScheduleByManPowerPositionHandling_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "GetPriceScheduleByManPowerPositionHandling",
        params,
        fetchOpts
      );
    },
    IFS_Calculate_MHE_Job: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_IFS_Calculate_MHE_Job_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "IFS_Calculate_MHE_Job",
        params,
        fetchOpts
      );
    },
    RegisterEmployeeToken: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_RegisterEmployeeToken_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "RegisterEmployeeToken",
        params,
        fetchOpts
      );
    },
    RequestAmendJobTicket: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_RequestAmendJobTicket_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "RequestAmendJobTicket",
        params,
        fetchOpts
      );
    },
    UpdateBreakTimeJobTicket: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_UpdateBreakTimeJobTicket_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "UpdateBreakTimeJobTicket",
        params,
        fetchOpts
      );
    },
    UpdateCancelJobTicket: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_UpdateCancelJobTicket_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "UpdateCancelJobTicket",
        params,
        fetchOpts
      );
    },
    UpdateEndorseJobTicket: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_UpdateEndorseJobTicket_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "UpdateEndorseJobTicket",
        params,
        fetchOpts
      );
    },
    UpdateInProgressJobTicket: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_UpdateInProgressJobTicket_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "UpdateInProgressJobTicket",
        params,
        fetchOpts
      );
    },
    UpdateJobTicketCompleted: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_UpdateJobTicketCompleted_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "UpdateJobTicketCompleted",
        params,
        fetchOpts
      );
    },
    UpdateJobTicketNumberForCompletedWithTimeCompletedAndRemarks: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_JobMHEService_UpdateJobTicketNumberForCompletedWithTimeCompletedAndRemarks_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "UpdateJobTicketNumberForCompletedWithTimeCompletedAndRemarks",
        params,
        fetchOpts
      );
    },
    UpdateRequestNumberCompleted: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_JobMHEService_UpdateRequestNumberCompleted_params) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "UpdateRequestNumberCompleted",
        params,
        fetchOpts
      );
    },
    fileUpload_JobMHE: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_fileUpload_JobMHE_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "fileUpload_JobMHE",
        params,
        fetchOpts
      );
    },
    getAllCustomer: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "getAllCustomer",
        {},
        fetchOpts
      );
    },
    getCSVInvoice: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_getCSVInvoice_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "getCSVInvoice",
        params,
        fetchOpts
      );
    },
    getCountRequestFormInProgress: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "getCountRequestFormInProgress",
        {},
        fetchOpts
      );
    },
    getCountRequestFormSubmitted: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "getCountRequestFormSubmitted",
        {},
        fetchOpts
      );
    },
    getCustomer: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_getCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "getCustomer",
        params,
        fetchOpts
      );
    },
    getJobTicketAll: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "getJobTicketAll",
        {},
        fetchOpts
      );
    },
    getMobileTotalJob: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "getMobileTotalJob",
        {},
        fetchOpts
      );
    },
    getmobileAppsDashboard: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "getmobileAppsDashboard",
        {},
        fetchOpts
      );
    },
    sendNotification: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_sendNotification_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "sendNotification",
        params,
        fetchOpts
      );
    },
    setStatus: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_JobMHEService_setStatus_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_JobMHEService",
        "setStatus",
        params,
        fetchOpts
      );
    }
  },
  pbksb_JobTicketStatusService: {
    getAllJobTicketStatus: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "pbksb_JobTicketStatusService",
        "getAllJobTicketStatus",
        {},
        fetchOpts
      );
    }
  },
  pbksb_MHEAssignOperatorService: {
    AssignOperator: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MHEAssignOperatorService_AssignOperator_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MHEAssignOperatorService",
        "AssignOperator",
        params,
        fetchOpts
      );
    },
    EstimateGangByDate: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MHEAssignOperatorService_EstimateGangByDate_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MHEAssignOperatorService",
        "EstimateGangByDate",
        params,
        fetchOpts
      );
    },
    getGangOn: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_MHEAssignOperatorService",
        "getGangOn",
        {},
        fetchOpts
      );
    }
  },
  pbksb_MarineService: {
    AddMHERequestMachinery: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_AddMHERequestMachinery_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "AddMHERequestMachinery",
        params,
        fetchOpts
      );
    },
    CancelBerthRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_CancelBerthRequestForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "CancelBerthRequestForm",
        params,
        fetchOpts
      );
    },
    CancelBerthRequestFuelWaterStandAloneForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_CancelBerthRequestFuelWaterStandAloneForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "CancelBerthRequestFuelWaterStandAloneForm",
        params,
        fetchOpts
      );
    },
    CancelBerthWorkPermit: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_CancelBerthWorkPermit_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "CancelBerthWorkPermit",
        params,
        fetchOpts
      );
    },
    CancelEquipment: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_CancelEquipment_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "CancelEquipment",
        params,
        fetchOpts
      );
    },
    CancelExternalItem: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_CancelExternalItem_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "CancelExternalItem",
        params,
        fetchOpts
      );
    },
    CancelFuelWaterItem: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_CancelFuelWaterItem_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "CancelFuelWaterItem",
        params,
        fetchOpts
      );
    },
    CancelGeneralWorks: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_CancelGeneralWorks_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "CancelGeneralWorks",
        params,
        fetchOpts
      );
    },
    CancelJobMHE: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_CancelJobMHE_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "CancelJobMHE",
        params,
        fetchOpts
      );
    },
    CancelMHEJobConsole: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_CancelMHEJobConsole_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "CancelMHEJobConsole",
        params,
        fetchOpts
      );
    },
    CancelMHEJobNormal: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_CancelMHEJobNormal_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "CancelMHEJobNormal",
        params,
        fetchOpts
      );
    },
    CancelMachinery: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_CancelMachinery_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "CancelMachinery",
        params,
        fetchOpts
      );
    },
    CancelManpower: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_CancelManpower_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "CancelManpower",
        params,
        fetchOpts
      );
    },
    CancelUnderdeck: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_CancelUnderdeck_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "CancelUnderdeck",
        params,
        fetchOpts
      );
    },
    CancelWorkWithPermit: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_CancelWorkWithPermit_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "CancelWorkWithPermit",
        params,
        fetchOpts
      );
    },
    ChangeStatusBerthRequestForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_ChangeStatusBerthRequestForm_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "ChangeStatusBerthRequestForm",
        params,
        fetchOpts
      );
    },
    ChangeStatusBerthWorkPermit: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_ChangeStatusBerthWorkPermit_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "ChangeStatusBerthWorkPermit",
        params,
        fetchOpts
      );
    },
    ChangeStatusUnderDeckSummary: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_ChangeStatusUnderDeckSummary_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "ChangeStatusUnderDeckSummary",
        params,
        fetchOpts
      );
    },
    CreateUnderdeckItem: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_CreateUnderdeckItem_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "CreateUnderdeckItem",
        params,
        fetchOpts
      );
    },
    DeleteBerthFormDoc: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_DeleteBerthFormDoc_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "DeleteBerthFormDoc",
        params,
        fetchOpts
      );
    },
    DeleteWharfageFormDoc: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_DeleteWharfageFormDoc_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "DeleteWharfageFormDoc",
        params,
        fetchOpts
      );
    },
    EndorseBOD: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_EndorseBOD_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "EndorseBOD",
        params,
        fetchOpts
      );
    },
    EndorseWharfage: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_EndorseWharfage_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "EndorseWharfage",
        params,
        fetchOpts
      );
    },
    EndorsedBOD: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_EndorsedBOD_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "EndorsedBOD",
        params,
        fetchOpts
      );
    },
    EndorsedBerthRequestFuelWaterStandAloneForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_EndorsedBerthRequestFuelWaterStandAloneForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "EndorsedBerthRequestFuelWaterStandAloneForm",
        params,
        fetchOpts
      );
    },
    EndorsedFuelWater: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_EndorsedFuelWater_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "EndorsedFuelWater",
        params,
        fetchOpts
      );
    },
    EndorsedFuelWaterJobTicket: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_EndorsedFuelWaterJobTicket_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "EndorsedFuelWaterJobTicket",
        params,
        fetchOpts
      );
    },
    EntityResponse: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_EntityResponse_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "EntityResponse",
        params,
        fetchOpts
      );
    },
    GetAdditionalServices: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetAdditionalServices_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetAdditionalServices",
        params,
        fetchOpts
      );
    },
    GetAgentCompanies: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetAgentCompanies",
        {},
        fetchOpts
      );
    },
    GetBODDetailsByBODNo: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetBODDetailsByBODNo_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBODDetailsByBODNo",
        params,
        fetchOpts
      );
    },
    GetBODListByCompany: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetBODListByCompany_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBODListByCompany",
        params,
        fetchOpts
      );
    },
    GetBerthFormDoc: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetBerthFormDoc_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBerthFormDoc",
        params,
        fetchOpts
      );
    },
    GetBerthFormDocs: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetBerthFormDocs_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBerthFormDocs",
        params,
        fetchOpts
      );
    },
    GetBerthFuelWaterJobTicketDetails: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_GetBerthFuelWaterJobTicketDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBerthFuelWaterJobTicketDetails",
        params,
        fetchOpts
      );
    },
    GetBerthFuelWaterJobTicketPreview: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_GetBerthFuelWaterJobTicketPreview_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBerthFuelWaterJobTicketPreview",
        params,
        fetchOpts
      );
    },
    GetBerthFuelWaterStandaloneJobTicketPreview: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_GetBerthFuelWaterStandaloneJobTicketPreview_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBerthFuelWaterStandaloneJobTicketPreview",
        params,
        fetchOpts
      );
    },
    GetBerthHeavyPackages: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetBerthHeavyPackages_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBerthHeavyPackages",
        params,
        fetchOpts
      );
    },
    GetBerthMaterialRequisitionByCompany: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_GetBerthMaterialRequisitionByCompany_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBerthMaterialRequisitionByCompany",
        params,
        fetchOpts
      );
    },
    GetBerthMaterialRequisitionDetails: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_GetBerthMaterialRequisitionDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBerthMaterialRequisitionDetails",
        params,
        fetchOpts
      );
    },
    GetBerthRequestByCompany: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetBerthRequestByCompany_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBerthRequestByCompany",
        params,
        fetchOpts
      );
    },
    GetBerthRequestDetailsByRequestNo: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_GetBerthRequestDetailsByRequestNo_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBerthRequestDetailsByRequestNo",
        params,
        fetchOpts
      );
    },
    GetBerthScopeOfWork: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetBerthScopeOfWork_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBerthScopeOfWork",
        params,
        fetchOpts
      );
    },
    GetBerthScopeWorkByGroup: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetBerthScopeWorkByGroup_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBerthScopeWorkByGroup",
        params,
        fetchOpts
      );
    },
    GetBerthWorkProgram: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetBerthWorkProgram_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBerthWorkProgram",
        params,
        fetchOpts
      );
    },
    GetBerthWorkProgramSummary: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_GetBerthWorkProgramSummary_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBerthWorkProgramSummary",
        params,
        fetchOpts
      );
    },
    GetBerthingInformation: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetBerthingInformation_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBerthingInformation",
        params,
        fetchOpts
      );
    },
    GetBookingType: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetBookingType",
        {},
        fetchOpts
      );
    },
    GetDocumentType: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetDocumentType",
        {},
        fetchOpts
      );
    },
    GetEndorsedBODDetailsByBODNo: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_GetEndorsedBODDetailsByBODNo_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetEndorsedBODDetailsByBODNo",
        params,
        fetchOpts
      );
    },
    GetEndorsedBODListByCompany: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_GetEndorsedBODListByCompany_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetEndorsedBODListByCompany",
        params,
        fetchOpts
      );
    },
    GetEndorsedFuelWaterStandaloneListRequestByCompany: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_GetEndorsedFuelWaterStandaloneListRequestByCompany_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetEndorsedFuelWaterStandaloneListRequestByCompany",
        params,
        fetchOpts
      );
    },
    GetFuelWaterRequestFormDetails: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_GetFuelWaterRequestFormDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetFuelWaterRequestFormDetails",
        params,
        fetchOpts
      );
    },
    GetFuelWaterRequestFormStandAloneDetails: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_GetFuelWaterRequestFormStandAloneDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetFuelWaterRequestFormStandAloneDetails",
        params,
        fetchOpts
      );
    },
    GetFuelWaterStandaloneListRequestByCompany: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_GetFuelWaterStandaloneListRequestByCompany_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetFuelWaterStandaloneListRequestByCompany",
        params,
        fetchOpts
      );
    },
    GetGeneralWorksFormDetails: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_GetGeneralWorksFormDetails_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetGeneralWorksFormDetails",
        params,
        fetchOpts
      );
    },
    GetListCancelledJobs: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetListCancelledJobs_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetListCancelledJobs",
        params,
        fetchOpts
      );
    },
    GetListCompletedJobs: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetListCompletedJobs_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetListCompletedJobs",
        params,
        fetchOpts
      );
    },
    GetMHERequestFormDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetMHERequestFormDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetMHERequestFormDetails",
        params,
        fetchOpts
      );
    },
    GetMarineServiceCode: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetMarineServiceCode_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetMarineServiceCode",
        params,
        fetchOpts
      );
    },
    GetMobileJobTicketDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetMobileJobTicketDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetMobileJobTicketDetails",
        params,
        fetchOpts
      );
    },
    GetMobileJobTicketItemDetails: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_GetMobileJobTicketItemDetails_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetMobileJobTicketItemDetails",
        params,
        fetchOpts
      );
    },
    GetNewInProgressJobs: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetNewInProgressJobs_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetNewInProgressJobs",
        params,
        fetchOpts
      );
    },
    GetNewInProgressJobsByStatus: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_GetNewInProgressJobsByStatus_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetNewInProgressJobsByStatus",
        params,
        fetchOpts
      );
    },
    GetRequestType: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetRequestType",
        {},
        fetchOpts
      );
    },
    GetSRDetailsByWharfageID: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetSRDetailsByWharfageID_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetSRDetailsByWharfageID",
        params,
        fetchOpts
      );
    },
    GetServiceRequestByCompany: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_GetServiceRequestByCompany_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetServiceRequestByCompany",
        params,
        fetchOpts
      );
    },
    GetServiceRequestListByCompany: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_GetServiceRequestListByCompany_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetServiceRequestListByCompany",
        params,
        fetchOpts
      );
    },
    GetUnderdeckFormDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetUnderdeckFormDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetUnderdeckFormDetails",
        params,
        fetchOpts
      );
    },
    GetVesselArrivalDepartureInformation: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_GetVesselArrivalDepartureInformation_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetVesselArrivalDepartureInformation",
        params,
        fetchOpts
      );
    },
    GetWharfageDocs: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_GetWharfageDocs_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetWharfageDocs",
        params,
        fetchOpts
      );
    },
    GetWharfageGeneralWorksDetails: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_GetWharfageGeneralWorksDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetWharfageGeneralWorksDetails",
        params,
        fetchOpts
      );
    },
    GetWharfageUnderdeckDetails: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_GetWharfageUnderdeckDetails_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetWharfageUnderdeckDetails",
        params,
        fetchOpts
      );
    },
    GetWorkProgramCancellationPreview: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_GetWorkProgramCancellationPreview_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetWorkProgramCancellationPreview",
        params,
        fetchOpts
      );
    },
    GetWorkWithPermitFormDetails: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_GetWorkWithPermitFormDetails_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "GetWorkWithPermitFormDetails",
        params,
        fetchOpts
      );
    },
    ListAgent: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "ListAgent",
        {},
        fetchOpts
      );
    },
    ListCustomer: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "ListCustomer",
        {},
        fetchOpts
      );
    },
    ListLocation: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "ListLocation",
        {},
        fetchOpts
      );
    },
    ListVessel: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "ListVessel",
        {},
        fetchOpts
      );
    },
    PostBerthMHERequestConsole: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_PostBerthMHERequestConsole_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "PostBerthMHERequestConsole",
        params,
        fetchOpts
      );
    },
    PostBerthMHERequestNormal: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_PostBerthMHERequestNormal_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "PostBerthMHERequestNormal",
        params,
        fetchOpts
      );
    },
    PostBerthRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_PostBerthRequestForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "PostBerthRequestForm",
        params,
        fetchOpts
      );
    },
    PostBerthRequestFuelWaterForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_PostBerthRequestFuelWaterForm_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "PostBerthRequestFuelWaterForm",
        params,
        fetchOpts
      );
    },
    PostBerthRequestFuelWaterStandAloneForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_PostBerthRequestFuelWaterStandAloneForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "PostBerthRequestFuelWaterStandAloneForm",
        params,
        fetchOpts
      );
    },
    PostGeneralWorksForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_PostGeneralWorksForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "PostGeneralWorksForm",
        params,
        fetchOpts
      );
    },
    PostMaterialRequisitionForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_PostMaterialRequisitionForm_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "PostMaterialRequisitionForm",
        params,
        fetchOpts
      );
    },
    PostServiceRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_PostServiceRequestForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "PostServiceRequestForm",
        params,
        fetchOpts
      );
    },
    PostUnderDeckForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_PostUnderDeckForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "PostUnderDeckForm",
        params,
        fetchOpts
      );
    },
    PostWorkPermitForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_PostWorkPermitForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "PostWorkPermitForm",
        params,
        fetchOpts
      );
    },
    RejectBOD: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_RejectBOD_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "RejectBOD",
        params,
        fetchOpts
      );
    },
    RejectFuelWaterStandAloneForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_RejectFuelWaterStandAloneForm_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "RejectFuelWaterStandAloneForm",
        params,
        fetchOpts
      );
    },
    RejectWharfage: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_RejectWharfage_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "RejectWharfage",
        params,
        fetchOpts
      );
    },
    SetMHEFormStatus: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_SetMHEFormStatus_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "SetMHEFormStatus",
        params,
        fetchOpts
      );
    },
    StringResponse: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_StringResponse_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "StringResponse",
        params,
        fetchOpts
      );
    },
    SubmitBerthMaterialRequisition: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_SubmitBerthMaterialRequisition_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "SubmitBerthMaterialRequisition",
        params,
        fetchOpts
      );
    },
    SubmitBerthRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_SubmitBerthRequestForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "SubmitBerthRequestForm",
        params,
        fetchOpts
      );
    },
    SubmitBerthRequestFuelWaterStandAloneForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_SubmitBerthRequestFuelWaterStandAloneForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "SubmitBerthRequestFuelWaterStandAloneForm",
        params,
        fetchOpts
      );
    },
    SubmitWharfageRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_SubmitWharfageRequestForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "SubmitWharfageRequestForm",
        params,
        fetchOpts
      );
    },
    UpdateBerthHeavyPackagesForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_UpdateBerthHeavyPackagesForm_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UpdateBerthHeavyPackagesForm",
        params,
        fetchOpts
      );
    },
    UpdateBerthMHERequestConsole: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_UpdateBerthMHERequestConsole_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UpdateBerthMHERequestConsole",
        params,
        fetchOpts
      );
    },
    UpdateBerthMHERequestNormal: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_UpdateBerthMHERequestNormal_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UpdateBerthMHERequestNormal",
        params,
        fetchOpts
      );
    },
    UpdateBerthMaterialRequisition: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_UpdateBerthMaterialRequisition_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UpdateBerthMaterialRequisition",
        params,
        fetchOpts
      );
    },
    UpdateBerthRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_UpdateBerthRequestForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UpdateBerthRequestForm",
        params,
        fetchOpts
      );
    },
    UpdateBerthRequestFuelWaterForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_UpdateBerthRequestFuelWaterForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UpdateBerthRequestFuelWaterForm",
        params,
        fetchOpts
      );
    },
    UpdateBerthRequestFuelWaterFormStatusBooked: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_UpdateBerthRequestFuelWaterFormStatusBooked_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UpdateBerthRequestFuelWaterFormStatusBooked",
        params,
        fetchOpts
      );
    },
    UpdateBerthRequestFuelWaterStandAloneForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_UpdateBerthRequestFuelWaterStandAloneForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UpdateBerthRequestFuelWaterStandAloneForm",
        params,
        fetchOpts
      );
    },
    UpdateBerthWorkPermit: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_UpdateBerthWorkPermit_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UpdateBerthWorkPermit",
        params,
        fetchOpts
      );
    },
    UpdateCancelJobTicket: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_UpdateCancelJobTicket_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UpdateCancelJobTicket",
        params,
        fetchOpts
      );
    },
    UpdateGeneralWorksForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_UpdateGeneralWorksForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UpdateGeneralWorksForm",
        params,
        fetchOpts
      );
    },
    UpdateMarineCompletedJobTicket: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_UpdateMarineCompletedJobTicket_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UpdateMarineCompletedJobTicket",
        params,
        fetchOpts
      );
    },
    UpdateMarineInProgressJobTicket: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_UpdateMarineInProgressJobTicket_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UpdateMarineInProgressJobTicket",
        params,
        fetchOpts
      );
    },
    UpdateUnderDeckForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_UpdateUnderDeckForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UpdateUnderDeckForm",
        params,
        fetchOpts
      );
    },
    UpdateWharfageGeneralWorksForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MarineService_UpdateWharfageGeneralWorksForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UpdateWharfageGeneralWorksForm",
        params,
        fetchOpts
      );
    },
    UploadBerthFormDoc: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_UploadBerthFormDoc_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UploadBerthFormDoc",
        params,
        fetchOpts
      );
    },
    UploadMaterialRequisitionDoc: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_MarineService_UploadMaterialRequisitionDoc_params) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UploadMaterialRequisitionDoc",
        params,
        fetchOpts
      );
    },
    UploadWharfageFormDoc: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_UploadWharfageFormDoc_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "UploadWharfageFormDoc",
        params,
        fetchOpts
      );
    },
    calculateDivedNumber: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_calculateDivedNumber_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "calculateDivedNumber",
        params,
        fetchOpts
      );
    },
    fileUpload_MarineJobMHE: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_fileUpload_MarineJobMHE_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "fileUpload_MarineJobMHE",
        params,
        fetchOpts
      );
    },
    firstMarineAPI: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "firstMarineAPI",
        {},
        fetchOpts
      );
    },
    getAgentListByCompany: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MarineService_getAgentListByCompany_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MarineService",
        "getAgentListByCompany",
        params,
        fetchOpts
      );
    }
  },
  pbksb_MasterDataService: {
    StartServiceMHE: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MasterDataService_StartServiceMHE_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MasterDataService",
        "StartServiceMHE",
        params,
        fetchOpts
      );
    },
    UpdateVessel: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MasterDataService_UpdateVessel_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MasterDataService",
        "UpdateVessel",
        params,
        fetchOpts
      );
    },
    checkMHEPendingEndorsedByCustomerID: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_MasterDataService_checkMHEPendingEndorsedByCustomerID_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MasterDataService",
        "checkMHEPendingEndorsedByCustomerID",
        params,
        fetchOpts
      );
    }
  },
  pbksb_MobileService: {
    completeJobMHE: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MobileService_completeJobMHE_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MobileService",
        "completeJobMHE",
        params,
        fetchOpts
      );
    },
    getMobileDashBoard: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MobileService_getMobileDashBoard_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MobileService",
        "getMobileDashBoard",
        params,
        fetchOpts
      );
    },
    getMobileJobMHEDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MobileService_getMobileJobMHEDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MobileService",
        "getMobileJobMHEDetails",
        params,
        fetchOpts
      );
    },
    getMobileJobMHEList: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MobileService_getMobileJobMHEList_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MobileService",
        "getMobileJobMHEList",
        params,
        fetchOpts
      );
    },
    updateJobMHESatatus: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MobileService_updateJobMHESatatus_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MobileService",
        "updateJobMHESatatus",
        params,
        fetchOpts
      );
    },
    updateSessionTiming: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_MobileService_updateSessionTiming_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_MobileService",
        "updateSessionTiming",
        params,
        fetchOpts
      );
    }
  },
  pbksb_PSBService: {
    ApplyNewReturnDate: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_ApplyNewReturnDate_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "ApplyNewReturnDate",
        params,
        fetchOpts
      );
    },
    ApplyTemporaryOutGoodOutForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_PSBService_ApplyTemporaryOutGoodOutForm_params) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "ApplyTemporaryOutGoodOutForm",
        params,
        fetchOpts
      );
    },
    CancelGoodIn: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_CancelGoodIn_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "CancelGoodIn",
        params,
        fetchOpts
      );
    },
    CancelGoodOut: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_CancelGoodOut_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "CancelGoodOut",
        params,
        fetchOpts
      );
    },
    ChangeStatusGoodInForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_ChangeStatusGoodInForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "ChangeStatusGoodInForm",
        params,
        fetchOpts
      );
    },
    ChangeStatusTransferOwnerShipBuyerForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_PSBService_ChangeStatusTransferOwnerShipBuyerForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "ChangeStatusTransferOwnerShipBuyerForm",
        params,
        fetchOpts
      );
    },
    ChangeStatusTransferOwnerShipSellerForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_PSBService_ChangeStatusTransferOwnerShipSellerForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "ChangeStatusTransferOwnerShipSellerForm",
        params,
        fetchOpts
      );
    },
    DeleteGoodInForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_DeleteGoodInForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "DeleteGoodInForm",
        params,
        fetchOpts
      );
    },
    DeleteGoodOutForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_DeleteGoodOutForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "DeleteGoodOutForm",
        params,
        fetchOpts
      );
    },
    ExistReqistrationNoGI: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_ExistReqistrationNoGI_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "ExistReqistrationNoGI",
        params,
        fetchOpts
      );
    },
    ExistReqistrationNoGO: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_ExistReqistrationNoGO_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "ExistReqistrationNoGO",
        params,
        fetchOpts
      );
    },
    GetBuildFromPartsFormDetails: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_PSBService_GetBuildFromPartsFormDetails_params) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetBuildFromPartsFormDetails",
        params,
        fetchOpts
      );
    },
    GetBuildFromPartsList: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetBuildFromPartsList_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetBuildFromPartsList",
        params,
        fetchOpts
      );
    },
    GetBuyer: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetBuyer",
        {},
        fetchOpts
      );
    },
    GetCategory: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetCategory",
        {},
        fetchOpts
      );
    },
    GetCurrentInventoryListByCompany: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_PSBService_GetCurrentInventoryListByCompany_params) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetCurrentInventoryListByCompany",
        params,
        fetchOpts
      );
    },
    GetFormNumber: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetFormNumber",
        {},
        fetchOpts
      );
    },
    GetFormType: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetFormType",
        {},
        fetchOpts
      );
    },
    GetGoodDetailsTransferOwnerShip: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_PSBService_GetGoodDetailsTransferOwnerShip_params) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetGoodDetailsTransferOwnerShip",
        params,
        fetchOpts
      );
    },
    GetGoodInByCompany: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetGoodInByCompany_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetGoodInByCompany",
        params,
        fetchOpts
      );
    },
    GetGoodInListByCustomer: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetGoodInListByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetGoodInListByCustomer",
        params,
        fetchOpts
      );
    },
    GetGoodInListByFormNumber: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetGoodInListByFormNumber_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetGoodInListByFormNumber",
        params,
        fetchOpts
      );
    },
    GetGoodOutDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetGoodOutDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetGoodOutDetails",
        params,
        fetchOpts
      );
    },
    GetGoodOutListByCustomer: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetGoodOutListByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetGoodOutListByCustomer",
        params,
        fetchOpts
      );
    },
    GetGoodType: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetGoodType",
        {},
        fetchOpts
      );
    },
    GetGoodsDetailsByRequestNo: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_PSBService_GetGoodsDetailsByRequestNo_params) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetGoodsDetailsByRequestNo",
        params,
        fetchOpts
      );
    },
    GetGoodsInDetailsByRegistrationNo: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_PSBService_GetGoodsInDetailsByRegistrationNo_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetGoodsInDetailsByRegistrationNo",
        params,
        fetchOpts
      );
    },
    GetGoodsInFormDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetGoodsInFormDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetGoodsInFormDetails",
        params,
        fetchOpts
      );
    },
    GetListBuildFromPartsFormDocument: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_PSBService_GetListBuildFromPartsFormDocument_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetListBuildFromPartsFormDocument",
        params,
        fetchOpts
      );
    },
    GetListBuildPartsIssue: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetListBuildPartsIssue_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetListBuildPartsIssue",
        params,
        fetchOpts
      );
    },
    GetListChangeLogExpectedDate: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_PSBService_GetListChangeLogExpectedDate_params) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetListChangeLogExpectedDate",
        params,
        fetchOpts
      );
    },
    GetListExpectedReturnDate: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetListExpectedReturnDate_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetListExpectedReturnDate",
        params,
        fetchOpts
      );
    },
    GetListGoods: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetListGoods_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetListGoods",
        params,
        fetchOpts
      );
    },
    GetListIssueOutGood: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetListIssueOutGood_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetListIssueOutGood",
        params,
        fetchOpts
      );
    },
    GetListNewLocation: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetListNewLocation_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetListNewLocation",
        params,
        fetchOpts
      );
    },
    GetListNewParts: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetListNewParts_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetListNewParts",
        params,
        fetchOpts
      );
    },
    GetListPreviousLocation: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetListPreviousLocation_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetListPreviousLocation",
        params,
        fetchOpts
      );
    },
    GetListReturnGood: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetListReturnGood_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetListReturnGood",
        params,
        fetchOpts
      );
    },
    GetListTemporaryOutGood: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetListTemporaryOutGood_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetListTemporaryOutGood",
        params,
        fetchOpts
      );
    },
    GetListTransferOwnershipDocument: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_PSBService_GetListTransferOwnershipDocument_params) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetListTransferOwnershipDocument",
        params,
        fetchOpts
      );
    },
    GetLocation: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetLocation",
        {},
        fetchOpts
      );
    },
    GetSiteLocation: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetSiteLocation",
        {},
        fetchOpts
      );
    },
    GetStorage: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetStorage",
        {},
        fetchOpts
      );
    },
    GetTransferLocationFormDetails: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_PSBService_GetTransferLocationFormDetails_params) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetTransferLocationFormDetails",
        params,
        fetchOpts
      );
    },
    GetTransferLocationList: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetTransferLocationList_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetTransferLocationList",
        params,
        fetchOpts
      );
    },
    GetTransferOwnerShipBuyerForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_PSBService_GetTransferOwnerShipBuyerForm_params) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetTransferOwnerShipBuyerForm",
        params,
        fetchOpts
      );
    },
    GetTransferOwnerShipBuyerList: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_PSBService_GetTransferOwnerShipBuyerList_params) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetTransferOwnerShipBuyerList",
        params,
        fetchOpts
      );
    },
    GetTransferOwnerShip_Doc: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GetTransferOwnerShip_Doc_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetTransferOwnerShip_Doc",
        params,
        fetchOpts
      );
    },
    GetTransferOwnershipDetailsByRequestNo: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_PSBService_GetTransferOwnershipDetailsByRequestNo_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetTransferOwnershipDetailsByRequestNo",
        params,
        fetchOpts
      );
    },
    GetTransferOwnershipRequestList: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_PSBService_GetTransferOwnershipRequestList_params) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetTransferOwnershipRequestList",
        params,
        fetchOpts
      );
    },
    GetTypeOfGood: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetTypeOfGood",
        {},
        fetchOpts
      );
    },
    GetlsGoodIn: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GetlsGoodIn",
        {},
        fetchOpts
      );
    },
    Gettransfer_ownershipList: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "Gettransfer_ownershipList",
        {},
        fetchOpts
      );
    },
    GoodListByRegistrationNo: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_GoodListByRegistrationNo_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GoodListByRegistrationNo",
        params,
        fetchOpts
      );
    },
    GoodListByRegistrationNoAndCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_PSBService_GoodListByRegistrationNoAndCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "GoodListByRegistrationNoAndCustomer",
        params,
        fetchOpts
      );
    },
    InventoryChangeHistory: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_InventoryChangeHistory_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "InventoryChangeHistory",
        params,
        fetchOpts
      );
    },
    InventoryChangeHistory2: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_InventoryChangeHistory2_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "InventoryChangeHistory2",
        params,
        fetchOpts
      );
    },
    ListGoodTransferOwnerShip: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_ListGoodTransferOwnerShip_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "ListGoodTransferOwnerShip",
        params,
        fetchOpts
      );
    },
    ListGoodsOutByRegistrationNumber: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_PSBService_ListGoodsOutByRegistrationNumber_params) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "ListGoodsOutByRegistrationNumber",
        params,
        fetchOpts
      );
    },
    PostBuildFromPartsForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_PostBuildFromPartsForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "PostBuildFromPartsForm",
        params,
        fetchOpts
      );
    },
    PostGoodIn: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_PostGoodIn_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "PostGoodIn",
        params,
        fetchOpts
      );
    },
    PostGoodInForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_PostGoodInForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "PostGoodInForm",
        params,
        fetchOpts
      );
    },
    PostGoodInwithListGood: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_PostGoodInwithListGood_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "PostGoodInwithListGood",
        params,
        fetchOpts
      );
    },
    PostGoodOutwithListGood: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_PostGoodOutwithListGood_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "PostGoodOutwithListGood",
        params,
        fetchOpts
      );
    },
    PostGoodReturn: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_PostGoodReturn_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "PostGoodReturn",
        params,
        fetchOpts
      );
    },
    PostInventoryAdjustment: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_PostInventoryAdjustment_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "PostInventoryAdjustment",
        params,
        fetchOpts
      );
    },
    PostLocationBuyerForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_PostLocationBuyerForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "PostLocationBuyerForm",
        params,
        fetchOpts
      );
    },
    PostTransferLocationRequestForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_PSBService_PostTransferLocationRequestForm_params) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "PostTransferLocationRequestForm",
        params,
        fetchOpts
      );
    },
    PostTransferOwnerShipSellerForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_PSBService_PostTransferOwnerShipSellerForm_params) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "PostTransferOwnerShipSellerForm",
        params,
        fetchOpts
      );
    },
    UpdateGoodInForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_UpdateGoodInForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "UpdateGoodInForm",
        params,
        fetchOpts
      );
    },
    UpdateGoodOutForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_UpdateGoodOutForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "UpdateGoodOutForm",
        params,
        fetchOpts
      );
    },
    UpdateReturnGood: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_UpdateReturnGood_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "UpdateReturnGood",
        params,
        fetchOpts
      );
    },
    UploadBuildPartsDoc: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_UploadBuildPartsDoc_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "UploadBuildPartsDoc",
        params,
        fetchOpts
      );
    },
    calculateDivedNumber: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_calculateDivedNumber_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "calculateDivedNumber",
        params,
        fetchOpts
      );
    },
    customerList: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "customerList",
        {},
        fetchOpts
      );
    },
    fileUpload_TransferOwnership: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_PSBService_fileUpload_TransferOwnership_params) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "fileUpload_TransferOwnership",
        params,
        fetchOpts
      );
    },
    getPSBRequestFrom: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_getPSBRequestFrom_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "getPSBRequestFrom",
        params,
        fetchOpts
      );
    },
    listAgent: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "listAgent",
        {},
        fetchOpts
      );
    },
    registrationNoList: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "registrationNoList",
        {},
        fetchOpts
      );
    },
    registrationNoListByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (params: pbksb_PSBService_registrationNoListByCustomer_params) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "registrationNoListByCustomer",
        params,
        fetchOpts
      );
    },
    showCountRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "showCountRequest",
        {},
        fetchOpts
      );
    },
    submitPSBFormSubmit: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_submitPSBFormSubmit_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "submitPSBFormSubmit",
        params,
        fetchOpts
      );
    },
    uploadFile_Test: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PSBService_uploadFile_Test_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PSBService",
        "uploadFile_Test",
        params,
        fetchOpts
      );
    }
  },
  pbksb_PasswordManagerNewService: {
    getHashedPsswrd: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_PasswordManagerNewService_getHashedPsswrd_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PasswordManagerNewService",
        "getHashedPsswrd",
        params,
        fetchOpts
      );
    },
    updatePsswrdwithUserSession: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_PasswordManagerNewService_updatePsswrdwithUserSession_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PasswordManagerNewService",
        "updatePsswrdwithUserSession",
        params,
        fetchOpts
      );
    }
  },
  pbksb_PsbService: {
    getPsbReportListByCustomerAndDate: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_PsbService_getPsbReportListByCustomerAndDate_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_PsbService",
        "getPsbReportListByCustomerAndDate",
        params,
        fetchOpts
      );
    }
  },
  pbksb_RequestCFSService: {
    cancelCFSRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_RequestCFSService_cancelCFSRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_RequestCFSService",
        "cancelCFSRequest",
        params,
        fetchOpts
      );
    },
    chargeCustomer: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_RequestCFSService_chargeCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_RequestCFSService",
        "chargeCustomer",
        params,
        fetchOpts
      );
    },
    createCFSRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_RequestCFSService_createCFSRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_RequestCFSService",
        "createCFSRequest",
        params,
        fetchOpts
      );
    },
    createContainerCFS: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_RequestCFSService_createContainerCFS_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_RequestCFSService",
        "createContainerCFS",
        params,
        fetchOpts
      );
    },
    editCFSRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_RequestCFSService_editCFSRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_RequestCFSService",
        "editCFSRequest",
        params,
        fetchOpts
      );
    },
    endorseCFSRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_RequestCFSService_endorseCFSRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_RequestCFSService",
        "endorseCFSRequest",
        params,
        fetchOpts
      );
    },
    getAllContainers: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_RequestCFSService",
        "getAllContainers",
        {},
        fetchOpts
      );
    },
    getContainersByCustomer: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_RequestCFSService_getContainersByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_RequestCFSService",
        "getContainersByCustomer",
        params,
        fetchOpts
      );
    },
    getContainersByRequestType: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_RequestCFSService_getContainersByRequestType_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_RequestCFSService",
        "getContainersByRequestType",
        params,
        fetchOpts
      );
    },
    getEndorsedAndCompletedRequestsByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_RequestCFSService_getEndorsedAndCompletedRequestsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_RequestCFSService",
        "getEndorsedAndCompletedRequestsByCustomer",
        params,
        fetchOpts
      );
    },
    getEndorsedRequestsByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_RequestCFSService_getEndorsedRequestsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_RequestCFSService",
        "getEndorsedRequestsByCustomer",
        params,
        fetchOpts
      );
    },
    getRequestByTicketNumber: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_RequestCFSService_getRequestByTicketNumber_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_RequestCFSService",
        "getRequestByTicketNumber",
        params,
        fetchOpts
      );
    },
    getRequestsByCustomer: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_RequestCFSService_getRequestsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_RequestCFSService",
        "getRequestsByCustomer",
        params,
        fetchOpts
      );
    }
  },
  pbksb_ScheduledWasteService: {
    cancelInboundRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_cancelInboundRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "cancelInboundRequest",
        params,
        fetchOpts
      );
    },
    cancelOutboundRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_cancelOutboundRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "cancelOutboundRequest",
        params,
        fetchOpts
      );
    },
    cancelWasteDetailJob: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_cancelWasteDetailJob_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "cancelWasteDetailJob",
        params,
        fetchOpts
      );
    },
    cancelWasteDetailsJob: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_cancelWasteDetailsJob_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "cancelWasteDetailsJob",
        params,
        fetchOpts
      );
    },
    createInboundScheduledWasteForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ScheduledWasteService_createInboundScheduledWasteForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "createInboundScheduledWasteForm",
        params,
        fetchOpts
      );
    },
    createOutboundScheduledWasteForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ScheduledWasteService_createOutboundScheduledWasteForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "createOutboundScheduledWasteForm",
        params,
        fetchOpts
      );
    },
    createTwgForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_createTwgForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "createTwgForm",
        params,
        fetchOpts
      );
    },
    downloadTwgApprovedFile: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_downloadTwgApprovedFile_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "downloadTwgApprovedFile",
        params,
        fetchOpts
      );
    },
    downloadTwgUploadedFile: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_downloadTwgUploadedFile_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "downloadTwgUploadedFile",
        params,
        fetchOpts
      );
    },
    editTwgForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_editTwgForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "editTwgForm",
        params,
        fetchOpts
      );
    },
    endorseAddServiceReport: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_endorseAddServiceReport_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "endorseAddServiceReport",
        params,
        fetchOpts
      );
    },
    endorseInboundSoReport: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_endorseInboundSoReport_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "endorseInboundSoReport",
        params,
        fetchOpts
      );
    },
    endorseOutboundSoReport: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_endorseOutboundSoReport_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "endorseOutboundSoReport",
        params,
        fetchOpts
      );
    },
    getAddServiceReportList: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_getAddServiceReportList_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getAddServiceReportList",
        params,
        fetchOpts
      );
    },
    getAddServiceReportView: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_getAddServiceReportView_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getAddServiceReportView",
        params,
        fetchOpts
      );
    },
    getAllWasteCodeList: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getAllWasteCodeList",
        {},
        fetchOpts
      );
    },
    getInboundRequestByRequestNumber: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ScheduledWasteService_getInboundRequestByRequestNumber_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getInboundRequestByRequestNumber",
        params,
        fetchOpts
      );
    },
    getInboundRequestsListByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ScheduledWasteService_getInboundRequestsListByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getInboundRequestsListByCustomer",
        params,
        fetchOpts
      );
    },
    getInboundSOReportList: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_getInboundSOReportList_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getInboundSOReportList",
        params,
        fetchOpts
      );
    },
    getInboundSOReportView: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_getInboundSOReportView_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getInboundSOReportView",
        params,
        fetchOpts
      );
    },
    getInventoryList: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_getInventoryList_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getInventoryList",
        params,
        fetchOpts
      );
    },
    getOutboundRequestByRequestNumber: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ScheduledWasteService_getOutboundRequestByRequestNumber_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getOutboundRequestByRequestNumber",
        params,
        fetchOpts
      );
    },
    getOutboundRequestsListByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ScheduledWasteService_getOutboundRequestsListByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getOutboundRequestsListByCustomer",
        params,
        fetchOpts
      );
    },
    getOutboundSOReportList: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_getOutboundSOReportList_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getOutboundSOReportList",
        params,
        fetchOpts
      );
    },
    getOutboundSOReportView: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_getOutboundSOReportView_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getOutboundSOReportView",
        params,
        fetchOpts
      );
    },
    getOutboundWasteDetails: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_getOutboundWasteDetails_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getOutboundWasteDetails",
        params,
        fetchOpts
      );
    },
    getOutboundWasteDetailsByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ScheduledWasteService_getOutboundWasteDetailsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getOutboundWasteDetailsByCustomer",
        params,
        fetchOpts
      );
    },
    getScheduledWasteRepackaging: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getScheduledWasteRepackaging",
        {},
        fetchOpts
      );
    },
    getScheduledWasteUom: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getScheduledWasteUom",
        {},
        fetchOpts
      );
    },
    getSummaryList: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_getSummaryList_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getSummaryList",
        params,
        fetchOpts
      );
    },
    getTwgRequestsByFormNo: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_getTwgRequestsByFormNo_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getTwgRequestsByFormNo",
        params,
        fetchOpts
      );
    },
    getTwgRequestsListByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_ScheduledWasteService_getTwgRequestsListByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getTwgRequestsListByCustomer",
        params,
        fetchOpts
      );
    },
    getWasteCodeList: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_getWasteCodeList_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "getWasteCodeList",
        params,
        fetchOpts
      );
    },
    submitTwgForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_ScheduledWasteService_submitTwgForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_ScheduledWasteService",
        "submitTwgForm",
        params,
        fetchOpts
      );
    }
  },
  pbksb_SendEmailService: {
    ExceedDueDateReturnGood: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "pbksb_SendEmailService",
        "ExceedDueDateReturnGood",
        {},
        fetchOpts
      );
    },
    SubmitGoodInForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_SendEmailService_SubmitGoodInForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_SendEmailService",
        "SubmitGoodInForm",
        params,
        fetchOpts
      );
    },
    firstAPI: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "pbksb_SendEmailService",
        "firstAPI",
        {},
        fetchOpts
      );
    },
    sendCancellationEmail: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_SendEmailService_sendCancellationEmail_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_SendEmailService",
        "sendCancellationEmail",
        params,
        fetchOpts
      );
    },
    sendCancellationEmailWithCaption: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_SendEmailService_sendCancellationEmailWithCaption_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_SendEmailService",
        "sendCancellationEmailWithCaption",
        params,
        fetchOpts
      );
    },
    sendPendingEndorsementEmail: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_SendEmailService_sendPendingEndorsementEmail_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_SendEmailService",
        "sendPendingEndorsementEmail",
        params,
        fetchOpts
      );
    }
  },
  pbksb_UserILMSService: {
    getCustomerUserTypeForCurrentUser: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "pbksb_UserILMSService",
        "getCustomerUserTypeForCurrentUser",
        {},
        fetchOpts
      );
    },
    getRolesForCurrentUser: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "pbksb_UserILMSService",
        "getRolesForCurrentUser",
        {},
        fetchOpts
      );
    }
  },
  pbksb_WasteDisposalService: {
    cancelRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_WasteDisposalService_cancelRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_WasteDisposalService",
        "cancelRequest",
        params,
        fetchOpts
      );
    },
    createWasteDisposalForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_WasteDisposalService_createWasteDisposalForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_WasteDisposalService",
        "createWasteDisposalForm",
        params,
        fetchOpts
      );
    },
    editWasteDisposalForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_WasteDisposalService_editWasteDisposalForm_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_WasteDisposalService",
        "editWasteDisposalForm",
        params,
        fetchOpts
      );
    },
    endorseRequest: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_WasteDisposalService_endorseRequest_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_WasteDisposalService",
        "endorseRequest",
        params,
        fetchOpts
      );
    },
    getEndorsedRequestByCustomer: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: pbksb_WasteDisposalService_getEndorsedRequestByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_WasteDisposalService",
        "getEndorsedRequestByCustomer",
        params,
        fetchOpts
      );
    },
    getRequestByRequestNumber: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_WasteDisposalService_getRequestByRequestNumber_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_WasteDisposalService",
        "getRequestByRequestNumber",
        params,
        fetchOpts
      );
    },
    getRequestsByCustomer: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: pbksb_WasteDisposalService_getRequestsByCustomer_params
    ) => {
      return cubaApp.invokeService(
        "pbksb_WasteDisposalService",
        "getRequestsByCustomer",
        params,
        fetchOpts
      );
    }
  }
};
