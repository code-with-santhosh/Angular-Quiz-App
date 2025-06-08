import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  score: number = 0;
  totalQuestions: number = 0;

  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.score = +params['score'] || 0;
      this.totalQuestions = +params['totalQuestions'] || 0;
    });
  }

  restartQuiz() {
    console.log('restart Quiz');
  }
}
