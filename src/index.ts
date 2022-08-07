
const REGEX = {

  EMAIL: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,

  TELEFONO: /^(\d{5})((\*{5})|\d{5})|(\*{10})/,

  FECHAS: /^(\d{4})(\/|-)(0[1-9]|1[0-2])(\/|-)([0-2][0-9]|3[0-1])$/

}
/**
 * VALIDADOR DE FORMULARIOS ():boolean
 * @values string o numero a validar
 */
export const Validator = (values: string | number) => {
  const val = values;
  return {
    /**
     * Validador de Strings
     * @rules > array con las reglas a cumplir
     * @return Boolean
     */
    string(rules: string[] = [] , regex = /()\w+/g): boolean {
      try {
        if ( val && typeof val === 'string' ) {
          if (!val.match(regex)) { return false; }
          if (rules) {
            let errs = 0;
            rules.forEach(r => {
              const min = r.includes('min') ? true : false;
              const max = r.includes('max') ? true : false;
              if (min || max) {
                const len = Number(r.split(':')[1]);
                if(min && val.length < len) {
                  errs++;
                }
                if(max && val.length > len) {
                  errs++;
                }
              }
            }) 
            return errs > 0 ? false : true;
          }
          return true;
        }
        return false;
        
      } catch (err) {
        return false;
      }
    },
    /**
     * Validador de Numbers
     * @rules > array con las reglas a cumplir
     * @return Boolean
     */
    number(rules: string[] = []): boolean  {
      try {
        const valNumber = Number(val);
        if ( val && valNumber ) {
          if (rules.length > 1) {
            let errs = 0;
            rules.forEach(r => {
              const min = r.includes('min') ? true : false;
              const max = r.includes('max') ? true : false;
              if (min || max) {
                const len = Number(r.split(':')[1]);
                if(min && val < len) {
                  errs++;
                }
                if(max && val > len) {
                  errs++;
                }
              }
            }) 
            return errs > 0 ? false : true;
          }
          return true;
        }
        return false;
      } catch (err) {
        return false;
      }
    },
    /**
     * Validador de Emails
     * @return Boolean
     */
    email(): boolean {
      if ( val && typeof val === 'string' ) {
        const match = val.match(REGEX.EMAIL);
        return match ? true : false;
      }
      return false;
    },
    /**
     * Validador de Fechas
     * @return Boolean
     */
    date(): boolean {
      if ( val && typeof val === 'string' ) {
        const match = val.match(REGEX.FECHAS);
        return match ? true : false;
      }
      return false;
    },
     /**
     * Validador de Telefonos
     * @return Boolean
     */
    phone(): boolean {
      if ( val && (typeof val === 'string' || typeof val === 'number' )) {
        const match = String(val).match(REGEX.TELEFONO);
        return match ? true : false;
      }
      return false;
    },
     /**
     * Validador con Expresiones regulares
     * @reg > Regex a validar con el (method) String.match
     * @return Boolean
     */
    pattern(reg: RegExp): boolean {
      if ( val && (typeof val === 'string' || typeof val === 'number' )) {
        const match = String(val).match(reg);
        return match ? true : false;
      }
      return false;
    },
     /**
     * Validador de numeros o strings permitidos
     * @allow > array con los numeros o strings permitidos
     * @return Boolean
     */
    allowed(allow: number[] | string[]): boolean {
      if ( val && allow && (typeof val === 'string' || typeof val === 'number' )) {
        let ok = 0;
        allow.forEach((el: number | string )=> {
          if (String(val) == String(el)) {
            ok++;
          }
        })
        return ok == 1 ? true : false;
      }
      return false;
    }
  }
};
