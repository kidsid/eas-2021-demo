import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SpeakerFire, AgendaItemFire } from '../../types';
import { SpeakerService } from '../../services/speaker.service';
import { Browser } from '@capacitor/browser';
import { AgendaService } from '../../services/agenda.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-speaker-view',
  templateUrl: './speaker-view.component.html',
  styleUrls: ['./speaker-view.component.scss'],
})
export class SpeakerViewComponent implements OnInit, OnDestroy {
  public speaker: SpeakerFire;
  public sessions: Array<AgendaItemFire>;

  @Input() id: number;

  private unsubscribe$: Subject<null> = new Subject();

  constructor(
    private speakerService: SpeakerService,
    private modalController: ModalController,
    private agendaService: AgendaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.speakerService.getSpeakerFromFireStore(this.id)
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe((speaker: SpeakerFire) => {
      this.speaker = speaker;
      if(this.speaker) {
          this.agendaService.getAgendaBySpeakerId(this.speaker.id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((sessions: Array<AgendaItemFire>) => {
            this.sessions = sessions;
        })
      }
    })
  }

  closeModal() {
    this.modalController.dismiss();
  }

  navigateToAgendaItemPage(id) {
    this.router.navigate([`/agenda/${id}`]);
    this.closeModal()
  }

  async openLink(link: string) {
    await Browser.open({ url: link})
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
