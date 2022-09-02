import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { FormGroup,  FormBuilder, ValidatorFn ,AbstractControl} from '@angular/forms';


@Component({
  selector: 'app-first-interview-form',
  templateUrl: './first-interview-form.component.html',
  styleUrls: ['./first-interview-form.component.css']
})
export class FirstInterviewFormComponent implements OnInit {

  @Output() fieldActivitiesEvent = new EventEmitter<string>();
  @Output() keyValuesEvent = new EventEmitter<string>();
  @Output() valuesEvent = new EventEmitter<string>();
  @Input() angForm: FormGroup | any;
  @Input() saveClicked:boolean = false;
  
  constructor(private fb: FormBuilder) {

   }

  ngOnInit(): void {}

  onFieldActivitiesChange(event:any){
    this.fieldActivitiesEvent.emit(event.value);
  }

  onKeyValuesChange(event:any){
    this.keyValuesEvent.emit(event.value);
  }

  onValuesChange(event:any){
    this.valuesEvent.emit(event.value);
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

}
