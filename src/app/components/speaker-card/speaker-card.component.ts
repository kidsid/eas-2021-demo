import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SpeakerViewComponent } from '../speaker-view/speaker-view.component';
import { Company, Speaker, SpeakerFire } from '../../types';
import { SpeakerService } from '../../services/speaker.service';
import { CompanyService } from '../../services/company.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-speaker-card',
  templateUrl: './speaker-card.component.html',
  styleUrls: ['./speaker-card.component.scss'],
})
export class SpeakerCardComponent implements OnInit, OnDestroy {
  public speaker: SpeakerFire;
  public company: Company;

  @Input() id: number;
  @Input() button: boolean = false;
  @Input() safeArea: boolean = false;

  private unsubscribe$: Subject<null> = new Subject();

  constructor(
    private speakerService: SpeakerService,
    private companyService: CompanyService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.speakerService.getSpeakerFromFireStore(this.id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((speaker: SpeakerFire) => {
      this.speaker = speaker;
    })
  }

  async presentModal() {
    if (!this.button) return;

    const modal = await this.modalController.create({
      component: SpeakerViewComponent,
      componentProps: {
        id: this.id
      }
    });

    modal.present();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
