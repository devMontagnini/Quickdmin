import { ModuleWithProviders, NgModule } from "@angular/core";
import { ModelApiService } from "./implementations/api/model-api.service";
import { ModelMockService } from "./implementations/mock/model-mock.service";
import { AuthenticationApiService } from "./implementations/api/authentication-api.service";
import { AuthenticatedUserService } from "./implementations/common/authenticated-user.service";
import { AuthenticationMockService } from "./implementations/mock/authentication-mock.service";
import { AUTHENTICATED_USER_SERVICE_TOKEN, AUTHENTICATION_SERVICE_TOKEN, MODEL_SERVICE_TOKEN } from "./constants";


@NgModule({ })
export class ServicesModule {
  static forRoot(useMock: boolean = false): ModuleWithProviders<ServicesModule> {
    const modelServiceClass = useMock ? ModelMockService : ModelApiService;
    const authenticationServiceClass = useMock ? AuthenticationMockService : AuthenticationApiService;
    return {
      ngModule: ServicesModule,
      providers: [
        { provide: MODEL_SERVICE_TOKEN, useClass: modelServiceClass },
        { provide: AUTHENTICATION_SERVICE_TOKEN, useClass: authenticationServiceClass },
        { provide: AUTHENTICATED_USER_SERVICE_TOKEN, useClass: AuthenticatedUserService }
      ]
    }
  }
 }