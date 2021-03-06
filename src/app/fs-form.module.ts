import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

import { FsFormComponent } from './components/form/form.component';
import { FsControlDirective } from './directives/control.directive';
import { FsFormRequiredDirective } from './directives/required.directive';
import { FsFormMinDirective } from './directives/min.directive';
import { FsFormMaxDirective } from './directives/max.directive';
import { FsFormMinLengthDirective } from './directives/minlength.directive';
import { FsFormMaxLengthDirective } from './directives/maxlength.directive';
import { FsFormEmailDirective } from './directives/email.directive';
import { FsFormEmailsDirective } from './directives/emails.directive';
import { FsFormPhoneDirective } from './directives/phone.directive';
import { FsFormCompareDirective } from './directives/compare.directive';
import { FsFormIntegerDirective } from './directives/integer.directive';
import { FsFormNumericDirective } from './directives/numeric.directive';
import { FsFormPatternDirective } from './directives/pattern.directive';
import { FsFormFunctionDirective } from './directives/function.directive';
import { FsFormGreaterDirective } from './directives/greater.directive';
import { FsFormDateRangeDirective } from './directives/daterange.directive';
import { FsFormLesserDirective } from './directives/lesser.directive';
import { FsFormUrlDirective } from './directives/url.directive';
import { FsFormDialogCloseDirective } from './directives/form-dialog-close.directive';
import { FsSubmitButtonDirective } from './directives/submit-button.directive';
import { FsFormValidateDirective } from './directives/validate.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    FsFormComponent,
    FsControlDirective,
    FsFormRequiredDirective,
    FsFormMinDirective,
    FsFormMaxDirective,
    FsFormMinLengthDirective,
    FsFormMaxLengthDirective,
    FsFormEmailDirective,
    FsFormEmailsDirective,
    FsFormPhoneDirective,
    FsFormCompareDirective,
    FsFormIntegerDirective,
    FsFormNumericDirective,
    FsFormPatternDirective,
    FsFormFunctionDirective,
    FsFormDateRangeDirective,
    FsFormGreaterDirective,
    FsFormLesserDirective,
    FsFormUrlDirective,
    FsFormDialogCloseDirective,
    FsSubmitButtonDirective,
    FsFormValidateDirective,
  ],
  exports: [
    FsFormComponent,
    FsControlDirective,
    FsFormRequiredDirective,
    FsFormMinDirective,
    FsFormMaxDirective,
    FsFormMinLengthDirective,
    FsFormMaxLengthDirective,
    FsFormEmailDirective,
    FsFormEmailsDirective,
    FsFormPhoneDirective,
    FsFormCompareDirective,
    FsFormIntegerDirective,
    FsFormNumericDirective,
    FsFormPatternDirective,
    FsFormFunctionDirective,
    FsFormDateRangeDirective,
    FsFormGreaterDirective,
    FsFormLesserDirective,
    FsFormUrlDirective,
    FsFormDialogCloseDirective,
    FsSubmitButtonDirective,
    FsFormValidateDirective,
  ],
  providers: [
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher,
    }
  ],
})
export class FsFormModule {
  static forRoot(): ModuleWithProviders<FsFormModule> {
    return {
      ngModule: FsFormModule,
    };
  }
}
