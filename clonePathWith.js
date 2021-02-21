import {clone, isFunction} from 'lodash';
import castPath from 'lodash/_castPath';
import isNumeric from './isNumeric';

export default function( _object, _path, _updater ){
    let path = clone(castPath(_path, _object));
    
    let clonePath = ( obj ) => {
        obj = clone(obj);
        let index = path.shift();
        
        if( !index ) {
            if( isFunction(_updater) ) return _updater(obj);
            return obj;
        }
        
        if( !obj.hasOwnProperty(index) ) {
            obj[index] = isNumeric(path[0]) ? [] : {};
        }
        obj[index] = clonePath(obj[index]);
        
        return obj;
    };
    
    return clonePath(_object);
}