export class AbstractNonPersistentEntity {
  static NAME = "dashboard$AbstractNonPersistentEntity";
  id?: string;
}
export type AbstractNonPersistentEntityViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type AbstractNonPersistentEntityView<
  V extends AbstractNonPersistentEntityViewName
> = never;
