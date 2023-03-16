import { createReducer, on } from "@ngrx/store";
import * as GraphActions from "./graph.actions"
import { Entity } from "../model/entity";
import { immerOn } from "ngrx-immer/store";
import { navigated } from "./router.actions";
import { GraphEntityState } from "./entity.reducer";
import { createEntityAdapter, EntityState } from "@ngrx/entity";

export interface Graph {
  id: string;
  entityIds: string[];
}

export interface State {
  currentGraphId: string;
  graphs: EntityState<Graph>;
  entities: EntityState<Entity>;
}

export const graphAdapter = createEntityAdapter<Graph>();
export const entityAdapter = createEntityAdapter<Entity>();

const initialState: State = {
  currentGraphId: "",
  graphs: graphAdapter.getInitialState(),
  entities: entityAdapter.getInitialState()
}

export const graphReducer = createReducer<State>(
  initialState,

  /*on(GraphActions.setCurrentGraphId, (state, { graphId }): GraphState =>{
    return {
      ...state,
      currentGraphId: graphId
    }
  }),
  on(GraphActions.setEntities, (state, { objs, graphId }): GraphState => {
    console.log("setEntities graphId: " + graphId);
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
  })*/
)
