import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  loading!: Observable<boolean>;
  load:boolean = true;
  constructor(private loaderService: LoaderService) {}
  ngOnInit(): void {
    this.loaderService.loading.subscribe((data)=>{
      this.load = data
    });
  }
}
