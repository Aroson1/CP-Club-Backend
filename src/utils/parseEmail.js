export function parseEmail(email) {
  const match = email.match(/^([a-z]+)(\d{2})([a-z]{3})(\d+)@/i);
  if (!match) throw new Error("Invalid email format");

  const [, , yearShort, course, idNumber] = match;

  const year = `20${yearShort}`;

  const courseUpper = course.toUpperCase();

  const paddedIdNumber = idNumber.padStart(4, "0");

  const rollNumber = `${year}${courseUpper}${paddedIdNumber}`;

  const batch = year;

  return { rollNumber, batch };
}
