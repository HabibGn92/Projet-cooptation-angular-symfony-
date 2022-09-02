import { Table } from "@fullcalendar/daygrid";

export interface Cooptations {
    id: number;
    firstname: string;
    lastname: string;
    cv: string;
    civility: string;
    phone: number;
    link: string;
    email: string;
    professional_experience: string;
    application_date: Date ;
    current_position:string;
    first_experience_date:Date ;
    fields_activity:boolean;
    current_salary:boolean;
    key_figures:boolean;
    interview_date: Date;
    interview_type: [];
    geographical_wishes: [];
    comments:Text;
    personality:Text;
    skils:Text;
    experience:Text;
    desired_salary:[];
    salary: number;
    history:any;
    coopted_entity:any;
    user :any;
    date: Date;
  }