import {CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from './shared/authentication.service';
import {inject} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

export const canNavigateToAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const toastService = inject(ToastrService);

  if(authService.isLoggedIn()){
    return true;
  } else {
    toastService.error('You must be logged in to access this page.');
    router.navigate(['/login']);
    return false;
  }
};
