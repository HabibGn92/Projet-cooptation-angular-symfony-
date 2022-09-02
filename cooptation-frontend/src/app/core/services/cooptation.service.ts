import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Cooptations } from 'src/app/cooptations';
import { History } from 'src/app/history';

@Injectable({
  providedIn: 'root'
})
export class CooptationService {

  constructor(private http: HttpClient) { }

  getCooptation():Observable<Cooptations[]>
  {
    return this.http.get<Cooptations[]>('http://localhost:8000/api/cooptation/user');
  }
  deleteCooptations(id:number)
  {
    return this.http.delete('http://localhost:8000/api/cooptation/'+id);
  }

    getUserName():Observable<any>
  {
    return this.http.get<any>('http://localhost:8000/api/userName/');
  }

  getCooptationByManager(){
    return this.http.get<Cooptations[]>('http://127.0.0.1:8000/api/roles/manager');
  }

   getCooptationHistory(id: number): Observable<History> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/history/${id}`);
  }


  getCooptationById(id: number){
    return this.http.get<Cooptations[]>(`http://localhost:8000/api/cooptation/${id}`);
  }
  getCooptationStatusById(id: number){
    return this.http.get<Cooptations[]>(`http://localhost:8000/api/cooptation/status/${id}`);
  }

  getPolesByEntityId(id: number){
    return this.http.get<any>(`http://localhost:8000/api/cooptation/pole/${id}`);
  }

  postCooptation(formData:FormData,form1:FormGroup,form2:FormGroup,form3:FormGroup, status: "save" | "submit"){
    formData.append('username',form1.value['username']);
    formData.append('lastname',form1.value['lastname']);
    formData.append('email',form1.value['email']);
    formData.append('phone',form1.value['phone']);
    formData.append('link',form2.value['link']);
    formData.append('coopted_entity',form2.value['coopted_entity']);
    formData.append('firstExperienceDate',form2.value['firstExperienceDate']);
    formData.append('departement',form2.value['departement']);
    formData.append('professionalExperience',form2.value['professionalExperience']);
    formData.append('applicationDate',form2.value['applicationDate']);
    formData.append('currentPosition',form2.value['currentPosition']);
    formData.append('DisponibilityDate',form2.value['DisponibilityDate']);
    formData.append('geographicalWishes',form2.value['geographicalWishes']);
    formData.append('interview_date',form3.value['interview_date']);
    formData.append('interview_type',form3.value['interview_type']);
    formData.append('comments',form3.value['comments']);
    formData.append('secondcomments',form3.value['secondcomments']);
    formData.append('skills',form3.value['skills']);
    formData.append('character',form3.value['character']);
    formData.append('experience',form3.value['experience']);
    formData.append('desiredsalary',form3.value['desiredsalary']);
    formData.append('currentsalary',form3.value['currentsalary']);
    formData.append('variable_desiredsalary',form3.value['variable_desiredsalary']);
    formData.append('variable_currentsalary',form3.value['variable_currentsalary']);
    if(status == "save"){
      formData.append('postType','1');
    }
    else{
      formData.append('postType','2');
    }
    return this.http.post<any>('http://127.0.0.1:8000/api/cooptation',formData);
  }

  editCooptation(id: number,formData:FormData,form1:FormGroup,form2:FormGroup,form3:FormGroup, status: "save" | "submit"){
    formData.append('username',form1.value['username']);
    formData.append('lastname',form1.value['lastname']);
    formData.append('email',form1.value['email']);
    formData.append('phone',form1.value['phone']);
    formData.append('link',form2.value['link']);
    formData.append('coopted_entity',form2.value['coopted_entity']);
    formData.append('firstExperienceDate',form2.value['firstExperienceDate']);
    formData.append('departement',form2.value['departement']);
    formData.append('professionalExperience',form2.value['professionalExperience']);
    formData.append('applicationDate',form2.value['applicationDate']);
    formData.append('currentPosition',form2.value['currentPosition']);
    formData.append('DisponibilityDate',form2.value['DisponibilityDate']);
    formData.append('geographicalWishes',form2.value['geographicalWishes']);
    formData.append('interview_date',form3.value['interview_date']);
    formData.append('interview_type',form3.value['interview_type']);
    formData.append('comments',form3.value['comments']);
    formData.append('secondcomments',form3.value['secondcomments']);
    formData.append('skills',form3.value['skills']);
    formData.append('character',form3.value['character']);
    formData.append('experience',form3.value['experience']);
    formData.append('desiredsalary',form3.value['desiredsalary']);
    formData.append('currentsalary',form3.value['currentsalary']);
    formData.append('variable_desiredsalary',form3.value['variable_desiredsalary']);
    formData.append('variable_currentsalary',form3.value['variable_currentsalary']);
    if(status == "save"){
      formData.append('postType','1');
    }
    else{
      formData.append('postType','2');
    }
    return this.http.post<any>(`http://127.0.0.1:8000/api/cooptation/${id}`,formData);
  }

  changeStatus(cooptation_id:number,status_id:number){
    let formData = new FormData();
    formData.append('cooptation_id',cooptation_id.toString());
    formData.append('status_id',status_id.toString());
    return this.http.post<any>('http://127.0.0.1:8000/api/history',formData);
  }
  getCooptationAllManager(){
    return this.http.get<Cooptations[]>('http://127.0.0.1:8000/api/roles');
  }
    getUserPole():Observable<any>
  {
    return this.http.get<any>('http://localhost:8000/api/userPole/');
  }
}
