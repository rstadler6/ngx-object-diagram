import { createReducer, on } from "@ngrx/store";
import * as GraphActions from "./graph.actions"
import { Entity } from "../model/entity";
import { immerOn } from "ngrx-immer/store";
import { navigated } from "./router.actions";
import { createEntityAdapter, EntityState } from "@ngrx/entity";

export interface Graph {
  id: string;
}

export interface State {
  currentGraphId: string;
  graphs: EntityState<Graph>;
  entities: EntityState<Entity>;
}

export const graphAdapter = createEntityAdapter<Graph>();
export const entityAdapter = createEntityAdapter<Entity>({
  selectId: entity => entity.guid
});

const initialState: State = {
  currentGraphId: "",
  graphs: graphAdapter.getInitialState(),
  entities: entityAdapter.getInitialState()
}

export const graphReducer = createReducer(
  initialState,
  on(GraphActions.setCurrentGraphId, (state, { graphId }): State => {
    return {
      ...state,
      currentGraphId: graphId
    }
  }),
  on(GraphActions.addGraph, (state, { graph }): State => {
    //console.log(JSON.stringify(graph));
    //console.log(JSON.stringify(state));
    return {
      ...state,
      graphs: graphAdapter.addOne(graph, state.graphs)
    }
  }),
  on(GraphActions.addEntities, (state, { objs, graphId }): State => {
    console.log(JSON.stringify(state));
    return {
      ...state,
      entities: entityAdapter.addMany(objs.map(obj => { return { guid: obj['guid'] as string, values: obj, collapsed: false, graphId: graphId } }), state.entities)
    }
  }),
  on(GraphActions.addEntity, (state, { entity }): State => {
    return {
      ...state,
      entities: entityAdapter.addOne(entity, state.entities)
    }
  }),
  on(GraphActions.updateEntity, (state, { update }): State => {
    return {
      ...state,
      entities: entityAdapter.updateOne(update, state.entities)
    }
  })
)
