
import { Component, OnInit, Type } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder,FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CooptationService } from 'src/app/core/services/cooptation.service';
import { ModalCancelComponent } from '../modals/modal-cancel/modal-cancel.component';
import { ModalConfirmComponent } from '../modals/modal-confirm/modal-confirm.component';
import { ModalSaveComponent } from '../modals/modal-save/modal-save.component';


@Component({
  selector: 'app-cooptation-request',
  templateUrl: './cooptation-request.component.html',
  styleUrls: ['./cooptation-request.component.css'],
})

export class CooptationRequestComponent implements OnInit {
  modalRef!:NgbActiveModal;
  alert:boolean=false;
  cancelalert:boolean=false;
  savealert:boolean=false;
  uploadedCV!:File;
  civility!:string;
  firstForm!:FormGroup;
  secondForm!:FormGroup;
  thirdForm!:FormGroup;
  formData:FormData = new FormData();
  saveClicked:boolean=false;

  constructor(private _modalService: NgbModal ,private fb: FormBuilder, private http:HttpClient, private alertService: AlertService, private router:Router,
              private cooptationService:CooptationService ) {}

  ngOnInit(): void {
   
    this.firstForm = this.fb.group({
      civility : ['', [Validators.required ]],
      username: ['', [Validators.required ]],
      lastname: ['', [Validators.required ]],
      email: ['', [Validators.required ,  Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required , Validators.minLength(8), Validators.maxLength(8),Validators.pattern("^\\d{0,9}$")]  ],
      cv: ['', [Validators.required ]],
     });

     this.secondForm = this.fb.group({
      link: ['', [Validators.required]],
      coopted_entity: ['', [Validators.required]],
      firstExperienceDate: '',
      departement: ['', [Validators.required]],
      professionalExperience: '',
      applicationDate: '',
      currentPosition: '',
      DisponibilityDate: '',
      geographicalWishes: '',
  });

  this.thirdForm = this.fb.group({
    interview_date: ['', [this.dateValidator() , Validators.required ]],
    interview_type :[''],
    comments: ['', [Validators.required ]],
    secondcomments :[''],
    fildesofactivity :['0'],
    keyfiguers :['0'],
    values:['0'],
    skills:[''],
    character:[''],
    experience:[''],
    desiredsalary:['',[Validators.pattern("^\\d{0,9}$")]],
    variable_desiredsalary:['',[Validators.pattern("^\\d{0,9}$")]],
    currentsalary:['',[Validators.pattern("^\\d{0,9}$")]],
    variable_currentsalary:['',[Validators.pattern("^\\d{0,9}$")]]
    });

    this.formData.append('fieldActivities','0');
    this.formData.append('keyfiguers','0');
    this.formData.append('values','0');
    this.formData.append('cv','');
    this.formData.append('civility','');
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

  getEntityChanges(value:boolean){
    if(value){
    this.secondForm.controls['departement'].setValue('');
  }}

  getCivility(civility:string){
    this.civility = civility;
    this.formData.set('civility',this.civility);
  }

  getUplodedFile(file:File){
    this.uploadedCV = file;
    this.formData.set('cv',this.uploadedCV);
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
      this.cooptationService.postCooptation(this.formData,this.firstForm,this.secondForm,this.thirdForm,'submit').subscribe(()=>
      {
        this.router.navigateByUrl('cooptation-list');
        this.alertService.success('Cooptation soumise');
        this.firstForm.reset();
        this.secondForm.reset();
        this.thirdForm.reset();
      }
      ,()=>{
        this.alertService.danger("Veuillez réessayer ultérieurement");
      }
      )
  }

  onClicksave() 
  { 
      this.cooptationService.postCooptation(this.formData,this.firstForm,this.secondForm,this.thirdForm,'save').subscribe(()=>
      {
        this.router.navigateByUrl('cooptation-list');
        this.alertService.success('Cooptation enregistrée');
        this.firstForm.reset();
        this.secondForm.reset();
        this.thirdForm.reset();
      }      
      ,()=>{
        this.alertService.danger("Veuillez réessayer ultérieurement");
      })
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

  saveClick(){
    this.saveClicked = true;
    if(!this.firstForm.invalid && !this.secondForm.invalid && !this.thirdForm.invalid){
      this._modalService.open(ModalSaveComponent).result.then((result)=>{
        if(result == 'Save'){
          this.onClicksave();
        }
      }, (reason => { }));
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
}
