import { createAction, props } from "@ngrx/store";
import { Entity } from "../model/entity";
import { Update } from "@ngrx/entity";

export const setEntities = createAction('[Entity] Set Entities', props<{ objs: Record<string, unknown>[] }>());
export const updateEntity = createAction('[Entity] Update Entity', props<{ update: Update<Entity> }>());
