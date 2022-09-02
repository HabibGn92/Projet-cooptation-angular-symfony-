import { Component,OnInit, Type } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';
import { CooptationService } from 'src/app/core/services/cooptation.service';
import {RoleGuardService} from 'src/app/core/services/role-guard.service';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder,FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalConfirmComponent } from '../modals/modal-confirm/modal-confirm.component';
import { ModalSaveComponent } from '../modals/modal-save/modal-save.component';
import { ModalCancelComponent } from '../modals/modal-cancel/modal-cancel.component';



@Component({
  selector: 'app-cooptation-edit',
  templateUrl: './cooptation-edit.component.html',
  styleUrls: ['./cooptation-edit.component.css']
})
export class CooptationEditComponent implements OnInit {
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
  formData:FormData = new FormData();
  form = {
    fieldActivities:'0',
    keyValues:'0',
    values:'0'
  };
  saveClicked:boolean=false;

  constructor(private _modalService: NgbModal ,private fb: FormBuilder, private http:HttpClient, private alertService: AlertService, private router:Router,private ActivatedRouter:ActivatedRoute, private CooptationService: CooptationService , private RoleGuardService: RoleGuardService ) { }


  ngOnInit(): void {
   
    this.firstForm = this.fb.group({
      civility : [this.civility, [Validators.required ]],
      username: ['', [Validators.required ]],
      lastname: ['', [Validators.required ]],
      email: ['', [Validators.required ,  Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required , Validators.minLength(8), Validators.maxLength(8),Validators.pattern("^\\d{0,9}$")]  ],
      cv: [this.FileName],
     });

     this.secondForm = this.fb.group({
      link: ['', [Validators.required]],
      coopted_entity: ['', [Validators.required]],
      firstExperienceDate: [''],
      departement: ['', [Validators.required]],
      professionalExperience: null,
      applicationDate: [''],
      currentPosition: null,
      DisponibilityDate: null,
      geographicalWishes: null,
  });
  
  this.thirdForm = this.fb.group({
    interview_date: ['', [this.dateValidator() , Validators.required ]],
    interview_type :[''],
    comments: ['', [Validators.required ]],
    secondcomments :[''],
    fildesofactivity :[''],
    keyfiguers :[''],
    values:[''],
    skills:[''],
    character:[''],
    experience:[''],
    desiredsalary:[''],
    variable_desiredsalary:[''],
    currentsalary:[''],
    variable_currentsalary:['']
    });

    this.formData.append('fieldActivities','0');
    this.formData.append('keyfiguers','0');
    this.formData.append('values','0');

    this.getCoopById();
    
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const currentDate = new Date();
  
      if(!(control.value)) {
        // if there's no control or no value, that's ok
        return null;
      }
  
      // return null if there's no errors
      return new Date(control.value).getTime() < currentDate.getTime() 
      ? null
      : {invalidDate: ' Entrer une date inférieur à la date actuelle' } ;
    }
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

  onClicksubmit (){
      this.formData.append('cv',this.uploadedCV);
      this.formData.append('civility',this.firstForm.value['civility']);
    
      this.CooptationService.editCooptation(this.ActivatedRouter.snapshot.params.id,this.formData,this.firstForm,this.secondForm,this.thirdForm,'submit').subscribe(()=>
      {
        this.router.navigateByUrl('cooptation-list');
        this.alertService.success('Cooptation modifiée et soumise');
        this.firstForm.reset();
        this.secondForm.reset();
        this.thirdForm.reset();
      }     
       ,()=>{
        this.alertService.danger("Veuillez réessayer ultérieurement");
      }
      );
  }

 

  onClicksave() 
  { 
    
      this.formData.append('cv',this.uploadedCV);
      this.formData.append('civility',this.firstForm.value['civility']);
      this.CooptationService.editCooptation(this.ActivatedRouter.snapshot.params.id,this.formData,this.firstForm,this.secondForm,this.thirdForm,'save').subscribe(()=>
      {
        this.router.navigateByUrl('cooptation-list');
        this.alertService.success('Cooptation modifiée');
        this.firstForm.reset();
        this.secondForm.reset();
        this.thirdForm.reset();
      }
      ,()=>{
        this.alertService.danger("Veuillez réessayer ultérieurement");
      }
      );
    }

  

  submitClick(){
    this.saveClicked = true;
    if(!this.firstForm.invalid && !this.secondForm.invalid && !this.thirdForm.invalid){
      this._modalService.open(ModalConfirmComponent).result.then((result)=>{
        if(result == 'Save'){
          this.onClicksubmit();
        }
      }, (reason => { }));
    }
  }

  editClick(){
    this.saveClicked = true;
    if(!this.firstForm.invalid && !this.secondForm.invalid && !this.thirdForm.invalid){
      this._modalService.open(ModalSaveComponent).result.then((result)=>{
        if(result == 'Save'){
          this.onClicksave();
        }
      }, (reason => { }))
    }
  }
  
  cancelClick(){
    this._modalService.open(ModalCancelComponent).result.then((result)=>{
      if(result == 'cancel'){
        this.alertService.success('Cooptation annulée');
        this.router.navigateByUrl('cooptation-list');
      }
    }, (reason => { }))
  }

  getCoopById(){
   
    this.CooptationService.getCooptationById(this.ActivatedRouter.snapshot.params.id).subscribe((data: any)=>{
     this.CooptationService.getPolesByEntityId(data[0].entityId).subscribe((data2: any)=>{
      this.poles = data2 ;
      this.FileName=data[0].cooptation[0].cv;
      
      this.firstForm.patchValue({
        civility : (data[0].cooptation[0].civility).toString(),
        username: data[0].cooptation[0].lastname,
        lastname: data[0].cooptation[0].firstname,
        email: data[0].cooptation[0].email, 
        phone: data[0].cooptation[0].phone, 
        
       });
    
     this.secondForm.patchValue({
      link:  data[0].cooptation[0].link,
      coopted_entity: data[0].entityId,
      departement: data[0].poleId,
      professionalExperience:  data[0].cooptation[0].professional_experience,
      currentPosition:  data[0].cooptation[0].current_position,
      DisponibilityDate:  data[0].cooptation[0].disponibility_date,
      geographicalWishes:  data[0].cooptation[0].geographical_wishes,
  });
     if (typeof data[0].cooptation[0].first_experience_date !== 'undefined' ){
      this.secondForm.patchValue({
      firstExperienceDate: this.formatDate(new Date((data[0].cooptation[0].first_experience_date))),
    });
   }
   if (typeof data[0].cooptation[0].application_date !== 'undefined' ){
    this.secondForm.patchValue({
      applicationDate: this.formatDate(new Date((data[0].cooptation[0].application_date))),
  });
 }

    this.thirdForm.patchValue({
      interview_date:  this.formatDate(new Date((data[0].cooptation[0].interview_date))),
      interview_type : data[0].cooptation[0].interview_type,
      comments:  data[0].cooptation[0].comments,
      secondcomments : data[0].cooptation[0].second_comment,
      fildesofactivity : ((data[0].cooptation[0].fields_activity)*1)?.toString(),
      keyfiguers : ((data[0].cooptation[0].key_figures)*1)?.toString(),
      values: ((data[0].cooptation[0].talan_values)*1)?.toString(),
      skills: data[0].cooptation[0].skils,
      character: data[0].cooptation[0].personality,
      experience: data[0].cooptation[0].experience,
      desiredsalary: data[0].cooptation[0].fixed_desired_salary,
      variable_desiredsalary :data[0].cooptation[0].variable_desired_salary,
      currentsalary: data[0].cooptation[0].fixed_current_salary,
      variable_currentsalary: data[0].cooptation[0].variable_current_salary,
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

}
