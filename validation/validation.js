
function validationTypeAtr(body) {
    const { name, description, age, hobbies } = JSON.parse(body)
    if( typeof(name) !== 'string' || typeof(description) !== 'string' ||  typeof(age) !== 'number' || !Array.isArray(hobbies)){
        return false
    }
    return true
 }
 function isUUID ( uuid ) {
    let s = "" + uuid;

    s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) {
      return false;
    }
    return true;
}
module.exports = {validationTypeAtr,isUUID}