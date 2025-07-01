import { Component, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AnotherApiService } from '../../../shared/services/another/another-api.service';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../../shared/services/dashboard/dashboard.service';

@Component({
  selector: 'app-create-player',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-player.component.html',
  styleUrl: './create-player.component.scss',
})
export class CreatePlayerComponent {
  modeChange = output<string>();


  createPlayerForm!: FormGroup;
  positions: any[] = [];
  loading = false;

  profileImageFile!: File;
  ContractPicture!: File;
  playerVideoFile!: File;

  constructor(
    private _AnotherApiService: AnotherApiService,
    private _DashboardService :DashboardService,
    private _ToastrService: ToastrService
  ) {}

  currentYear = new Date().getFullYear();

  ngOnInit(): void {
    this.createPlayerForm = new FormGroup({
      Firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
        Validators.pattern(/^[a-zA-Z-_ ]*$/)
      ]),
      Lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(128),
        Validators.pattern(/^[a-zA-Z-_ ]*$/),
      ]),
      Nickname: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z-_ ]*/),
        Validators.minLength(6),
        Validators.maxLength(256)
      ]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
      Number: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(99),
      ]),
      PositionId: new FormControl('', Validators.required),
      birthDate: new FormControl('', [
        Validators.required,
        this.dateRangeValidator(1980, 2015),
      ]),
      ContractDuration: new FormControl('', [
        Validators.required,
        this.dateRangeValidator( this.currentYear , 2040),
      ]),
      JoinedClubOn: new FormControl('', [
        Validators.required,
        this.dateRangeValidator(2008, this.currentYear ),
      ]),
    });

    this._AnotherApiService.getPositionOfPlayer().subscribe({
      next: (res) => {
        this.positions = res;
      },
    });
  }

  dateRangeValidator(minYear: number, maxYear: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const date = new Date(control.value);
      const year = date.getFullYear();

      return year >= minYear && year <= maxYear
        ? null
        : { dateOutOfRange: true };
    };
  }

  onFileChange(event: any, type: 'ProfilePictureUrl' | 'ContractPicture' | 'Video') {
    const file = event.target.files?.[0];
    if (!file) return;

    if (type === 'ProfilePictureUrl') this.profileImageFile = file;
    if (type === 'ContractPicture') this.ContractPicture = file;
    if (type === 'Video') this.playerVideoFile = file;
  }

  submitForm() {
    if (
      this.createPlayerForm.invalid ||
      !this.ContractPicture 
    ) {
      this.createPlayerForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const formValue = this.createPlayerForm.value;

    for (let key in formValue) {
      formData.append(key, formValue[key]);
    }

    formData.append('ProfilePicture', this.profileImageFile);
    formData.append('ContractPicture', this.ContractPicture);
    formData.append('Video', this.playerVideoFile);

    this.loading = true;

    this._DashboardService.createPlayer(formData).subscribe({
      next: (res) => {
        this.loading = false;
        this._ToastrService.success(res.message);
        this.modeChange.emit('view');
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
}
