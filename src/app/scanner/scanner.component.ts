import { Component, OnInit } from '@angular/core';
import Quagga from 'quagga';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {
  errorMessage = '';
  result = '';

  ngOnInit(): void {
    Quagga.init({
      inputStream: {
        constraints: {
          facingMode: 'environment' // restrict camera type
        },
        area: { // defines rectangle of the detection
          top: '0%',    // top offset
          right: '0%',  // right offset
          left: '0%',   // left offset
          bottom: '0%'  // bottom offset
        },
      },
      decoder: {
        readers: ['code_128_reader', 'code_39_reader', 'i2of5_reader'] // restrict code types
      },
    },
    (err) => {
      if (err) {
        this.errorMessage = `QuaggaJS could not be initialized, err: ${err}`;
      } else {
        Quagga.start();
        Quagga.onDetected((res) => {
          this.result = res.codeResult.code;
        });
      }
    });
  }

}
