import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as GraphActions from "./graph.actions"
import { Entity } from "../model/entity";

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
  on(GraphActions.setEntities, (state, { objs, graphId }): GraphState => {
    return {
      ...state,
      /*graphs: Object.assign([], state.graphs, { [graphId]: objs.map(obj => {
          return { guid: obj['guid'], values: obj, collapsed: false }
        })
      }),*/
      graphs: {...state.graphs, [graphId]: objs.map(obj => {
        return { guid: obj['guid'] as string, values: obj, collapsed: false }
      })}
        /*state.graphs.map(graph => {
        if (graph.key == graphId) {
          graph.value.objs = objs.map(obj => {
            return { guid: obj['guid'], values: obj, collapsed: false }
          });
        }
        reurn graph;*/

        /*state.graphs.map(graph => {
          if (graph.key == graphId) {
            graph.value.objs = objs.map(obj => {
              return { guid: obj['guid'], values: obj, collapsed: false }
            });
          }
          return graph;
        })
        }*/
    }
  }),
  /*on(GraphActions.collapseEntity, (state, { entity, graphId }): GraphState => {
    return {
      ...state,
      entities: state.entities.map(e => {
        if (e.guid == entity.guid)
          e.collapsed = !e.collapsed;
        return e;
      })
    };
  })*/
)

export const selectGraphFeatureState = createFeatureSelector<GraphState>('graph');

export const selectCurrentGraphId = createSelector(
  selectGraphFeatureState,
  state => state.currentGraphId
);

export const selectEntities = createSelector(
  selectGraphFeatureState,
  selectCurrentGraphId,
  (state, graphId) => state.graphs[graphId]
);
