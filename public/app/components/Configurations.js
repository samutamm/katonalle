import {conf} from './Paths';
export default function configurations(callback) {
  $.ajax({url: conf(), success: function(result){
        callback(result);
    }});
}
