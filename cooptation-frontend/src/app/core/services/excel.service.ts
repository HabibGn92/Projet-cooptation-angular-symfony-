import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http: HttpClient) {}

exportfile():Observable <any>
  { 
      return this.http.get<any>('http://127.0.0.1:8000/api/cooptation/export', { responseType: 'blob' as 'json',})
  }
  
exportfilemanager():Observable <any>
  { 
      return this.http.get<any>('http://127.0.0.1:8000/api/cooptation/exportmanager', { responseType: 'blob' as 'json',})
  }
  
exportStatusMang():Observable <any>
{ 

    return this.http.get<any>('http://127.0.0.1:8000/api/cooptation/exportstatus', { responseType: 'blob' as 'json',})
}


downloadMyFile(filename:string){
  
  const link = document.createElement('a');
  link.setAttribute('target', '_blank');
  link.setAttribute('href', `http://127.0.0.1:8000/uploads/cv/${filename}`);
  link.setAttribute('Content-Type', 'application/pdf');
  link.setAttribute('Content-Disposition' ,'download');
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
}