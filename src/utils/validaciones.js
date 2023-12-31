// --> Lógica para formatear los inputs <--
const longMaximaInput = 40;
const minLenghtPass = 8;

export const verificarMail = (mail) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const longitudRegex = /.{0,40}/;

  const isValidEmail = emailRegex.test(mail);
  const isCorrectLength = longitudRegex.test(mail);
  let error = 0;

  if (!isValidEmail || !isCorrectLength) {
    error = 1 
  }

  return error;
};

export const verificarContrasenia = (contrasenia) => {
  const mayusculaRegex = /^(?=.*[A-Z])/;
  const numeroRegex = /^(?=.*\d)/;
  const caracterEspecialRegex = /^(?=.*[@#$%^&+=!])/;
  const longitudRegex = /^.{0,40}$/;

  const cumpleMayuscula = mayusculaRegex.test(contrasenia);
  const cumpleNumero = numeroRegex.test(contrasenia);
  const cumpleCaracterEspecial = caracterEspecialRegex.test(contrasenia);
  const cumpleLongitud = longitudRegex.test(contrasenia);
  let error = 0

  if (!cumpleMayuscula || !cumpleNumero || !cumpleCaracterEspecial || !cumpleLongitud) {
    error = 1
  }

  return error;
};

export const verificarDatos = (nombre, apellido, dni, celular, direccion) => {
  const errors = [];

  if(nombre !== "pase"){
    if (!nombre || nombre.length < 3 || nombre.length > 25) {
      errors.push("El nombre debe tener entre 3 y 25 caracteres.");
    }
  }

  if(apellido !== "pase"){
    if (!apellido || apellido.length < 3 || apellido.length > 25) {
      errors.push("El apellido debe tener entre 3 y 25 caracteres.");
    }
  }

  if(dni !== "pase"){
    if (!dni || dni.length < 7 || dni.length > 8) {
      errors.push("El DNI debe tener entre 7 y 8 caracteres.");
    }
  }

  if (!celular || celular.length < 7 || celular.length > 8) {
    errors.push("El número de celular debe tener entre 7 y 8 caracteres.");
  }

  if (!direccion || direccion.length < 6 || direccion.length > 70) {
    errors.push("La dirección debe tener entre 6 y 70 caracteres.");
  }

  return errors;
};

export const equalsPassword  = (password, password2) => {
  return password === password2;
}

export const esLetra = (input) => {
  const alphabetRegex = /^[a-zA-Z]+$/;
  
  return alphabetRegex.test(input);
}

export const esNumero = (input) => {
  const numberRegex = /^[0-9]+$/;
  
  return numberRegex.test(input);
}

export const esMail = (input) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;
  
  return emailRegex.test(input);
};


export const esAlfanumerico = (input) => {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  
  return alphanumericRegex.test(input);
}

// Validas las letras y los espacios en blanco (nombres, apellidos)
export function validarLetrasEspacios(inputValue) {
  return /^[a-zA-Z\s]*$/.test(inputValue);
}

export const validarDatos = (data) => {
  // valido la información para crear administradores...
  const errors = [];

  errors.push(verificarDatos(data.nombre, data.apellido, data.dni, data.celular, data.direccion))
  validarLetrasEspacios(data.nombre) ? null : errors.push("El nombre solo puede contener letras.");
  validarLetrasEspacios(data.apellido) ? null : errors.push("El apellido solo puede contener letras.");
  esNumero(data.dni) ? null : errors.push("El DNI solo puede contener números (Entre 7 y 8).");
  esNumero(data.celular) ? null : errors.push("El número de celular solo puede contener números (Entre 7 y 8).");
  esMail(data.mail) ? null : errors.push("El mail no es válido.");
  verificarContrasenia(data.password) === 0 ? null : errors.push("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un caracter especial.");


  return errors;
}