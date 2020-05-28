export class Utils {
  
  /**
  * get Html content
  */
  public empty = (mixedVar) => {
    let i;
    let len;
    const emptyValues = ['undefined', undefined, null, false, '', '0'];
    for (i = 0, len = emptyValues.length; i < len; i++) {
      if (mixedVar === emptyValues[i]) {
        return true;
      }
    }
    if (typeof mixedVar === 'object') {
      const keys = Object.keys(mixedVar);
      if (keys.length > 0) {
        return false;
      }
      return true;
    }
    return false;
  };

}

export default new Utils();

