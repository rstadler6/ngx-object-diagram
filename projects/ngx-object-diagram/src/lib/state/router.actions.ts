import { createAction, props } from "@ngrx/store";
import { ROUTER_NAVIGATED } from "@ngrx/router-store";
import { RouterState } from "@angular/router";

export const navigated = createAction(
  ROUTER_NAVIGATED,
  props<{ routerState: RouterState, event: Event }>()
)
