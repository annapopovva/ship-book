import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShipFormComponent } from './ship-form.component';

describe('ShipFormComponent', () => {
  let component: ShipFormComponent;
  let fixture: ComponentFixture<ShipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipFormComponent ],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('a form group element count should be 6', () => {
    const formControl = fixture.debugElement.nativeElement.querySelector('shipForm');
    const formFields = formControl.querySelectorAll('mat-form-field');
    expect(formFields.length).toEqual(6);
  });

  it('check the IMO field value and validation', () => {
    const imoFormField: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#shipForm').querySelectorAll('input')[1];
    const imoValue = component.shipForm.get('imo');

    expect(imoFormField.value).toEqual(imoValue.value);
    expect(imoValue?.errors).not.toBeNull();
    //expect(imoValue?.errors.required).toBeTruthy();
  });

  it('check and validate the entered value of the email field', () => {
    const emailFormField: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('input[type: "email"]');
    emailFormField.value = 'annapopova@icb.bg';
    emailFormField.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const emailValue = component.shipForm.get('email');
      expect(emailFormField.value).toEqual(emailValue.value);
      expect(emailValue?.errors).toBeNull();
      //expect(emailValue?.errors.required).toBeTruthy();
    });
  });

});
