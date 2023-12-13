import { BaseStringIdEntity } from "./sys$BaseStringIdEntity";
export class HistoricActivityInstanceData extends BaseStringIdEntity {
  static NAME = "bproc_HistoricActivityInstanceData";
  id?: string;
  activityId?: string | null;
  activityName?: string | null;
  activityType?: string | null;
  processDefinitionId?: string | null;
  processInstanceId?: string | null;
  executionId?: string | null;
  taskId?: string | null;
  calledProcessInstanceId?: string | null;
  assignee?: string | null;
  startTime?: any | null;
  endTime?: any | null;
  durationInMillis?: any | null;
  deleteReason?: string | null;
  tenantId?: string | null;
}
export type HistoricActivityInstanceDataViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type HistoricActivityInstanceDataView<
  V extends HistoricActivityInstanceDataViewName
> = never;
