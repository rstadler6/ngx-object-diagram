import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as GraphActions from "./graph.actions"
import { Entity } from "../model/entity";
import { immerOn } from "ngrx-immer/store";

export interface GraphState {
  currentGraphId: string,
  graphs: Record<string, Entity[]>;
}

const initialState: GraphState = {
  currentGraphId: "",
  graphs: {}
}

export const graphReducer = createReducer<GraphState>(
  initialState,
  on(GraphActions.setCurrentGraphId, (state, { graphId }): GraphState =>{
    return {
      ...state,
      currentGraphId: graphId
    }
  }),
  on(GraphActions.setEntities, (state, { objs, graphId }): GraphState => {
    return {
      ...state,
      graphs: {...state.graphs, [graphId]: objs.map(obj => {
        return { guid: obj['guid'] as string, values: obj, collapsed: false }
      })}
    }
  }),
  immerOn(GraphActions.collapseEntity, (state, { entity }) => {
    //entity.collapsed = true;
    // TODO: make better
    // graphId instead of state.currentGraphId?
    // TODO: fix
    state.graphs[state.currentGraphId]!.find(e => e.guid == entity.guid)!.collapsed = !entity.collapsed;
  })
)

export const selectGraphFeatureState = createFeatureSelector<GraphState>((() => {
  console.log("k")
  return 'graph';
})());

export const selectCurrentGraphId = createSelector(
  selectGraphFeatureState,
  state => state.currentGraphId
);

export const selectEntities = createSelector(
  selectGraphFeatureState,
  selectCurrentGraphId,
  (state, graphId) => {
    return state?.graphs?.[graphId];
  }
);

export const selectEntity = (entityGuid: string) =>
  createSelector(selectEntities,
    entities => entities?.find(e => e.guid == entityGuid)
);

export const selectCollapsed = (entityGuid: string) =>
  createSelector(selectEntity(entityGuid),
    entity => entity?.collapsed
);
