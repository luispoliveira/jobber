import {
  AuthenticateRequest,
  AuthServiceController,
  AuthServiceControllerMethods,
  User,
} from '@generated/proto-auth';
import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  authenticate(
    request: AuthenticateRequest,
  ): Promise<User> | Observable<User> | User {
    return {} as any;
  }
}
