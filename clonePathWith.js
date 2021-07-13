import toPath from 'lodash.topath';
import clone from 'lodash.clone';
import isFunction from 'clonepathwith/isFunction';
import isNumeric from 'clonepathwith/isNumeric';

export default function( ...attributes ) {
    
    let _object = null, _path = null, _updater = null;
    
    if( attributes.length === 2 && isFunction(attributes[1]) ) {
        _object = attributes[0];
        _updater = attributes[1];
    } else {
        _object = attributes[0] || null;
        _path = attributes[1] || null;
        _updater = attributes[2] || null;
    }
    
    let path = toPath(_path);
    
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