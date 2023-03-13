import { createAction, props } from "@ngrx/store";
import { Entity } from "../model/entity";

export const setEntities = createAction(
  "[Graph] Set Entities",
  props<{ entities: Entity[] }>
)

export const collapseEntity = createAction(
  "[Graph] Collapse Entity"
)
