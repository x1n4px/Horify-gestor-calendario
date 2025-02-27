import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public router: Router, private employeeService: EmployeeService) {

  }

  //TEMPORAL
  getLoginData() {
    this.employeeService.getEmployee(1).subscribe(
      (data:any) => {
        localStorage.setItem('storeId', data.employee.store_id)
      }
    )
  }


  redirectTo() {
    this.getLoginData(); // TEMPORAL
    this.router.navigate(['/home']);
  }
}
