import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";

@NgModule({
    exports: [
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatIconModule,
        MatDividerModule,
        MatDialogModule,
        MatInputModule,
        MatCardModule,
        MatTableModule,
    ]
})
export class MaterialModule {

}