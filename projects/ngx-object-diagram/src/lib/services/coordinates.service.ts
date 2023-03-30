import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { NgxObjectDiagramAssocCoords } from "../model/ngx-object-diagram-assoc-coords";
import { NgxObjectDiagramAssoc } from "../model/ngx-object-diagram-assoc";

@Injectable({ providedIn: 'root'})
export class CoordinatesService {

  private readonly _coordinates = new BehaviorSubject<NgxObjectDiagramAssocCoords[]>([]);
  public readonly coordinates$ = this._coordinates.asObservable();

  public upsertCoordinate(line: NgxObjectDiagramAssoc, xA: number, yA: number, xB: number, yB: number ): void {

    this._coordinates.next([...this._coordinates.getValue(), {
      assocLine: line,
      a: {
        x: xA,
        y: yA - 20
      },
      b: {
        x: xB,
        y: yB - 20
      }
    }]);
  }


  public updateCoordinate(guid: unknown, field: string, x: number, y: number, index: number) {
    const newCoordinates = [];
    for(const coordinate of this._coordinates.getValue()) {
      if (coordinate.assocLine.guidA === guid && coordinate.assocLine.fieldA === field){
        newCoordinates.push({
            assocLine: coordinate.assocLine,
            a: { x: x, y: y + 25 + index * 40 },
            b: { x: coordinate.b.x, y: coordinate.b.y },
        });
      }
      else if(coordinate.assocLine.guidB === guid && coordinate.assocLine.fieldB === field) {
        newCoordinates.push({
          assocLine: coordinate.assocLine,
          a: { x: coordinate.a.x, y: coordinate.a.y },
          b: { x: x, y: y + 25 + index * 40 },
        });
      }
      else {
        newCoordinates.push(coordinate);
      }
    }

    this._coordinates.next(newCoordinates);
  }

  public removeCoordinate(line: NgxObjectDiagramAssoc): void {
    this._coordinates.next([...this._coordinates.getValue().filter(lineA => this._isEqual(lineA.assocLine, line))]);
  }

  private _isEqual(a?: NgxObjectDiagramAssoc, b?:NgxObjectDiagramAssoc): boolean {
    return a?.guidA === b?.guidA && a?.guidB === b?.guidB && a?.fieldA === b?.fieldA && a?.fieldB === b?.fieldB;
  }
}

