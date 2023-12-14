import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    category_name: new FormControl('', [Validators.required]),
  });

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.categoryService.addCategory(this.categoryForm.value).subscribe({
        next: (res) => {
          console.log('Kategoria została dodana', res);
          this.router.navigate(['/events']);
        },
        error: (err) => console.error('Błąd podczas dodawania kategorii', err),
      });
    } else {
      console.error('Formularz zawiera błędy', this.categoryForm.errors);
    }
  }
}
