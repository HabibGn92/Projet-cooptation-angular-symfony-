import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { CooptationService } from '../../core/services/cooptation.service';
import { RoleGuardService } from 'src/app/core/services/role-guard.service';
@Component({
  selector: 'app-cooptations-header',
  templateUrl: './cooptations-header.component.html',
  styleUrls: ['./cooptations-header.component.css'],
  	providers: [NgbDropdownConfig]
})
export class CooptationsHeaderComponent implements OnInit {
 name$!:Observable<any[]>
    toggleChat: boolean = true;
    toggleSingle: boolean = true;
    todayDate : Date = new Date();
    roleAdmin: boolean = false;
    roleManager: boolean = false;
    constructor(private router:Router, private cooptationService:CooptationService,private service:RoleGuardService) {}
    
    ngOnInit(): void {
    this.name$=this.cooptationService.getUserName();

    if(this.service.getRole()==="ROLE_MANAGER"){
      this.roleManager=true;
    }else if(this.service.getRole()==="ROLE_ADMIN"){
    this.roleAdmin=true;
    }
    }
    
    togglechatbar() {
      this.toggleChat = !this.toggleChat;
    }
    singleChatWindow() {
      this.toggleSingle = !this.toggleSingle;
    }
      onLogout() : void {
      localStorage.removeItem('jwt');
      this.router.navigateByUrl('');
    }
    isLoggedIn() {
      return localStorage.getItem('jwt');
    }
}
