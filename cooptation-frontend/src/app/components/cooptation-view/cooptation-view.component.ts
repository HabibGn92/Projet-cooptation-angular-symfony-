import { Component,Input,OnInit, Type } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';
import { CooptationService } from 'src/app/core/services/cooptation.service';
import {RoleGuardService} from 'src/app/core/services/role-guard.service';



@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Mise à jour de la cooptation</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Êtes-vous sûr(e) de votre choix?</strong></p>
    <p>Le nouveau statut sera <strong> « {{next_status}} » </strong> .</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-danger" (click)="modal.dismiss('cancel click')">Annuler</button>
    <button type="button" class="btn btn-success" (click)="modal.close('valider')">Ok</button>
  </div>
  `,
})
export class NgbdModalConfirm {
  @Input() next_status!:string;
  constructor(public modal: NgbActiveModal) { }
}
const MODALS: { [name: string]: Type<any> } = {
  4: NgbdModalConfirm,
  6: NgbdModalConfirm,
  7: NgbdModalConfirm,
  8: NgbdModalConfirm,
  9: NgbdModalConfirm,
  10: NgbdModalConfirm,
  11: NgbdModalConfirm,
  12: NgbdModalConfirm,
  13: NgbdModalConfirm,
  14: NgbdModalConfirm,
  15: NgbdModalConfirm,
  16: NgbdModalConfirm,
  17: NgbdModalConfirm,
 
};


import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder,FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExcelService } from 'src/app/core/services/excel.service';



@Component({
  selector: 'app-cooptation-view',
  templateUrl: './cooptation-view.component.html',
  styleUrls: ['./cooptation-view.component.css']
})

export class CooptationViewComponent implements OnInit {
  cooptationHistory:any = [] ;
  coopId! :number;
    coop!:any;
    alert:boolean=false;
    cancelalert:boolean=false;
    savealert:boolean=false;
    uploadedCV!:File;
    civility!:string;
    firstForm!:FormGroup;
    secondForm!:FormGroup;
    thirdForm!:FormGroup;
    poles!: any;
    FileName! : string;
    roleAdmin: boolean = false;
    roleManager: boolean = false;
    formData:FormData = new FormData();
    form = {
      fieldActivities:'0',
      keyValues:'0',
      values:'0',
    
    };
    saveClicked:boolean=false;
    constructor(private _modalService: NgbModal ,private fb: FormBuilder, private http:HttpClient, private alertService: AlertService, private router:Router,private ActivatedRouter:ActivatedRoute, private CooptationService: CooptationService , private RoleGuardService: RoleGuardService,private excelService : ExcelService ) { }
  
    ngOnInit(): void {
      if(this.RoleGuardService.getRole()==="ROLE_MANAGER"){
        this.roleManager=true;
    
      }else if(this.RoleGuardService.getRole()==="ROLE_ADMIN"){
      this.roleAdmin=true;
      
      }
    
      this.firstForm = this.fb.group({
        civility : [{value: null, disabled: true},this.civility],
        username: [{value: null, disabled: true},''],
        lastname: [{value: null, disabled: true},''],
        email: [{value: null, disabled: true},''],
        phone: [{value: null, disabled: true},''],
        cv: [this.FileName],
       });
  
       this.secondForm = this.fb.group({
        link: [{value: null, disabled: true},''],
        coopted_entity: [{value: null, disabled: true},''],
        firstExperienceDate: [{value: null, disabled: true},''],
        departement: [{value: null, disabled: true},''],
        professionalExperience: {value: null, disabled: true},
        applicationDate: [{value: null, disabled: true},''],
        currentPosition: {value: null, disabled: true},
        DisponibilityDate: {value: null, disabled: true},
        geographicalWishes: {value: null, disabled: true},
    });
    
    this.thirdForm = this.fb.group({
      interview_date: [{value: null, disabled: true},''],
      interview_type :[{value: null, disabled: true},''],
      comments: [{value: null, disabled: true},''],
      secondcomments :[{value: null, disabled: true},''],
      fildesofactivity :[{value: null, disabled: true},''],
      keyfiguers :[{value: null, disabled: true},''],
      values:[{value: null, disabled: true},''],
      skills:[{value: null, disabled: true},''],
      character:[{value: null, disabled: true},''],
      experience:[{value: null, disabled: true},''],
      desiredsalary:[{value: null, disabled: true},''],
      variable_desiredsalary:[{value: null, disabled: true},''],
      currentsalary:[{value: null, disabled: true},''],
      variable_currentsalary:[{value: null, disabled: true},'']
      });
  
      this.formData.append('fieldActivities','0');
      this.formData.append('keyfiguers','0');
      this.formData.append('values','0');
      this.getCoopById();
      this.isDisabled();
    }
  
    getCivility(civility:string){
      this.civility = civility;
    }
  
    getUplodedFile(file:File){
      this.uploadedCV = file;
    }
  
    getFieldActivities(value:string){
      this.formData.set('fieldActivities',value);
    }
  
    getKeyValues(value:string){
      this.formData.set('keyfiguers',value);
    }
  
    getValues(value:string){
      this.formData.set('values',value);
    }
  
  
    
    open(name: string, id: number, status_id='',status='') {
      if (name == 'valider') {
        const modalRef = this._modalService.open(NgbdModalConfirm);
        modalRef.componentInstance.next_status = status;
        modalRef.result.then((result => {
          if (result === 'valider') {
            this.CooptationService.changeStatus(id,parseInt(status_id)).subscribe(()=>{
              this.alertService.success('Cooptation mise à jour');
              if(this.RoleGuardService.getRole()==="ROLE_MANAGER"){
                this.router.navigateByUrl(`manager`)
              }else if(this.RoleGuardService.getRole()==="ROLE_ADMIN"){
                this.router.navigateByUrl(`admin`)
            };

          })

        };}), (reason => { }));

      }

     

    }
   
    getCoopById(){
     
      this.CooptationService.getCooptationStatusById(this.ActivatedRouter.snapshot.params.id).subscribe((data: any)=>{
        this.coopId=data[0][0].cooptation[0].id;

        this.cooptationHistory = data[1].actions;
        this.CooptationService.getPolesByEntityId(data[0][0].entityId).subscribe((data2: any)=>{

        this.poles = data2 ;
        this.FileName=data[0][0].cooptation[0].cv;
        
        this.firstForm.patchValue({
          civility : (data[0][0].cooptation[0].civility).toString(),
          username: data[0][0].cooptation[0].firstname,
          lastname: data[0][0].cooptation[0].lastname,
          email: data[0][0].cooptation[0].email, 
          phone: data[0][0].cooptation[0].phone, 
          
         });
      
       this.secondForm.patchValue({
        link:  data[0][0].cooptation[0].link,
        coopted_entity: data[0][0].entityId,
        departement: data[0][0].poleId,
        professionalExperience:  data[0][0].cooptation[0].professional_experience,
        currentPosition:  data[0][0].cooptation[0].current_position,
        DisponibilityDate:  data[0][0].cooptation[0].disponibility_date,
        geographicalWishes:  data[0][0].cooptation[0].geographical_wishes,
    });
       if (typeof data[0][0].cooptation[0].first_experience_date !== 'undefined' ){
        this.secondForm.patchValue({
        firstExperienceDate: this.formatDate(new Date((data[0][0].cooptation[0].first_experience_date))),
      });
     }
     if (typeof data[0][0].cooptation[0].application_date !== 'undefined' ){
      this.secondForm.patchValue({
        applicationDate: this.formatDate(new Date((data[0][0].cooptation[0].application_date))),
    });
   }
  
      this.thirdForm.patchValue({
        interview_date:  this.formatDate(new Date((data[0][0].cooptation[0].interview_date))),
        interview_type : data[0][0].cooptation[0].interview_type,
        comments:  data[0][0].cooptation[0].comments,
        secondcomments : data[0][0].cooptation[0].second_comment,
        fildesofactivity : ((data[0][0].cooptation[0].fields_activity)*1)?.toString(),
        keyfiguers : ((data[0][0].cooptation[0].key_figures)*1)?.toString(),
        values: ((data[0][0].cooptation[0].talan_values)*1)?.toString(),
        skills: data[0][0].cooptation[0].skils,
        character: data[0][0].cooptation[0].personality,
        experience: data[0][0].cooptation[0].experience,
        desiredsalary: data[0][0].cooptation[0].fixed_desired_salary,
        variable_desiredsalary :data[0][0].cooptation[0].variable_desired_salary,
        currentsalary: data[0][0].cooptation[0].fixed_current_salary,
        variable_currentsalary: data[0][0].cooptation[0].variable_current_salary,
        });
       
       
       });
      });
    }
    private formatDate(date:any) {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
    }
   
    isDisabled(): any {
      let long = this.cooptationHistory.length;
      if (long === 0){
        return true;
      } else {
        return false;
      }
   }
   
   downloadCV( filename :string){
    return this.excelService.downloadMyFile( filename)
  }
  
  }