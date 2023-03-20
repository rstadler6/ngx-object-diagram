import { createFeatureSelector, createSelector } from "@ngrx/store";
import { entityAdapter, graphAdapter, State } from "./graph.reducer";
import { selectRouteParams } from "./router.selectors";
import { selectAllEntities } from "./entity.selectors";

export const selectGraphFeatureState = createFeatureSelector<State>((() => {
  return 'graph';
})());

/*export const selectCurrentGraphId = createSelector(
  selectRouteParams,
  ({ graphId }) => {
    console.log("graphId: " + graphId);
    return graphId;
  }
)*/

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = graphAdapter.getSelectors();

export const selectGraphIds = selectIds;

export const selectGraphEntities = selectEntities;

export const selectAllGraphs = selectAll;

export const selectGraphCount = selectTotal;

export const selectCurrentGraphId = createSelector(
  selectGraphFeatureState,
  (state) => {
    return state.currentGraphId;
  }
)

export const selectCurrentEntities = createSelector(
  selectGraphFeatureState,
  selectCurrentGraphId,
  (state, graphId) => {
    return entityAdapter.getSelectors().selectAll(state.entities).filter(e => e.graphId == graphId);
  }
)
