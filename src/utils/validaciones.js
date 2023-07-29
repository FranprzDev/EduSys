// --> Lógica para formatear los inputs <--
const longMaximaInput = 40;
const minLenghtPass = 8;

export const verificarMail = (mail) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const longitudRegex = /.{0,40}/;

  const isValidEmail = emailRegex.test(mail);
  const isCorrectLength = longitudRegex.test(mail);
  const newErrors = [];

  if (!isValidEmail) {
    newErrors.push("El correo electrónico no es válido.");
  }
  if (!isCorrectLength) {
    newErrors.push("Sólo puedes ingresar hasta 40 caracteres.");
  }

  return newErrors;
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
  const newErrors = [];

  if (!cumpleMayuscula) {
    newErrors.push("La contraseña debe contener al menos 1 letra mayúscula.");
  }
  if (!cumpleNumero) {
    newErrors.push("La contraseña debe contener al menos 1 número.");
  }
  if (!cumpleCaracterEspecial) {
    newErrors.push("La contraseña debe contener al menos 1 carácter especial.");
  }
  if (!cumpleLongitud) {
    newErrors.push(`La cantidad mínima de caracteres es ${minLenghtPass}.`);
  }

  return newErrors;
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