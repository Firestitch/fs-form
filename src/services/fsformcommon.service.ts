import { Injectable } from '@angular/core';

import { phone } from '@firestitch/common/validate/phone';
import { email } from '@firestitch/common/validate/email';

import { toString, isInteger, isNumber, isString, isEmpty, isFinite, filter } from 'lodash';


@Injectable()
export class FsFormCommon {

    private readonly errorMessagesContainerClassName = 'ng-trigger-transitionMessages';

    constructor() {}

    renderErrors(instance, controlRef, renderer, elRef) {
        if (controlRef.dirty) {
            const errors = this.getErrors(instance, controlRef);
            const isRadioGroup = elRef.nativeElement.tagName === 'FS-RADIO-GROUP';
            const isCheckGroup = elRef.nativeElement.tagName === 'FS-CHECKBOX-GROUP';
            const isAutocompleteChips = elRef.nativeElement.tagName === 'FS-AUTOCOMPLETE-CHIPS';
            const isAccountPicker = elRef.nativeElement.tagName === 'FS-ACCOUNT-PICKER';

            // searching for a container if we are at input element (.mat-input-wrapper or .mat-form-field-wrapper)
            let elContainer = elRef.nativeElement.parentNode.parentNode.parentNode;

            if (isRadioGroup || isCheckGroup || isAutocompleteChips || isAccountPicker) {
              elContainer = elRef.nativeElement;
            }

            let wrapperClass = 'mat-form-field-subscript-wrapper';

            if (isRadioGroup) {
              wrapperClass = 'mat-radio-button-group-subscript-wrapper';
            } else if (isCheckGroup) {
              wrapperClass = 'mat-checkbox-group-subscript-wrapper';
            }

            let wrapper = elContainer.querySelector(`.${wrapperClass}`);

            if (wrapper) {

              const hint = this.getHint(wrapper);

              this.setErrorsStyle(renderer, wrapper, 'display', isEmpty(errors) ? 'none' : 'block');

              if (hint) {
                renderer.setStyle(hint, 'display', isEmpty(errors) ? 'block' : 'none');
              }

              if (isEmpty(errors)) {
                return;
              }
            }

            // not the most elegant way to compile errors, but i couldnt get a better one working.
            // right now its depepndant on styles/DOM we have in existing angular-material, which is not right
            const errorContainer = renderer.createElement('div');
            renderer.addClass(errorContainer, 'ng-trigger');
            renderer.addClass(errorContainer, this.errorMessagesContainerClassName);

            // For checkbox and radio button groups we have to manually add these wrappers
            if (isRadioGroup || isCheckGroup) {

                elRef.nativeElement.name = elRef.nativeElement.getAttribute('name');

                if (!wrapper) {
                  wrapper = renderer.createElement('div');

                  renderer.addClass(wrapper, 'mat-form-field-subscript-wrapper');
                  renderer.addClass(wrapper, wrapperClass);
                  renderer.appendChild(elRef.nativeElement, wrapper);
                }
            } else {
              if (!wrapper) {
                wrapper = renderer.createElement('div');
                renderer.addClass(wrapper, 'mat-form-field-subscript-wrapper');
                renderer.appendChild(wrapper, errorContainer);
                elRef.nativeElement.appendChild(wrapper);
              }
            }

            for (const errKey in errors) {

                if (!errors[errKey]) {
                    continue;
                }

                const errorElement = renderer.createElement('mat-error');
                let errorText: string = null;

                renderer.addClass(errorElement, 'mat-error')
                renderer.setProperty(errorElement, 'id', 'mat-error-' + errKey)

                const messageVariable = `fsForm${this.capitalizeFirstLetter(errKey)}Message`;

                if (instance[messageVariable]) {
                    errorText = renderer.createText(this.parseErrorMessage(instance[messageVariable], errors[errKey]));
                } else {
                    errorText = renderer.createText(errors[errKey]);
                }

                renderer.appendChild(errorElement, errorText);
                renderer.appendChild(errorContainer, errorElement);
            }

            this.clearWrapperErrors(wrapper);
            wrapper.appendChild(errorContainer);
        }
    }

    private clearWrapperErrors(wrapper) {
      const errorContainers = wrapper.getElementsByClassName(this.errorMessagesContainerClassName);

      if (!errorContainers.length) {
        return;
      }

      for (var i = 0; i < errorContainers.length; i++) {
        if (Array.from(errorContainers[i].classList).indexOf('mat-input-hint-wrapper') === -1) {
          errorContainers[i].parentNode.removeChild(errorContainers[i]);
        }
      }
    }

    private setErrorsStyle(renderer, wrapper, style, value) {
      const errorContainers = wrapper.getElementsByClassName(this.errorMessagesContainerClassName);

      if (!errorContainers.length) {
        return;
      }

      for (var i = 0; i < errorContainers.length; i++) {
        if (Array.from(errorContainers[i].classList).indexOf('mat-input-hint-wrapper') === -1) {
          renderer.setStyle(errorContainers[i], style, value);
        }
      }
    }

    private getHint(wrapper) {

      if (!wrapper) {
        return null;
      }

      const hintContainer = wrapper.getElementsByClassName('mat-input-hint-wrapper') ?
        wrapper.getElementsByClassName('mat-input-hint-wrapper')[0] : null;

      return hintContainer ? hintContainer.getElementsByClassName('mat-hint')[0] : null;
    }

    getErrors(instance, controlRef) {

        const messagesOrder = [];

        for (const value of instance.fsFormErrorsOrder) {
            messagesOrder.push(value.replace(/fsForm/, '').toLowerCase());
        }

        if (messagesOrder.length) {
            for (const value of messagesOrder) {
                if (controlRef.control.errors[value]) {
                    return { [value]: controlRef.control.errors[value] };
                }
            }
        }

        // seems a bit hacky
        for (let key in controlRef.control.errors) {
            return { [key]: controlRef.control.errors[key] };
        }

        return {};
    }

    parseErrorMessage(message, args): string {

        for (const key in args) {
            message = message.replace(/\$\(\d\)/, args[key]);
        }
        return message;
    }

    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    searchIndex(data, item) {
      return filter(data, value => {
        return JSON.stringify(value) === JSON.stringify(item);
      });
    }

    isInt(value) {
      return this.string(value) === '' || (this.isNumeric(value) && value % 1 === 0);
    }

    isNumeric(value) {
      return this.string(value) === '' || (this.string(value).length && !!this.string(value).match(/^-?\d*\.?\d*$/));
    }

    phone(value) {
      return phone(value);
    }

    email(value) {
      return email(value);
    }

    private string(value) {

      if (value === null || value === undefined) {
        value = '';
      }

      return value.toString();
    }
}
