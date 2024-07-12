import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from '../../core/dataservice.service';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent implements OnInit{

  questionsForm!:FormGroup;
  constructor(private fb: FormBuilder,private dataService: DataserviceService) {
    // this.questionsForm = this.fb.group({
    //   question: ['', [Validators.required, Validators.email]],
    //   answer: ['', [Validators.required, Validators.minLength(6)]],
    // });
  }

  ngOnInit() {
    this.questionsForm = this.fb.group({
      questions: this.fb.array([this.createQuestion()]),
    });
  }
  createQuestion(): FormGroup {
    return this.fb.group({
      question: ['', [Validators.required]],
      answers: this.fb.array([this.createAnswer()])
    });
  }
  createAnswer(): FormGroup {
    return this.fb.group({
      answer: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get questions(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }
 
  getAnswers(question: AbstractControl): FormArray {
    return question.get('answers') as FormArray;
  }

  addQuestion() {
    this.questions.push(this.createQuestion());
  }

 
  addAnswer(questionIndex: number) {
    const answers = (this.questions.at(questionIndex).get('answers') as FormArray);
    answers.push(this.createAnswer());
  }
  onSubmit(): void {
    const formValues = this.questionsForm.value.questions;
      const data = formValues.map((q: any) => ({
        question: q.question,
        answers: q.answers.map((a: any) => ({
          answer: a.answer
        }))
      }));


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
