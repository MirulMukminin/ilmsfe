import {
  CubaApp,
  FetchOptions,
  SerializedEntity,
  EntitiesWithCount
} from "@cuba-platform/rest";

import { Agent } from "./entities/pbksb_Agent";

import { CustomerUser } from "./entities/pbksb_CustomerUser";

import { Job_MHE } from "./entities/pbksb_Job_MHE";

import { Job_PSB } from "./entities/pbksb_Job_PSB";

import { Transfer_Ownership } from "./entities/pbksb_Transfer_ownership";

import { Requestform } from "./entities/pbksb_Requestform";

import { Vessel } from "./entities/pbksb_Vessel";

export type queries_Agent_GetAgentInfo_params = {
  agent_ID: string;
};

export type queries_CustomerUser_GetUserInfo_params = {
  fullname: string;
};

export type queries_Job_MHE_GetMHEJobDetailsByJobTicket_params = {
  jobticket: string;
};

export type queries_Job_MHE_GetMHEJobTicketByCustomerCode_params = {
  customercode: string;
};

export type queries_Job_PSB_PSB_ListRequestForm_params = {
  agent_ID: string;
};

export type queries_Requestform_MHE_ListRequestForm_params = {
  code: string;
};

export type queries_Vessel_UpdateVessel_params = {
  name: string;
};

export var restQueries = {
  Agent: {
    GetAgentInfo: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: queries_Agent_GetAgentInfo_params
    ): Promise<SerializedEntity<Agent>[]> => {
      return cubaApp.query<Agent>(
        "pbksb_Agent",
        "GetAgentInfo",
        params,
        fetchOpts
      );
    },
    GetAgentInfoCount: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: queries_Agent_GetAgentInfo_params
    ): Promise<Number> => {
      return cubaApp.queryCount(
        "pbksb_Agent",
        "GetAgentInfo",
        params,
        fetchOpts
      );
    },
    GetAgentInfoWithCount: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: queries_Agent_GetAgentInfo_params
    ): Promise<EntitiesWithCount<Agent>> => {
      return cubaApp.queryWithCount<Agent>(
        "pbksb_Agent",
        "GetAgentInfo",
        params,
        fetchOpts
      );
    }
  },
  CustomerUser: {
    GetUserInfo: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: queries_CustomerUser_GetUserInfo_params
    ): Promise<SerializedEntity<CustomerUser>[]> => {
      return cubaApp.query<CustomerUser>(
        "pbksb_CustomerUser",
        "GetUserInfo",
        params,
        fetchOpts
      );
    },
    GetUserInfoCount: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: queries_CustomerUser_GetUserInfo_params
    ): Promise<Number> => {
      return cubaApp.queryCount(
        "pbksb_CustomerUser",
        "GetUserInfo",
        params,
        fetchOpts
      );
    },
    GetUserInfoWithCount: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: queries_CustomerUser_GetUserInfo_params
    ): Promise<EntitiesWithCount<CustomerUser>> => {
      return cubaApp.queryWithCount<CustomerUser>(
        "pbksb_CustomerUser",
        "GetUserInfo",
        params,
        fetchOpts
      );
    }
  },
  Job_MHE: {
    GetMHEJobDetailsByJobTicket: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: queries_Job_MHE_GetMHEJobDetailsByJobTicket_params
    ): Promise<SerializedEntity<Job_MHE>[]> => {
      return cubaApp.query<Job_MHE>(
        "pbksb_Job_MHE",
        "GetMHEJobDetailsByJobTicket",
        params,
        fetchOpts
      );
    },
    GetMHEJobDetailsByJobTicketCount: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: queries_Job_MHE_GetMHEJobDetailsByJobTicket_params
    ): Promise<Number> => {
      return cubaApp.queryCount(
        "pbksb_Job_MHE",
        "GetMHEJobDetailsByJobTicket",
        params,
        fetchOpts
      );
    },
    GetMHEJobDetailsByJobTicketWithCount: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: queries_Job_MHE_GetMHEJobDetailsByJobTicket_params
    ): Promise<EntitiesWithCount<Job_MHE>> => {
      return cubaApp.queryWithCount<Job_MHE>(
        "pbksb_Job_MHE",
        "GetMHEJobDetailsByJobTicket",
        params,
        fetchOpts
      );
    },
    GetMHEJobTicket: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (): Promise<SerializedEntity<Job_MHE>[]> => {
      return cubaApp.query<Job_MHE>(
        "pbksb_Job_MHE",
        "GetMHEJobTicket",
        {},
        fetchOpts
      );
    },
    GetMHEJobTicketCount: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (): Promise<Number> => {
      return cubaApp.queryCount(
        "pbksb_Job_MHE",
        "GetMHEJobTicket",
        {},
        fetchOpts
      );
    },
    GetMHEJobTicketWithCount: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (): Promise<EntitiesWithCount<Job_MHE>> => {
      return cubaApp.queryWithCount<Job_MHE>(
        "pbksb_Job_MHE",
        "GetMHEJobTicket",
        {},
        fetchOpts
      );
    },
    GetMHEJobTicketByCustomerCode: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: queries_Job_MHE_GetMHEJobTicketByCustomerCode_params
    ): Promise<SerializedEntity<Job_MHE>[]> => {
      return cubaApp.query<Job_MHE>(
        "pbksb_Job_MHE",
        "GetMHEJobTicketByCustomerCode",
        params,
        fetchOpts
      );
    },
    GetMHEJobTicketByCustomerCodeCount: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: queries_Job_MHE_GetMHEJobTicketByCustomerCode_params
    ): Promise<Number> => {
      return cubaApp.queryCount(
        "pbksb_Job_MHE",
        "GetMHEJobTicketByCustomerCode",
        params,
        fetchOpts
      );
    },
    GetMHEJobTicketByCustomerCodeWithCount: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: queries_Job_MHE_GetMHEJobTicketByCustomerCode_params
    ): Promise<EntitiesWithCount<Job_MHE>> => {
      return cubaApp.queryWithCount<Job_MHE>(
        "pbksb_Job_MHE",
        "GetMHEJobTicketByCustomerCode",
        params,
        fetchOpts
      );
    }
  },
  Job_PSB: {
    PSB_ListRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: queries_Job_PSB_PSB_ListRequestForm_params
    ): Promise<SerializedEntity<Job_PSB>[]> => {
      return cubaApp.query<Job_PSB>(
        "pbksb_Job_PSB",
        "PSB_ListRequestForm",
        params,
        fetchOpts
      );
    },
    PSB_ListRequestFormCount: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: queries_Job_PSB_PSB_ListRequestForm_params
    ): Promise<Number> => {
      return cubaApp.queryCount(
        "pbksb_Job_PSB",
        "PSB_ListRequestForm",
        params,
        fetchOpts
      );
    },
    PSB_ListRequestFormWithCount: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: queries_Job_PSB_PSB_ListRequestForm_params
    ): Promise<EntitiesWithCount<Job_PSB>> => {
      return cubaApp.queryWithCount<Job_PSB>(
        "pbksb_Job_PSB",
        "PSB_ListRequestForm",
        params,
        fetchOpts
      );
    }
  },
  Transfer_Ownership: {
    GetTransferOwnershipSellerForm: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (): Promise<SerializedEntity<Transfer_Ownership>[]> => {
      return cubaApp.query<Transfer_Ownership>(
        "pbksb_Transfer_ownership",
        "GetTransferOwnershipSellerForm",
        {},
        fetchOpts
      );
    },
    GetTransferOwnershipSellerFormCount: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (): Promise<Number> => {
      return cubaApp.queryCount(
        "pbksb_Transfer_ownership",
        "GetTransferOwnershipSellerForm",
        {},
        fetchOpts
      );
    },
    GetTransferOwnershipSellerFormWithCount: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (): Promise<EntitiesWithCount<Transfer_Ownership>> => {
      return cubaApp.queryWithCount<Transfer_Ownership>(
        "pbksb_Transfer_ownership",
        "GetTransferOwnershipSellerForm",
        {},
        fetchOpts
      );
    }
  },
  Requestform: {
    MHE_ListRequestForm: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: queries_Requestform_MHE_ListRequestForm_params
    ): Promise<SerializedEntity<Requestform>[]> => {
      return cubaApp.query<Requestform>(
        "pbksb_Requestform",
        "MHE_ListRequestForm",
        params,
        fetchOpts
      );
    },
    MHE_ListRequestFormCount: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: queries_Requestform_MHE_ListRequestForm_params
    ): Promise<Number> => {
      return cubaApp.queryCount(
        "pbksb_Requestform",
        "MHE_ListRequestForm",
        params,
        fetchOpts
      );
    },
    MHE_ListRequestFormWithCount: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: queries_Requestform_MHE_ListRequestForm_params
    ): Promise<EntitiesWithCount<Requestform>> => {
      return cubaApp.queryWithCount<Requestform>(
        "pbksb_Requestform",
        "MHE_ListRequestForm",
        params,
        fetchOpts
      );
    }
  },
  Vessel: {
    UpdateVessel: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: queries_Vessel_UpdateVessel_params
    ): Promise<SerializedEntity<Vessel>[]> => {
      return cubaApp.query<Vessel>(
        "pbksb_Vessel",
        "UpdateVessel",
        params,
        fetchOpts
      );
    },
    UpdateVesselCount: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: queries_Vessel_UpdateVessel_params
    ): Promise<Number> => {
      return cubaApp.queryCount(
        "pbksb_Vessel",
        "UpdateVessel",
        params,
        fetchOpts
      );
    },
    UpdateVesselWithCount: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: queries_Vessel_UpdateVessel_params
    ): Promise<EntitiesWithCount<Vessel>> => {
      return cubaApp.queryWithCount<Vessel>(
        "pbksb_Vessel",
        "UpdateVessel",
        params,
        fetchOpts
      );
    }
  }
};
