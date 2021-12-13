import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from '../../services/agenda.service';
import { SpeakerService } from '../../services/speaker.service';
import { CompanyService } from '../../services/company.service';
import { AgendaItem, AgendaItemFire, Speaker, SpeakerFire } from '../../types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-agenda-card',
  templateUrl: './agenda-card.component.html',
  styleUrls: ['./agenda-card.component.scss'],
})
export class AgendaCardComponent implements OnInit {
  @Input() id: number;

  public agenda: AgendaItemFire;
  public speakers: SpeakerFire[];
  public photoUrls: string[] = [];

  private unsubscribe$: Subject<null> = new Subject();

  constructor(
    private agendaService: AgendaService,
    private speakerService: SpeakerService,
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.agendaService.getAgendaByIdFromFirebase(this.id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((agenda: AgendaItemFire) => {
      this.agenda = agenda;
      if(this.agenda) {
        this.speakerService.getSpeakersByIdsFromFireBase(this.agenda.speakers)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((speakers: Array<SpeakerFire>) => {
          this.speakers = speakers;
        })
      }
    })
  }

  navigateToAgendaItemPage() {
    this.router.navigate([`/agenda/${this.id}`]);
  }

  getCompanyName(companyId: number) {
    return this.companyService.getCompany(companyId).name;
  }

  formatTalkTime(agendaItem: AgendaItem) {
    return this.agendaService.formatTalkTime(agendaItem);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
