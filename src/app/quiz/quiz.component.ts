import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../shared/service/question.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  selectedOption: string = '';
  score: number = 0;
  showResults: boolean = false;

  timer: number = 20;
  interval: any;

  constructor(
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe((data: any) => {
      this.questions = data;

      this.startTimer();
    });
  }
  ngOnDestroy(): void {
    this.clearTimer();
  }

  startTimer(): void {
    this.clearTimer();
    this.timer = 20;
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.nextQuestion();
      }
    }, 1000);
  }
  clearTimer(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  nextQuestion(): void {
    if (
      this.selectedOption === this.questions[this.currentQuestionIndex]?.answer
    ) {
      this.score++;
    }
    this.selectedOption = '';
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.clearTimer();
      this.router.navigate(['/results'], {
        queryParams: {
          score: this.score,
          totalQuestions: this.questions.length,
        },
      });
    } else {
      this.startTimer();
    }
  }
  onSelectedOption(option: any) {
    this.selectedOption = option;
  }
}
