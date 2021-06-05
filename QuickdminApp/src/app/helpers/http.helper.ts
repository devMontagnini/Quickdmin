import { HttpParams } from "@angular/common/http";

export class HttpHelper {

  static objectToParams(object: any): HttpParams {
    let params = new HttpParams();
    Object.keys(object).forEach(key => {
      const value = object[key];
      if(!value) return;
      if(value instanceof Date) {
        const day = value.getDate().toString().padStart(2, '0');
        const month = (value.getMonth() + 1).toString().padStart(2, '0');
        const year = value.getFullYear();
        params = params.append(key, `${year}-${month}-${day}`);
        return;
      }
      params = params.append(key, value.toString());
    });
    return params;
  }

  static getStatusMessage(statusCode: number): string {
    switch(statusCode) {
      case 0: return "Erro na requisição, verifique sua conexão com a internet.";
      case 400: return "Dados inválidos enviados na requisição.";
      case 401: return "Requisição não autorizada";
      case 403: return "Usuário não tem permissão para esta ação";
      case 500: default: return "Ocorreu algum erro, tente novamente.";
    }
  }

}