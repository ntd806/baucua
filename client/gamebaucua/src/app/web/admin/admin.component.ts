import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService, User } from '@app/shared/common';
import { ExcelServicesService } from '@app/shared/common/_service/excel-services.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { emailDomainValidator } from '@app/shared/common/_helper/_validation/email.validator';
import { concatMap, filter } from 'rxjs/operators';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private static readonly FORM_DRAFT = 'form-draft';
  users$: Observable<User[]>;
  excel = [];
  spreadBackColor = 'aliceblue';
  hostStyle = {
    width: '95vw',
    height: '80vh',
    display: 'none',
  };
  langs: string[] = [
    'English',
    'French',
    'German',
  ];
  myform: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  language: FormControl;
  rating: FormControl;

  constructor(
    private userService: UserService,
    private excelService: ExcelServicesService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.users$ = this.userService.getAll();
    this.getData();
    this.createFormControls();
    this.createForm();

    const formDataDraft = localStorage.getItem(AdminComponent.FORM_DRAFT);
    if(formDataDraft) {
      this.myform.setValue(JSON.parse(formDataDraft));
    }

    this.myform.valueChanges.pipe(
      filter(() => this.myform.valid),
      concatMap(formValues => this.saveDraft(formValues))
    )
    .subscribe(res => console.log(res));
  }

  saveDraft(formValues): Observable<any> {
    if(formValues) {
      localStorage.setItem(AdminComponent.FORM_DRAFT, JSON.stringify(formValues));
    }
    return of(formValues);
  }

  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.rating = new FormControl(1, Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*"),
      emailDomainValidator
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.language = new FormControl('');
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
      }),
      rating: this.rating ,
      email: this.email,
      password: this.password,
      language: this.language
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excel, 'sample');
  }

  getData() {
    return this.userService.getFakeDataForTesting().subscribe(data => {
      data.forEach(row => {
        this.excel.push(row);
      });
    });
  }

  identify(index, item) {
    return item.id;
  }

  workbookInit(args) {
    this.excelService.setSpread(args.spread);
    const sheet = this.excelService.getSpread().getActiveSheet();
    sheet.getRange(0, 0).height(50).width(10).backColor('yellow').text('Contact Name').foreColor('blue');
    sheet.getRange(0, 1).width(50).backColor('yellow').text('Email').foreColor('blue');
    sheet.getRange(0, 2).width(50).backColor('yellow').text('Contact Phone').foreColor('blue');
    sheet.getRange(0, 3).width(50).backColor('yellow').text('Contact Location').foreColor('blue');
    sheet.getRange(0, 4).width(50).backColor('yellow').text('Date of Birth').foreColor('blue');
  }

  onFileChange(event) {
    return this.excelService.onFileChange(event);
  }

  onExportExcel(event) {
    return this.excelService.onExportExcel(event);
  }
}
