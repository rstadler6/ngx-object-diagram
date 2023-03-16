import { Entity } from "../model/entity";
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on, State } from "@ngrx/store";
import * as EntityActions from "./entity.actions"

export type GraphEntityState = EntityState<Entity>;

export const adapter = createEntityAdapter<Entity>();

export const initialEntityState: GraphEntityState = adapter.getInitialState({});

export const entityReducer = createReducer(
  initialEntityState,
  on(EntityActions.setEntities, (state, { objs }) => {
    const entities = objs.map(obj => {
      return { guid: obj['guid'] as string, values: obj, collapsed: false }
    });
    return adapter.setAll(entities, state)
  }),
  on(EntityActions.updateEntity, (state, { update }) => {
    return adapter.updateOne(update, state)
  })
);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectEntityIds = selectIds;

export const selectEntityEntities = selectEntities;

export const selectAllEntities = selectAll;

export const selectEntityCount = selectTotal;
