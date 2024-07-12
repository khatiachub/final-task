import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from '../../core/dataservice.service';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  questionsForm!:FormGroup;
  questionsarray!:any;
  constructor(private fb: FormBuilder,private dataService: DataserviceService) {
    this.questionsForm = this.fb.group({
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
      required: [false, [Validators.requiredTrue]]
    });
  }

  ngOnInit() {
    this.dataService.getAllQuestions().subscribe({
      next: (response) => {
        console.log(response);
       this.questionsarray=response;
        
      },
      error: (error) => {
        console.error('Error occurred:', error);
      },
    });
  }
  
  createAnswer(): FormGroup {
    return this.fb.group({
      answer: ['', [Validators.required]],
    });
  }

  get questions(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }
 
  getAnswers(question: AbstractControl): FormArray {
    return question.get('answers') as FormArray;
  }

 
  
  onSubmit(): void {
    console.log(this.questionsForm.value);
    const value=this.questionsForm.value
    const data=[
      {
        question: value.question,
        required:value.required[0]==='true'?1:0,
        answers: [
          {
            answer: value.answer
          }
        ]
      }
    ]
      console.log('Data to send:', data);
    this.dataService.addQuestions(data).subscribe({
      next: (response) => {
        console.log(response); 
        this.questionsForm.reset();
      },
      error: (error) => {
        console.log(error);   
      },
    });
  }
}
