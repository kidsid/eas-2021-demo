import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpeakerService } from '../../services/speaker.service';
import { Speaker, SpeakerFire } from '../../types';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.page.html',
  styleUrls: ['./speakers.page.scss'],
})
export class SpeakersPage implements OnInit, OnDestroy {
  public speakers: SpeakerFire[] = [];

  private unsubscribe$: Subject<null> = new Subject();

  constructor(
    private speakerService: SpeakerService
  ) {
  }

  ngOnInit(): void {
    this.speakerService.getSpeakersFromFirestore()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((speakers: Array<SpeakerFire>) => {
      this.speakers = speakers;
    })
  }

  trackItems(index: number, itemObject: Speaker) {
    return itemObject.id;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
