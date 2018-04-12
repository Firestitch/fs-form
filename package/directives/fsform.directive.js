var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, ElementRef, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FsForm } from './../services/fsform.service';
var FsFormDirective = (function () {
    function FsFormDirective(elRef, vc, fsForm) {
        this.elRef = elRef;
        this.vc = vc;
        this.fsForm = fsForm;
    }
    FsFormDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.fsFormBinding) {
            this.fsFormBinding.ngSubmit.subscribe(function (res) {
                _this.fsForm.broadcast('submit', _this.fsFormBinding);
                if (_this.fsFormBinding.form.status === 'INVALID') {
                    _this.fsForm.broadcast('invalid', _this.fsFormBinding);
                    for (var key in _this.fsFormBinding.controls) {
                        if (!_this.fsFormBinding.controls[key]) {
                            continue;
                        }
                        _this.fsFormBinding.controls[key].markAsDirty();
                        _this.fsFormBinding.controls[key].updateValueAndValidity();
                    }
                }
                else {
                    _this.fsForm.broadcast('valid', _this.fsFormBinding);
                }
            });
        }
    };
    FsFormDirective.prototype.ngOnDestroy = function () {
        this.fsFormBinding.ngSubmit.unsubscribe();
    };
    __decorate([
        Input(),
        __metadata("design:type", NgForm)
    ], FsFormDirective.prototype, "fsFormBinding", void 0);
    FsFormDirective = __decorate([
        Directive({
            selector: '[fsForm]'
        }),
        __metadata("design:paramtypes", [ElementRef,
            ViewContainerRef,
            FsForm])
    ], FsFormDirective);
    return FsFormDirective;
}());
export { FsFormDirective };
//# sourceMappingURL=fsform.directive.js.map