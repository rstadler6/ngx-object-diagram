import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GraphState } from "./graph.reducer";
import { selectRouteParams } from "./router.selectors";

export const selectGraphFeatureState = createFeatureSelector<GraphState>((() => {
  return 'graph';
})());

export const selectCurrentGraphId = createSelector(
  selectGraphFeatureState,
  state => state.currentGraphId
);

/*export const selectCurrentGraphId = createSelector(
  selectRouteParams,
  ({ graphId }) => graphId
)*/

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
