import { createAction, props } from "@ngrx/store";
import { Entity } from "../model/entity";
import { Graph } from "./graph.reducer";
import { Update } from "@ngrx/entity";

export const setCurrentGraphId = createAction(
  "[Graph] Set Current Graph Id",
  props<{ graphId: string }>()
)

export const addEntity = createAction(
  "[Graph] Add Entity",
  props<{ entity: Entity }>()
)

export const addEntities = createAction(
  "[Graph] Add Entities",
  props<{ objs: Record<string, unknown>[], graphId: string }>()
)

export const addGraph = createAction(
  "[Graph] Add Graph",
  props<{ graph: Graph }>()
)

export const updateEntity = createAction(
  "[Graph] Update Entity",
  props<{ update: Update<Entity> }>()
)
