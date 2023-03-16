import { createReducer, on } from "@ngrx/store";
import * as GraphActions from "./graph.actions"
import { Entity } from "../model/entity";
import { immerOn } from "ngrx-immer/store";
import { navigated } from "./router.actions";
import { GraphEntityState } from "./entity.reducer";

export interface GraphState {
  currentGraphId: string,
  entities: GraphEntityState;
}

const initialState: GraphState = {
  currentGraphId: "",
  entities: {}
}

export const graphReducer = createReducer<GraphState>(
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
