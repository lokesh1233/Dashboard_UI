import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment as env } from '../environments/environment';
// import {parse} from 'yamljs';

@Injectable({
  providedIn: 'root'
})
export class BotServiceService {

  constructor(private http: HttpClient) { }



  login_url = "http://192.168.6.224:5002"
  main_url = "http://192.168.6.224:5050/o360/Qna"
  authboturl = "/api/auth"
  conversationboturl = "/api/conversations"
  messageurl = "/messages"
  qetQna = "/Qna"
  insertQna = "/insertQna"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Authorization'
    })
  };



  getAuth(authBody) {
    
    // this.httpOptions.headers = this.httpOptions.headers.set('Access-Control-Allow-Origin', '*'); , this.httpOptions
    return this.http.post(this.login_url + this.authboturl, { "username": "me", "password": "password" })
  }

  getConversation() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headers_object
    };

    return this.http.get(this.main_url + this.conversationboturl, httpOptions)
  }

  getSenderMessage(SenderId) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headers_object
    };

    return this.http.get(this.main_url + this.conversationboturl + "/" + SenderId + this.messageurl, httpOptions)
  }

  getQna() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headers_object
    };
    return this.http.get(`${env.main_url}` , httpOptions).pipe(map((vGetRes: any) => {
      if (vGetRes.code === 500) {
        catchError(this.handleError)
        return []
      } else {
        return vGetRes;
      }
    }));
  }

  getModels() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headers_object
    };
    return this.http.get(`${env.model_url}`).pipe(map((vGetRes: any) => {
      if (vGetRes.code === 500) {
        catchError(this.handleError)
        return []
      } else {
        return vGetRes;
      }
    }));
  }


  updateModelData(methodType, id="", data=undefined){

    if(id != ""){
      id = "/"+id
    }

    return this.http[methodType](`${env.model_url}` + id, data).pipe(map((vGetRes: any) => {
      if (vGetRes.code === 500) {
        catchError(this.handleError)
        return []
      } else {
        return vGetRes;
      }
    }));

  }

  changeModel(data) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headers_object
    };
    return this.http.post(`${env.model_url}` , data).pipe(map((vGetRes: any) => {
      if (vGetRes.code === 500) {
        catchError(this.handleError)
        return []
      } else {
        return vGetRes;
      }
    }));
  }

  getQnaInbox() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headers_object
    };
    return this.http.get(`${env.inbox_url}` , httpOptions).pipe(map((vGetRes: any) => {
      if (vGetRes.code === 500) {
        catchError(this.handleError)
        return []
      } else {
        return vGetRes;
      }
    }));
  }

  getEmpDetails() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headers_object
    };
    return this.http.get(`${env.employee_url}` , httpOptions).pipe(map((vGetRes: any) => {
      if (vGetRes.code === 500) {
        catchError(this.handleError)
        return []
      } else {
        return vGetRes;
      }
    }));
  }

  addQnaInbox(data) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headers_object
    };
    data['source_type'] = 'portal';
    return this.http.post(`${env.inbox_url}`, data)
      .pipe(map((vGetRes: any) => {
        debugger;
        if (vGetRes.code === 500) {
          catchError(this.handleError)
          return []
        } else {
          return vGetRes;
        }
      }))
  }
  addQna(data) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headers_object
    };
    data['source_type'] = 'portal';
    return this.http.post(`${env.main_url}`, data)
      .pipe(map((vGetRes: any) => {
        debugger;
        if (vGetRes.code === 500) {
          catchError(this.handleError)
          return []
        } else {
          return vGetRes;
        }
      }))
  }

  editQna(data,uid) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headers_object
    };
    return this.http.put(`${env.main_url}/${uid}`,data)
      .pipe(map((vGetRes: any) => {
        debugger;
        if (vGetRes.code === 500) {
          catchError(this.handleError)
          return []
        } else {
          return vGetRes;
        }
      }))
  }

  delQna(data) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headers_object
    };
    return this.http.delete(`${env.main_url}/${data}`,{})
      .pipe(map((vGetRes: any) => {
        debugger;
        if (vGetRes.code === 500) {
          catchError(this.handleError)
          return []
        } else {
          return vGetRes;
        }
      }))
  }

  addEmployee(data){
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headers_object
    };
    return this.http.post(`${env.employee_url}`,data)
      .pipe(map((vGetRes: any) => {
        debugger;
        if (vGetRes.code === 500) {
          catchError(this.handleError)
          return []
        } else {
          return vGetRes;
        }
      }))
  }


  updateEmployee(data){
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headers_object
    };
    return this.http.put(`${env.employee_url}`,data)
      .pipe(map((vGetRes: any) => {
        debugger;
        if (vGetRes.code === 500) {
          catchError(this.handleError)
          return []
        } else {
          return vGetRes;
        }
      }))
  }
  


  // postFileInbox(fileToUpload: File) {
  //   var headers_object = new HttpHeaders()
  //   headers_object.append('Content-Type', 'multipart/form-data');
  //   headers_object.append('Accept', 'application/json');
  //   headers_object.append('enctype',"multipart/form-data");
  //   const httpOptions = {
  //     headers: headers_object
  //   };
  //   // let yourHeadersConfig = {}
  //   const formData: FormData = new FormData();
  //   formData.append('QABotInbox', fileToUpload, fileToUpload.name);
  //   return this.http
  //     .post(`${env.csvInboxFile_url}`, formData, httpOptions).pipe(map((vGetRes: any) => {
  //       debugger;
  //       if (vGetRes.code === 500) {
  //         catchError(this.handleError)
  //       } else {
  //         return vGetRes;
  //       }
  //     }))
  // }

  postFileData(fileToUpload: File, isInbox:boolean) {
    var headers_object = new HttpHeaders()
    headers_object.append('Content-Type', 'multipart/form-data');
    headers_object.append('Accept', 'application/json');
    headers_object.append('enctype',"multipart/form-data");
    const httpOptions = {
      headers: headers_object
    };
    // let yourHeadersConfig = {}
    const formData: FormData = new FormData();
    formData.append('QABotData', fileToUpload, fileToUpload.name);
    formData.append('isInbox', isInbox == true ? "inbox":"data");
    return this.http
      .post(`${env.csvFile_url}`, formData, httpOptions).pipe(map((vGetRes: any) => {
        debugger;
        if (vGetRes.code === 500) {
          catchError(this.handleError)
          return []
        } else {
          return vGetRes;
        }
      }))
  }

  postEmpFileData(fileToUpload: File) {
    var headers_object = new HttpHeaders()
    headers_object.append('Content-Type', 'multipart/form-data');
    headers_object.append('Accept', 'application/json');
    headers_object.append('enctype',"multipart/form-data");
    const httpOptions = {
      headers: headers_object
    };
    // let yourHeadersConfig = {}
    const formData: FormData = new FormData();
    formData.append('employee', fileToUpload, fileToUpload.name);
    return this.http
      .post(`${env.employee_url}`, formData, httpOptions).pipe(map((vGetRes: any) => {
        debugger;
        if (vGetRes.code === 500) {
          catchError(this.handleError)
          return []
        } else {
          return vGetRes;
        }
      }))
  }

  // update(id, data) {

  // }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  public getConfigFile(){
    return this.http.get("./assets/files/config.yaml", {
      observe: 'body',
      responseType: "text"   // This one here tells HttpClient to parse it as text, not as JSON
    }).pipe(
      // Map Yaml to JavaScript Object
      map(yamlString => yamlString));
  }

}