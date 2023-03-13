import { Entity } from "../model/entity"
import { GraphState } from "./graph.reducer";

export interface AppState {
  graphState: GraphState;
}

export const selectGraph = (state: AppState) => state.graphState;
