export default function( obj ) {
    return Object.prototype.toString.apply(obj) === "[object Function]";
}