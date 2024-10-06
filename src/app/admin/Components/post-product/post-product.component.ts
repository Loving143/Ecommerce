import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {

  productForm:FormGroup;
  listOfCategories :any=[];
  selectedFile : File | null;
  imagePreview : string | ArrayBuffer | null;
  constructor(
    private fb : FormBuilder,
    private snackbar : MatSnackBar,
    private authService : AuthService,
    private router : Router,
    private adminService : AdminService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      categoryId : [null, [Validators.required]],
      name : [null , [Validators.required]],
      price : [null, [Validators.required]],
      description : [null, [Validators.required]],
    });
    this.getAllCategories();
  }

  getAllCategories(){
    this.adminService.getAllCategory().subscribe(res=>{
      this.listOfCategories = res;
    })
  }

  addProduct():void{
    if(this.productForm.valid){
      const formData : FormData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('categoryId', this.productForm.get('categoryId').value);
      formData.append('name', this.productForm.get('name').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('price', this.productForm.get('price').value);

      this.adminService.addProduct(formData).subscribe((res)=>{
        if(res.id!=null){
          this.snackbar.open('Product Posted Successfully!','Close',{
            duration : 5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        }else{
          this.snackbar.open(res.message,'ERROR',{
            duration:5000
          });
        }
      })
    }else{
      for(const i in this.productForm.controls){
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }

    }
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload= () =>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

}
