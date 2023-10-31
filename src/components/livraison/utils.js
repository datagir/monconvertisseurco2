export const convertGramsToKilograms = (grams) => {
  const kilograms = grams / 1000 // Convert grams to kilograms
  const formattedKilograms = kilograms.toLocaleString('fr', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) // Format kilograms with two decimal places and comma as separator
  return formattedKilograms
}
