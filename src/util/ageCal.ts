function getAge(dateString: string): number {
  const today: Date = new Date();
  const birthDate: Date = new Date(dateString);

  console.log("Today:", today);
  console.log("Birthdate:", birthDate);

  let age: number = today.getFullYear() - birthDate.getFullYear();
  const m: number = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  console.log("Calculated Age:", age);

  return age;
}
export default getAge;