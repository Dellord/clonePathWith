import toPath from 'lodash.topath';
import clone from 'lodash.clone';
import isFunction from './isFunction';
import isNumeric from './isNumeric';

export default function( _object, _path, _updater ) {
    let path = toPath(_path, _object);
    
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