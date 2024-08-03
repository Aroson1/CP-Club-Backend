export function parseEmail(email) {
  const yearMatch = email.match(/\d{2}/);
  if (!yearMatch) throw new Error("Invalid email format");

  const year = `20${yearMatch[0]}`;
  const batch = year;

  const lettersMatch = email.match(/(?<=\d{2})[a-zA-Z]{3}/);
  if (!lettersMatch) throw new Error("Invalid email format");

  const letters = lettersMatch[0].toUpperCase();

  const numbersMatch = email.match(/\d+(?=[^@]*@|$)/);
  if (!numbersMatch) throw new Error("Invalid email format");

  const numbers = numbersMatch[0].padStart(4, "0");

  const rollNumber = `${year}${letters}${numbers}`;

  return { rollNumber, batch };
}
