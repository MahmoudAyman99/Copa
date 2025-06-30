
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ModeratorService } from '../../../shared/services/moderator/moderator.service';
import { Icount } from '../../../shared/interfaces/icount';

@Component({
  selector: 'app-moderator-dashboard',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './moderator-dashboard.component.html',
  styleUrl: './moderator-dashboard.component.scss'
})
export class ModeratorDashboardComponent {
  data!: Icount;


  constructor(private _ModeratorService :ModeratorService){

  }

  // ✅ الشكل الصحيح لـ chartData
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Users',   'Managers' ,'Admins',  'Free Players' , 'Club Players'],
    datasets: [
      {
        data: [],
        backgroundColor: ['#3B82F6','#10B981', '#F59E0B' , '#EF4444' , '#8B5CF6'],
      }
    ]
  };

chartOptions: ChartConfiguration<'pie'>['options'] = {
  responsive: true,
  maintainAspectRatio: false, // ❗ مهم جداً
  plugins: {
    legend: {
      position: 'top',
    }
  }
};


 ngOnInit(): void {
  this._ModeratorService.getCount().subscribe({
    next: (res) => {
      this.data = res;
      this.data.normalUsers = res.usersCount - (res.adminsCount + res.managersCount + res.clubPlayersCount + res.freePlayersCount);

      // Add data from Api
      this.pieChartData.datasets[0].data = [
        this.data.normalUsers,
        this.data.managersCount,
        this.data.adminsCount,
        this.data.freePlayersCount,
        this.data.clubPlayersCount
      ];
    }
  });
}


}
