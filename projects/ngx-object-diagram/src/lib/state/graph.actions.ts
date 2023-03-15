import { createAction, props } from "@ngrx/store";
import { Entity } from "../model/entity";

export const setCurrentGraphId = createAction(
  "[Graph] Set Current Graph Id",
  props<{ graphId: string }>()
)

export const setEntities = createAction(
  "[Graph] Set Entities",
  props<{ objs: Record<string, unknown>[], graphId: string }>()
)

export const collapseEntity = createAction(
  "[Graph] Collapse Entity",
  props<{ entity: Entity }>()
)

export const addAssoc = createAction(
  "[Graph] Add Assoc",
  props<{ entity: Entity, assoc: string }>()
)

export const reloadValues = createAction(
  "[Graph] Reload Values",
  props<{ entity: Entity }>()
)
