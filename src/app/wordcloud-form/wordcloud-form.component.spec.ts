import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCloudFormComponent } from './wordcloud-form.component';

describe('WordCloudFormComponent', () => {
  let component: WordCloudFormComponent;
  let fixture: ComponentFixture<WordCloudFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordCloudFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCloudFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
