import { Observable } from 'rxjs'; import { CockpitInput } from '../models/domain.models';
export interface ProductionDataSource { getCockpitInput(date:string):Observable<CockpitInput>; }
