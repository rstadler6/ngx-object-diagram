import { entityAdapter } from "./graph.reducer";

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = entityAdapter.getSelectors();

export const selectEntityIds = selectIds;

export const selectEntityEntities = selectEntities;

export const selectAllEntities = selectAll;

export const selectEntityCount = selectTotal;
