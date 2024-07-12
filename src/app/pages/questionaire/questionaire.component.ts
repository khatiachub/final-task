import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../../core/dataservice.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

interface Question {
  id: number;
  question: string;
  required: boolean;
}

@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.css']
})
export class QuestionaireComponent implements OnInit {
  questionsForm!: FormGroup;
  questions: Question[] = [];

  constructor(private fb: FormBuilder, private dataService: DataserviceService) {
    this.questionsForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      answers: this.fb.array([]),
      questionIds: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.dataService.getAllQuestions().subscribe({
      next: (response) => {
        this.questions = response;
        this.initializeFormArrays();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private initializeFormArrays(): void {
    this.answers.clear();
    this.questions.forEach((question: Question) => {
      this.answers.push(this.fb.control('')); // Add empty answer control
    });
  }

  get answers(): FormArray {
    return this.questionsForm.get('answers') as FormArray;
  }

  onSubmit(): void {
    const value = this.questionsForm.value;
    const dataToSend = this.questions.map((question: Question, index: number) => ({
      question: question.question,
      required: question.required,
      answers: {
        answer: value.answers[index],
        name: value.name,
        lastname: value.lastname,
        question_id: question.id
      }
    }));
    
    console.log('Data to send:', dataToSend);
    this.dataService.addQuestions(dataToSend).subscribe({
      next: (response) => {
        console.log(response);
        this.questionsForm.reset();
      },
      error: (error) => {
        console.error('Error occurred:', error);
      },
    });
    
  }
}
