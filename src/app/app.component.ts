import {Component, OnInit, ViewChild} from '@angular/core';
declare var JsonPollock;
declare var JSONEditor;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  @ViewChild('renderElement') renderElement;
  @ViewChild('treeElement') treeElement;

  private treeRef: any;

  ngOnInit() {
    this.createJSONEditor();
  }


  createJSONEditor() {
    let options = {
      'mode': 'code',
      'search': false,
      'onChange': () => this.onEditorChange(),
      'onError': function (err) {
        console.log(err.toString());
      }
    };
    this.treeRef = new JSONEditor(this.treeElement.nativeElement, options);
  }

  onEditorChange() {
    try {
      const json = this.treeRef.get();
      this.validateSchema(json);
    } catch (error) {
      const ex: Error = error;
      console.log('ex: Error: ', error);
    }
  }

  validateSchema(json) {
    try {
      const rooEl = JsonPollock.render(json);
      this.renderElement.nativeElement.removeChild(this.renderElement.nativeElement.childNodes[0]);
      this.renderElement.nativeElement.appendChild(rooEl);
    } catch (e) {
      console.log(e.message);    // error message
      console.log(e.errors);     // validation errors
    }
  }
}
