import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RealProductionPlanningDto } from './api.models';

@Injectable({providedIn:'root'})
export class DacsApiClient {
  private readonly http=inject(HttpClient); private readonly base='/api';
  getRealProductionPlanning(productionDay:string):Observable<RealProductionPlanningDto[]> { return this.http.get<RealProductionPlanningDto[]>(`${this.base}/v1/dashboard-real-production-planning`,{params:{productionDay}}); }
  getIterationPlanning(optimizerOutputId:string):Observable<unknown> { return this.http.get(`${this.base}/v1/dashboard-iteration-planning`,{params:{optimizerOutputId}}); }
  getNextSppIteration():Observable<unknown> { return this.http.get(`${this.base}/v1/dashboard-next-spp-iteration`); }
  getRobotSchedules(date:string):Observable<unknown> { return this.http.get(`${this.base}/v1/dashboard-robot-schedules`,{params:{date}}); }
  getDispenseOrder(id:string):Observable<unknown> { return this.http.get(`${this.base}/v1/dispense-orders/${encodeURIComponent(id)}`); }
  getSites():Observable<unknown> { return this.http.get(`${this.base}/v1/site`); }
  getServices(siteId:string):Observable<unknown> { return this.http.get(`${this.base}/v1/site/${encodeURIComponent(siteId)}/services`); }
}
