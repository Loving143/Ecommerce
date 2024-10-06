import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/UserStorage/user-storage.service';

const BASIC_URL = "http://localhost:8080/"
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addCategory(categoryDto : any):Observable<any>{
    return this.http.post(BASIC_URL+'api/admin/category',categoryDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllCategory():Observable<any>{
    return this.http.get(BASIC_URL+'api/admin/get/allCategory',{
      headers:this.createAuthorizationHeader(),
    })
  }

  addProduct(productDto:any):Observable<any>{
    return this.http.post(BASIC_URL + 'api/admin/add/product',productDto,{
      headers:this.createAuthorizationHeader(),
    })
  }

  private createAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set(
      'Authorization','Bearer '+ UserStorageService.getToken()
    )
  }

  getAllProduct():Observable<any>{
    return this.http.get(BASIC_URL+'api/admin/get/allProducts',{
      headers:this.createAuthorizationHeader(),
    })
  }

  getAllProductByName(name:any):Observable<any>{
    return this.http.get(BASIC_URL+`api/admin/search/${name}`,{
      headers:this.createAuthorizationHeader(),
    })
  }

  deleteProduct(id:number):Observable<any>{
    return this.http.delete(BASIC_URL+`api/admin/delete/products/${id}`,{
      headers:this.createAuthorizationHeader(),
    })
  }
}
