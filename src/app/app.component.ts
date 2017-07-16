import { Component } from '@angular/core';
import { LogService } from './shared/log.service';
import { Line } from './shared/line.interface';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public loadingFile: boolean;
    public filePath: string;
    public lines: Array<Line>;
    public errorMessage: string;

    private forwardReader: boolean;
    private block: number;
    private previousSubscription: Subscription;

    public constructor(private logService: LogService) {
        this.loadingFile = false;
        this.filePath = '';
        this.forwardReader = true;
        this.block = 0;
        this.lines = [];
        this.previousSubscription = new Subscription();
    }

    public activateForwardReader() {
        this.forwardReader = true;
        this.block = 0;
        this.readFile();
    }

    public deactivateForwardReader() {
        this.forwardReader = false;
        this.block = 0;
        this.readFile();
    }

    public readFile() {
        if ('' === this.filePath) {
            return;
        }

        this.errorMessage = '';
        this.loadingFile = true;
        this.lines = [];
        this.previousSubscription.unsubscribe();

        this.previousSubscription = this.logService.readFile(this.forwardReader, this.filePath, this.block).subscribe(
            (lines: Array<Line>) => {
                this.lines = lines;
                this.loadingFile = false;
            },
            error => {
                if (error['code'] === 0) {
                    this.block--;
                } else {
                    this.errorMessage = error['message'];
                }
                this.loadingFile = false;
            }
        );
    }

    public nextBlock() {
        if (this.forwardReader) {
            this.block++;
        } else if (this.block > 0) {
            this.block--;
        }

        this.readFile();
    }

    public previousBlock() {
        if (!this.forwardReader) {
            this.block++;
        } else if (this.block > 0) {
            this.block--;
        }

        this.readFile();
    }
}
