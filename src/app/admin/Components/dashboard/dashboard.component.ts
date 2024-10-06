import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { title } from 'process';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products:any=[];
  searchProductForm ! : FormGroup //Here we have created the form group . 
  constructor(private adminService : AdminService,private fb:FormBuilder, private snackbar : MatSnackBar) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: ['', [Validators.required]]
    })
  }

  getAllProducts(){
    this.products=[];
    this.adminService.getAllProduct().subscribe(
      res => {res.forEach(element => {
        element.processedImg =' data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
        console.log(element.name);
      });
   } )
}

  deleteProducts(productId :any ){
    this.adminService.deleteProduct(productId).subscribe(res=>{
      if(res.equals("true"))
        this.snackbar.open('Category Posted Successfully', 'close',{duration:5000});
      else{
        this.snackbar.open(res.message,'close',{
          duration : 5000,
          panelClass : 'error-snackbar'
        });
      }
    })
  }

submitForm(){
  this.products=[];
  const title = this.searchProductForm.get('title').value;
    this.adminService.getAllProductByName(title).subscribe(
      res => {res.forEach(element => {
        element.processedImg =' data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
        console.log(element.name);
      });
   } )
}

}
