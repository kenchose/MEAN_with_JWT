import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatButtonModule, 
  MatCardModule, 
  MatInputModule, 
  MatFormFieldModule, 
  MatTabsModule,
  MatToolbarModule,
  MatListModule
} from '@angular/material';

const material = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatTabsModule,
  MatToolbarModule,
  MatListModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    material
  ],
  exports:[material]
})
export class MaterialModule { }
