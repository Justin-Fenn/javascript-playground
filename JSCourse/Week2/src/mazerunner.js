import * as d3 from 'd3';
import { generateTree, forceDirected } from './graphics';

function visitNode(guid, path) {
  return fetch(`http://dealeron-maze.s3-website-us-east-1.amazonaws.com/${guid}.txt`)
    .then(res => res.text())
    .then(text => {
      if(text ==='The End'){
        return Promise.resolve({ guid, children: [], status: 'finish' });
      }else if(text === 'Not It'){
        return Promise.resolve({ guid, children: [], status: 'stop'});
      }else{
        let childrenToVisit = text.split('\n').map(childGuid=>visitNode(childGuid, path.concat([ guid ])));
        return Promise.all(childrenToVisit).then(children => ({ guid, children , status: 'continue'}));
      }
    });
}


function run(){
  visitNode("index", []).then(tree => forceDirected(tree));
}



module.exports = run;


// var somevariable = "b";
// var x = { a: "", [somevariable]: "x" };

// x.a = "test";
// x["a"] = "test";
// x.b;
// x[" afadsf sd gs dg sd gs g f dg df"];