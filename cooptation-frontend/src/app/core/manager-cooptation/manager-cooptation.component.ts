import { ExcelService } from './../services/excel.service';
import { CooptationService } from '../services/cooptation.service';
import { Component, Input, OnInit, ViewChild, Type } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';
import { HttpClient } from '@angular/common/http';
import { Columns } from '../cooptation-list/cooptation-table/columns';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalValidateComponent } from 'src/app/components/modals/modal-validate/modal-validate.component';
import { ModalRejectComponent } from 'src/app/components/modals/modal-reject/modal-reject.component';
import { ModalWorkflowComponent } from 'src/app/components/modals/modal-workflow/modal-workflow.component';


@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Suppression de la cooptation</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Êtes-vous sûr(e)?</strong></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-danger" (click)="modal.dismiss('cancel click')">Annuler</button>
    <button type="button" class="btn btn-success" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}



const MODALS: { [name: string]: Type<any> } = {
  delete: NgbdModalConfirm,
  workflow: ModalWorkflowComponent
};

@Component({
  selector: 'app-manager-cooptation',
  templateUrl: './manager-cooptation.component.html',
  styleUrls: ['./manager-cooptation.component.css']
})

export class ManagerCooptationComponent implements OnInit {
  filterForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    status: new FormControl(),
    date: new FormControl()
  });
  cooptation!: any;
  displayedColumns: string[] = ['nom', 'prenom', 'date', 'statut', 'action'];

  dataSource: MatTableDataSource<any>;
  defaultValue = "Tous les statuts";
  cooptationHistory!: any;
  filterDictionary = new Map<string, string>();
  allCooptations: any;

  dataSourceFilters!: MatTableDataSource<Columns>;

  colors = [{ status: "A soumettre", color: "grey" }, { status: "En attente de validation", color: " #006dbf" }, { status: "En cours d'évaluation", color: " #006dbf" }, { status: "En cours d'évaluation - RDV MNG 1", color: " #006dbf" }, { status: "En cours d'évaluation - RDV MNG 2", color: " #006dbf" }, 
            {status:"Rejeté | Cooptation incomplète", color:" rgb(221, 12, 12)"} ,  {status:"Rejeté | Non adapté à nos métiers", color:" rgb(221, 12, 12)"}, {status:"Négatif", color:" rgb(221, 12, 12)"}, {status:"Désistement en cours de process", color:"orange"}, {status:"Désistement après signature", color:"orange"},{status:"Désistement après proposition", color:"orange"
  }, { status:"Proposition signé", color  : "rgb(99, 196, 39)"}, { status: "Contrat signé", color: "rgb(99, 196, 39)" },  { status: "Embauché | PE à confirmer", color: "rgb(99, 196, 39)" },  { status: "Embauché | PE renouvelée confirmée", color: "rgb(99, 196, 39)" },  { status: "Embauché | PE confirmée", color: "rgb(99, 196, 39)" }, { status: "Vivier", color: "rgb(251, 232, 17)" }]
    status!:string;
    namefile!:any;
    filename!:string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor( private cooptationService:CooptationService, private _modalService: NgbModal,private alertService: AlertService , private excelService : ExcelService,
              private http:HttpClient, private router: Router) {

    this.dataSource = new MatTableDataSource();
   }

   ngOnInit(): void {
    this.getCooptationByManager();
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function (record,filter) {
      return record.nom.toLocaleLowerCase() == filter.toLocaleLowerCase();
    }
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getCooptationByManager() { 
    this.cooptationService.getCooptationByManager().subscribe((data: any) => {
      this.dataSourceFilters = new MatTableDataSource(data);
      this.allCooptations = data;
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.sort = this.sort;
      this.dataSourceFilters.paginator = this.paginator;
      return data
      
    })}

    onDeleteCooptation(id: number) {
      this.cooptationService.deleteCooptations(id).subscribe((res:any)=> {
        if(res==="deleted"){
          this.alertService.success('cooptation supprimée avec sucèes');
        }else if(res==="cooptation not found") {
          this.alertService.danger("cooptation n'a pas toujours existé !");
        }
        else if(res==="error"){
          this.alertService.warning('impossible de supprimer !');
        }
        this.getCooptationByManager();
      }
      );
    }

    onChangeStatusClick(cooptation: number,status: string){
      if(status == '5'){
        this._modalService.open(ModalValidateComponent).result.then((result)=>{
          if(result == 'valider'){
            this.onValidate(cooptation,parseInt(status));
          }
        }, (reason => { }))
      }else{
        this._modalService.open(ModalRejectComponent).result.then((result)=>{
          if(result == 'valider'){
            this.onReject(cooptation,parseInt(status));
          }
        }, (reason => { }))
      }
    }

    onValidate(cooptation_id:number,status:number){
      this.cooptationService.changeStatus(cooptation_id,status).subscribe(() => {
        this.getCooptationByManager();
        this.alertService.success('Cooptation validée');
      });
    }

    onReject(cooptation_id:number,status:number){
      this.cooptationService.changeStatus(cooptation_id,status).subscribe(() => {
        this.getCooptationByManager();
        this.alertService.success('Cooptation rejetée');
      });
    }


    withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
    (click)="modal.close('Ok click')">Ok</button>`;
  
  open(name: string, id: number) {
    if (name == "delete") {
      this._modalService.open(MODALS[name]).result.then((result => {
        if (result === 'Ok click') {
          this.onDeleteCooptation(id);
        }
      }), (reason => { }));
    }
    else if (name == "workflow") {
      const modalRef = this._modalService.open(MODALS[name])
      modalRef.componentInstance.id = id
      modalRef.result.then((result => {
        if (result) {
        }
      }), (reason => { }));;
    }
  }

  applyCoopFilter(key: any) {
    this.filterDictionary.set(key, this.filterForm.get(key)?.value);
    let jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.dataSourceFilters.filterPredicate = function (record, filter) {
      let map = new Map(JSON.parse(filter));
      let isMatch = false;
      for (let [key, value] of map) {
        let recordValue: any;
        if (key == "status") {
          recordValue = (record[key as keyof Columns] as any);
          isMatch = (value == "Tous les statuts" || recordValue.trim().toLowerCase().includes((value as String).trim().toLowerCase()))
        }
        if (key == "firstname") {
          recordValue = record['cooptation']['firstname'] as keyof Columns;
          isMatch = (value == "*" || recordValue.trim().toLowerCase().includes((value as String).trim().toLowerCase()))
        }

        if (key == "lastname") {
          recordValue = record['cooptation']['lastname'] as keyof Columns;
          isMatch = (value == "*" || recordValue.trim().toLowerCase().includes((value as String).trim().toLowerCase()))
        }

        if (key == 'date') {
          recordValue = new Date((record['cooptation']['date']) as keyof Columns);
          let dateValue: Date = new Date(value as string);
          dateValue.setDate(dateValue.getDate() + 1);
          recordValue.setUTCHours(0, 0, 0, 0);
          dateValue.setUTCHours(0, 0, 0, 0);

          isMatch = recordValue.getTime() === dateValue.getTime();
        }

        if (!isMatch) return false;
      }
      return isMatch;

    }
    this.dataSourceFilters.filter = jsonString;
  }

    getTheColor(status: string) {
          return this.colors.filter(item => item.status === status)[0].color 
          // could be better written, but you get the idea
    }
    downloadCV( filename :string){
      return this.excelService.downloadMyFile( filename)
    }

    ViewCoop(id: number) {

      this.router.navigateByUrl(`cooptation/view/${id}`);
  
    }

}

  

