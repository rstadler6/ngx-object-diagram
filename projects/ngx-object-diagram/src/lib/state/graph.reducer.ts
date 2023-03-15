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
  immerOn(GraphActions.setCurrentGraphId, (state, { graphId }): GraphState =>{
    return {
      ...state,
      currentGraphId: graphId
    }
  }),
  immerOn(GraphActions.setEntities, (state, { objs, graphId }): GraphState => {
    return {
      ...state,
      /*graphs: Object.assign([], state.graphs, { [graphId]: objs.map(obj => {
          return { guid: obj['guid'], values: obj, collapsed: false }
        })
      }),*/
      graphs: {...state.graphs, [graphId]: objs.map(obj => {
        return { guid: obj['guid'] as string, values: obj, collapsed: false }
      })}
    }
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
