import { Injectable } from '@angular/core';
import { DispenseOrder, Status } from '../models/domain.models';
import { DispenseOrderDto } from './api.models';

const STATUSES:Status[]=['ToBeTreated','BeingPrepareForSpp','ReadyForSpp','SentToSpp','NotTreated','ReadyForRobot','OnHold','SentToRobot','Error','Cancelled','CancelledByExternalSource','CancelledByAdt','ReceivedTooLate','NeverPlanned'];
@Injectable({providedIn:'root'})
export class DispenseOrderMapper {
  map(dto:DispenseOrderDto):DispenseOrder {
    const service=typeof dto.service==='object'?dto.service:undefined;
    const serviceId=dto.serviceId??service?.id??service?.code??'missing-service';
    return {id:dto.id??'missing-id',serviceId,serviceName:service?.description??service?.name??service?.code??(typeof dto.service==='string'?dto.service:'Unavailable'),patientCode:dto.patientCode?.trim()||null,quantity:typeof dto.quantity==='number'?dto.quantity:Number.NaN,administrationTargetTime:this.date(dto.tackingTime),sendingCycle:this.date(dto.sendingCycle),rcp:typeof dto.stability==='number'&&Number.isFinite(dto.stability)?dto.stability:null,status:STATUSES.includes(dto.status as Status)?dto.status as Status:'NotTreated',hasBeenProduct:dto.hasBeenProduct===true,hasStock:dto.hasStock!==false,verified:dto.verified!==false,warning:dto.warning===true,cancelledAfterDacsProduction:dto.cancelledAfterDacsProduction===true};
  }
  private date(value:string|null|undefined):Date|null { if(!value)return null; const date=new Date(value); return Number.isNaN(date.valueOf())?null:date; }
}
