import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as GraphActions from "./graph.actions"
import { Entity } from "../model/entity";

export interface GraphState {
  entities: Entity[];
}

const initialState: GraphState = {
  entities: []
}

export const graphReducer = createReducer<GraphState>(
  initialState,
  on(GraphActions.setEntities, (state, { _p }): GraphState => {
    return {
      ...state,
      entities: _p.entities
    }
  }),
  /*on(GraphActions.collapseEntity, (state): GraphState => {
    return {
      ...state,
      test: !state.test
    };
  })*/
)

export const getGraphFeatureState = createFeatureSelector<GraphState>('graph');

export const getEntities = createSelector(
  getGraphFeatureState,
  state => state.entities
);
