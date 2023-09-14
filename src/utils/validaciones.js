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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(input);
}

export const esAlfanumerico = (input) => {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  
  return alphanumericRegex.test(input);
}
